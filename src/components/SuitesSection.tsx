import React, { useState, useEffect } from "react";
import { Check, Calendar, Users, Calculator, Trash2, ShieldAlert, Award, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { SUITES } from "../data";
import { Suite, Booking } from "../types";

export default function SuitesSection() {
  const [selectedSuiteId, setSelectedSuiteId] = useState<"standard" | "deluxe" | "executive">("deluxe");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // Real calendar navigation month/year state
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
  
  // Validation messages
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Load existing bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nil_bookings");
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    
    // Set default check-in date to tomorrow and check-out to day after tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 3);
    
    setCheckIn(tomorrow.toISOString().split("T")[0]);
    setCheckOut(dayAfter.toISOString().split("T")[0]);
    
    setCalendarMonth(tomorrow.getMonth());
    setCalendarYear(tomorrow.getFullYear());
  }, []);

  const selectedSuite = SUITES.find((s) => s.id === selectedSuiteId) || SUITES[1];

  // Live total price calculation
  const calculateTotal = (): number => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * selectedSuite.priceNumeric;
  };

  const totalNights = (): number => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Get all dates booked for a specific suite
  const getTakenDatesForSuite = (suiteId: string): string[] => {
    const dates: string[] = [];
    bookings.filter((b) => b.suiteId === suiteId).forEach((b) => {
      const current = new Date(b.checkIn);
      const end = new Date(b.checkOut);
      while (current < end) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });
    return dates;
  };

  const takenDates = getTakenDatesForSuite(selectedSuiteId);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessBooking(null);

    if (!guestName.trim()) {
      setErrorMsg("Please enter the primary guest's full name.");
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (start < today) {
      setErrorMsg("Check-in date cannot be in the past.");
      return;
    }

    if (end <= start) {
      setErrorMsg("Check-out date must be after the check-in date.");
      return;
    }

    // Overlap validation check
    const datesToBook: string[] = [];
    const currentIter = new Date(checkIn);
    const endIter = new Date(checkOut);
    while (currentIter < endIter) {
      datesToBook.push(currentIter.toISOString().split("T")[0]);
      currentIter.setDate(currentIter.getDate() + 1);
    }

    const hasOverlap = datesToBook.some((d) => takenDates.includes(d));
    if (hasOverlap) {
      setErrorMsg("One or more dates in your selected range are already reserved for this suite. Please adjust your check-in and check-out days.");
      return;
    }

    // Guests constraint check
    const maxGuests = selectedSuiteId === "standard" ? 2 : selectedSuiteId === "deluxe" ? 3 : 5;
    if (guests > maxGuests) {
      setErrorMsg(`The ${selectedSuite.name} accommodates a maximum of ${maxGuests} guests.`);
      return;
    }

    const price = calculateTotal();
    
    const newBooking: Booking = {
      id: "NLI-" + Math.floor(100000 + Math.random() * 900000),
      suiteId: selectedSuiteId,
      suiteName: selectedSuite.name,
      checkIn,
      checkOut,
      guests,
      guestName,
      totalPrice: price,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem("nil_bookings", JSON.stringify(updatedBookings));
    
    setSuccessBooking(newBooking);
    setGuestName(""); // Reset guest input name for subsequent bookings
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("nil_bookings", JSON.stringify(updated));
    if (successBooking && successBooking.id === id) {
      setSuccessBooking(null);
    }
  };

  const handleDayClick = (dateString: string) => {
    setErrorMsg("");
    setSuccessBooking(null);
    
    const clickedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (clickedDate < today) return; 
    
    if (takenDates.includes(dateString)) {
      setErrorMsg("This date is already booked. Please choose another date.");
      return;
    }
    
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateString);
      setCheckOut("");
    } else {
      const start = new Date(checkIn);
      if (clickedDate <= start) {
        setCheckIn(dateString);
        setCheckOut("");
      } else {
        // Verify no occupied dates are in the range start -> clickedDate
        const temp = new Date(start);
        let hasBlocked = false;
        while (temp < clickedDate) {
          const tempStr = temp.toISOString().split("T")[0];
          if (takenDates.includes(tempStr)) {
            hasBlocked = true;
            break;
          }
          temp.setDate(temp.getDate() + 1);
        }
        
        if (hasBlocked) {
          setErrorMsg("Selected range contains already-reserved days. Please adjust your range.");
          setCheckIn(dateString);
          setCheckOut("");
        } else {
          setCheckOut(dateString);
        }
      }
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setErrorMsg("");
    setSuccessBooking(null);
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const handleNextMonth = () => {
    setErrorMsg("");
    setSuccessBooking(null);
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    
    // First day of the selected month
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    // Day of the week of first day (0 = Sun, 1 = Mon, etc.)
    const startOfWeek = firstDay.getDay();
    
    // Days in current month
    const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    
    // Days in previous month
    const prevMonthDays = new Date(calendarYear, calendarMonth, 0).getDate();
    
    // Get date today
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Add offset days from prior month
    for (let i = startOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      let prevMonth = calendarMonth - 1;
      let prevYear = calendarYear;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear -= 1;
      }
      const d = new Date(prevYear, prevMonth, dayNum);
      const dateString = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      
      const isReserved = takenDates.includes(dateString);
      const isSelCheckIn = checkIn === dateString;
      const isSelCheckOut = checkOut === dateString;
      
      let isSelectedRange = false;
      if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        isSelectedRange = d >= start && d <= end;
      } else if (checkIn) {
        isSelectedRange = isSelCheckIn;
      }
      
      days.push({
        date: d,
        dateString,
        dayNum,
        isCurrentMonth: false,
        isToday: d.toDateString() === today.toDateString(),
        isReserved,
        isCheckIn: isSelCheckIn,
        isCheckOut: isSelCheckOut,
        isSelectedRange,
      });
    }
    
    // Add current month days
    for (let i = 1; i <= totalDays; i++) {
      const d = new Date(calendarYear, calendarMonth, i);
      const dateString = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      
      const isReserved = takenDates.includes(dateString);
      const isSelCheckIn = checkIn === dateString;
      const isSelCheckOut = checkOut === dateString;
      
      let isSelectedRange = false;
      if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        isSelectedRange = d >= start && d <= end;
      } else if (checkIn) {
        isSelectedRange = isSelCheckIn;
      }
      
      days.push({
        date: d,
        dateString,
        dayNum: i,
        isCurrentMonth: true,
        isToday: d.toDateString() === today.toDateString(),
        isReserved,
        isCheckIn: isSelCheckIn,
        isCheckOut: isSelCheckOut,
        isSelectedRange,
      });
    }
    
    // Fill remaining slots to make nice multiples of 7
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      let nextMonth = calendarMonth + 1;
      let nextYear = calendarYear;
      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear += 1;
      }
      const d = new Date(nextYear, nextMonth, i);
      const dateString = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      
      const isReserved = takenDates.includes(dateString);
      const isSelCheckIn = checkIn === dateString;
      const isSelCheckOut = checkOut === dateString;
      
      let isSelectedRange = false;
      if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        isSelectedRange = d >= start && d <= end;
      } else if (checkIn) {
        isSelectedRange = isSelCheckIn;
      }
      
      days.push({
        date: d,
        dateString,
        dayNum: i,
        isCurrentMonth: false,
        isToday: d.toDateString() === today.toDateString(),
        isReserved,
        isCheckIn: isSelCheckIn,
        isCheckOut: isSelCheckOut,
        isSelectedRange,
      });
    }
    
    return days;
  };

  return (
    <div className="animate-fade-in space-y-16 pb-16">
      
      {/* Intro header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-semibold text-hotel-gold tracking-widest uppercase block mb-2">Heritage Accommodations</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Select Your Level</h1>
        <p className="text-sm text-gray-400 font-light leading-relaxed">
          New Love International is architecturally tier-zoned. Explore our bespoke ground floor studios, botanical mid-level escapes, or the soaring heights of our Zenith penthouse.
        </p>
      </section>

      {/* Curved Perspective Level Deck */}
      <section className="bg-white/5 border border-white/5 py-12 rounded-3xl max-w-7xl mx-auto px-4 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 w-24 h-24 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        
        <div className="text-center mb-8">
          <span className="text-[10px] bg-[#D4AF37]/15 text-[#D4AF37] px-3.5 py-1 rounded-full font-bold uppercase tracking-widest">
            3D Building Elevation Selector
          </span>
          <p className="text-xs text-gray-400 mt-2 font-mono">Click a floor plate to inspect its bespoke architecture</p>
        </div>

        {/* Floor selector (side-by-side & straight) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10 text-left">
          {/* Standard Room Card (Ground) */}
          <button
            key="standard"
            type="button"
            onClick={() => setSelectedSuiteId("standard")}
            className={`rounded-xl p-5 text-left border cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px] ${
              selectedSuiteId === "standard"
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_8px_24px_rgba(212,175,55,0.2)]"
                : "bg-[#121212] text-gray-300 border-white/5 hover:bg-white/5 hover:border-white/10"
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <span className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded font-bold ${
                selectedSuiteId === "standard" ? "bg-black/10 text-black animate-pulse" : "bg-white/5 text-gray-400"
              }`}>
                Ground Floor
              </span>
              <span className="text-[10px] font-mono font-bold opacity-90">₦185,000 / Night</span>
            </div>
            <div className="mt-4">
              <h4 className="font-serif text-base font-bold leading-tight">Heritage Studio</h4>
              <p className={`text-[10px] mt-1 font-sans ${selectedSuiteId === "standard" ? "text-gray-800" : "text-gray-400"}`}>
                Coastal details &amp; premium hand-carved Yoruba wood accents.
              </p>
            </div>
          </button>

          {/* Deluxe Room Card (Mid) */}
          <button
            key="deluxe"
            type="button"
            onClick={() => setSelectedSuiteId("deluxe")}
            className={`rounded-xl p-5 text-left border cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px] ${
              selectedSuiteId === "deluxe"
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_8px_24px_rgba(212,175,55,0.2)]"
                : "bg-[#121212] text-gray-300 border-white/5 hover:bg-white/5 hover:border-white/10"
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <span className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded font-bold ${
                selectedSuiteId === "deluxe" ? "bg-black/10 text-black animate-pulse" : "bg-white/5 text-gray-400"
              }`}>
                Mid-Level
              </span>
              <span className="text-[10px] font-mono font-bold opacity-90">₦320,000 / Night</span>
            </div>
            <div className="mt-4">
              <h4 className="font-serif text-base font-bold leading-tight">Sky Garden Room</h4>
              <p className={`text-[10px] mt-1 font-sans ${selectedSuiteId === "deluxe" ? "text-gray-800" : "text-gray-400"}`}>
                Elevated canopy views with integrated botanical private veranda.
              </p>
            </div>
          </button>

          {/* Executive Suite (Penthouse) */}
          <button
            key="executive"
            type="button"
            onClick={() => setSelectedSuiteId("executive")}
            className={`rounded-xl p-5 text-left border cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px] ${
              selectedSuiteId === "executive"
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_8px_24px_rgba(212,175,55,0.2)]"
                : "bg-[#121212] text-gray-300 border-white/5 hover:bg-white/5 hover:border-white/10"
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <span className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded font-bold ${
                selectedSuiteId === "executive" ? "bg-black/10 text-black animate-pulse" : "bg-white/5 text-gray-400"
              }`}>
                Penthouse Zenith
              </span>
              <span className="text-[10px] font-mono font-bold opacity-90">₦750,000 / Night</span>
            </div>
            <div className="mt-4">
              <h4 className="font-serif text-base font-bold leading-tight">Lagos Zenith Suite</h4>
              <p className={`text-[10px] mt-1 font-sans ${selectedSuiteId === "executive" ? "text-gray-800" : "text-gray-400"}`}>
                Ultra-private heights with dual ocean views &amp; skylit sound bath.
              </p>
            </div>
          </button>
        </div>

        {/* Room Display Context - Side-by-Side Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto text-left">
          <div className="md:col-span-7 relative overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[16/9] shadow-2xl border border-white/5 p-1 bg-white/5">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <img
                alt={selectedSuite.name}
                className="w-full h-full object-cover transition-all duration-500 filter brightness-90"
                src={selectedSuite.image}
              />
            </div>
            <div className="absolute top-6 right-6 bg-[#080808]/90 backdrop-blur-md px-4 py-1.5 rounded-sm border border-white/10 text-white font-mono text-sm shadow-md">
              {selectedSuite.priceFormatted} <span className="text-[10px] text-gray-400">/ Night</span>
            </div>
          </div>

          <div className="md:col-span-5 space-y-5 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">{selectedSuite.elevation}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-[10px] uppercase font-bold text-gray-400">{selectedSuite.tier}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white">{selectedSuite.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{selectedSuite.description}</p>
            </div>

            <div className="border-t border-white/5 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2.5">Bespoke Inclusions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                {selectedSuite.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form + Calculator Container */}
      <section className="max-w-5xl mx-auto px-4 grid md:grid-cols-12 gap-8 text-left">
        {/* Booking Form */}
        <div className="md:col-span-7 bg-white/5 border border-white/5 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
            <div className="w-9 h-9 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center text-[#D4AF37]">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Reserve your Suite</h3>
              <p className="text-[11px] text-gray-400">Offline Simulated Inquiry Desk</p>
            </div>
          </div>

          <form onSubmit={handleCreateBooking} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Primary Guest Name</label>
              <input
                type="text"
                required
                placeholder="Chief Chinua Achebe"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Check-In Date</label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCheckIn(val);
                    setErrorMsg("");
                    setSuccessBooking(null);
                    if (checkOut && val && new Date(val) >= new Date(checkOut)) {
                      setCheckOut("");
                    }
                  }}
                  className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Check-Out Date</label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setErrorMsg("");
                    setSuccessBooking(null);
                  }}
                  className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            {/* Interactive Availability Calendar Planner */}
            <div className="bg-[#0f0f0f] border border-white/5 p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <h4 className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">Stay &amp; Block Calendar Workspace</h4>
                </div>
                
                {/* Month navigation buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-white/5 rounded border border-white/15 text-gray-400 hover:text-[#D4AF37] transition-all cursor-pointer text-xs"
                    title="Previous Month"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-white uppercase min-w-[76px] text-center">
                    {monthNames[calendarMonth]} {calendarYear}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-white/5 rounded border border-white/15 text-gray-400 hover:text-[#D4AF37] transition-all cursor-pointer text-xs"
                    title="Next Month"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Status indicators */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[9px] text-gray-400 pb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#131313] border border-white/5 rounded" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-950/10 border border-red-900/20 rounded" />
                  <span>Reserved / Taken</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full" />
                  <span className="text-white">Check-in / Check-out</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-2.5 bg-[#D4AF37]/15 border-y border-[#D4AF37]/20" />
                  <span>Selected Range</span>
                </div>
              </div>

              {/* Grid of days */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((lbl, idx) => (
                  <span key={idx} className="text-[9px] font-bold uppercase text-gray-500 tracking-wider py-1">
                    {lbl}
                  </span>
                ))}

                {/* Calendar Days */}
                {generateCalendarDays().map((day) => {
                  let cellClasses = "relative text-[10px] py-2 font-mono font-medium transition-all flex flex-col items-center justify-center select-none w-full h-9 ";
                  
                  if (day.isReserved) {
                    cellClasses += "bg-red-950/10 border border-red-900/20 text-red-400/50 cursor-not-allowed opacity-50 rounded-md";
                  } else if (day.isCheckIn || day.isCheckOut) {
                    cellClasses += "bg-[#D4AF37] text-black font-semibold cursor-pointer shadow-[0_3px_12px_rgba(212,175,55,0.3)] z-10 ";
                    if (day.isCheckIn && day.isCheckOut) {
                      cellClasses += "rounded-full";
                    } else if (day.isCheckIn) {
                      cellClasses += checkOut ? "rounded-l-full rounded-r-none" : "rounded-full";
                    } else if (day.isCheckOut) {
                      cellClasses += "rounded-r-full rounded-l-none";
                    }
                  } else if (day.isSelectedRange) {
                    cellClasses += "bg-[#D4AF37]/15 text-[#D4AF37] border-y border-[#D4AF37]/20 cursor-pointer rounded-none";
                  } else {
                    cellClasses += "bg-[#131313] hover:bg-white/5 border border-white/5 hover:border-[#D4AF37]/40 cursor-pointer rounded-md ";
                    if (!day.isCurrentMonth) {
                      cellClasses += "text-gray-600 opacity-25 ";
                    } else {
                      cellClasses += "text-gray-300 ";
                    }
                  }

                  return (
                    <button
                      key={day.dateString}
                      type="button"
                      disabled={day.isReserved}
                      onClick={() => handleDayClick(day.dateString)}
                      className={cellClasses}
                      title={`${day.dateString} ${day.isReserved ? "(Reserved)" : "(Available)"}`}
                    >
                      <span className="text-[10px]">{day.dayNum}</span>
                      {day.isToday && (
                        <span className="absolute bottom-1 w-1 h-1 bg-[#D4AF37] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Educational Blueprint Panel: Best ways to enforce real DB locking endpoints */}
              <div className="border-t border-white/5 pt-3.5 mt-2 text-left space-y-2.5">
                <span className="text-[9px] font-bold font-mono text-[#D4AF37] tracking-[0.15em] uppercase block">
                  🛡️ Production Sync &amp; Database Lock Strategy
                </span>
                
                <div className="space-y-2 text-[10px] leading-relaxed text-gray-400 font-light">
                  <p>
                    Because multiple users may attempt to reserve the same nights simultaneously, client-only validation is insufficient. Here are the professional backend practices recommended to establish clean booking consistency:
                  </p>

                  <div className="space-y-2 bg-[#0a0a0a] p-3 rounded-lg border border-white/5 font-mono text-[9px] text-gray-300">
                    <div>
                      <span className="text-emerald-400 font-bold block mb-1">// 1. Database Schema Design (Firestore example)</span>
                      <p className="text-gray-500 font-sans leading-normal">
                        Create a root collection <code className="text-[#D4AF37]">rooms</code> and a synchronized date mapper:
                      </p>
                      <pre className="text-gray-400 mt-1">
{`rooms: {
  suiteId: "deluxe",
  reservedDates: ["2026-05-26", "2026-05-27"] // String fast lookup
}
// Or queries against a sub-collection "bookings" using range checks`}
                      </pre>
                    </div>

                    <div className="border-t border-white/5 pt-2 mt-2">
                      <span className="text-emerald-400 font-bold block mb-1">// 2. Preventing Double-Booking Race Conditions</span>
                      <p className="text-gray-500 font-sans leading-normal">
                        Utilize a <strong className="text-white">Firestore Transaction</strong> (`runTransaction()`) to verify dates in an atomic write block:
                      </p>
                      <pre className="text-gray-400 mt-1">
{`await db.runTransaction(async (transaction) => {
  const roomRef = db.collection("rooms").doc(suiteId);
  const roomDoc = await transaction.get(roomRef);
  const reserved = roomDoc.data().reservedDates || [];
  
  // Verify if requested stay range overlaps any existing stay dates
  const overlaps = requestedDates.some(d => reserved.includes(d));
  if (overlaps) throw new Error("Dates already fully booked!");

  // Safely write reservation
  transaction.update(roomRef, {
    reservedDates: [...reserved, ...requestedDates]
  });
});`}
                      </pre>
                    </div>

                    <div className="border-t border-white/5 pt-2 mt-2">
                      <span className="text-emerald-400 font-bold block mb-1">// 3. Query Interval Check Logic (Express Endpoint)</span>
                      <pre className="text-gray-400 mt-1 mb-1">
{`// Query intersection check: (StartA < EndB) && (EndA > StartB)
const overlapping = await db.collection("bookings")
  .where("suiteId", "==", suiteId)
  .where("checkIn", "<", requestedCheckOut)
  .where("checkOut", ">", requestedCheckIn)
  .get();`}
                      </pre>
                      <p className="text-gray-500 font-sans leading-normal">
                        If the query returns empty, the suite is entirely vacant and the user transaction safely proceeds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Number of Guests</label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
                <span className="text-[10px] text-gray-500 block mt-1">
                  * Limit based on room tier
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Room Selected</label>
                <div className="bg-[#1a1a1a] border border-white/5 px-4 py-3 rounded-lg text-xs text-[#D4AF37] font-medium">
                  {selectedSuite.name}
                </div>
              </div>
            </div>

            {errorMsg && (
              <div id="booking-error" className="bg-red-950/40 text-red-200 border border-red-900/40 p-3 rounded-lg flex items-start gap-2 text-xs">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              id="submit-booking"
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#F5D061] text-black font-semibold text-xs tracking-widest uppercase transition-colors py-4 rounded-sm flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              CONFIRM RESERVATION <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Live Bill Receipt Breakdown */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="bg-[#131313] border border-white/5 p-6 rounded-2xl shadow-xl flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#fffdf4] uppercase tracking-wider block">Estimated Cost Statement</span>
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Suite Selection</span>
                  <span className="font-semibold text-white">{selectedSuite.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Rate / Night</span>
                  <span className="font-semibold text-white font-mono">{selectedSuite.priceFormatted}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Total Stay Duration</span>
                  <span className="font-semibold text-white">
                    {totalNights() > 0 ? `${totalNights()} Night${totalNights() > 1 ? "s" : ""}` : "0 nights"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Occupancy</span>
                  <span className="font-semibold text-white">{guests} Guests</span>
                </div>
                <div className="h-px bg-white/5 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Cumulative Bill</span>
                  <span className="text-xl font-bold font-mono text-[#D4AF37]">
                    ₦{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Success Booking Notice inside summary desk */}
            {successBooking && (
              <div id="booking-success-alert" className="mt-6 bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-xl p-4.5 text-left text-xs text-white space-y-3 shadow-md animate-fade-in animate-slide-up">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  RESERVATION CONFIRMED
                </div>
                <p className="text-gray-300 leading-relaxed font-light font-sans">
                  Congratulations! We have secured a spot for <strong className="font-semibold text-white">{successBooking.guestName}</strong>.
                </p>
                <div className="bg-[#0c0c0c] p-3 rounded-md border border-white/5 text-[11px] font-mono space-y-1 text-gray-300">
                  <div><strong>Booking Ref:</strong> {successBooking.id}</div>
                  <div><strong>Tier Floor:</strong> {successBooking.suiteName}</div>
                  <div><strong>Dates:</strong> {successBooking.checkIn} to {successBooking.checkOut}</div>
                  <div><strong>Guest Capacity:</strong> {successBooking.guests} Checked</div>
                </div>
              </div>
            )}
            
            {!successBooking && (
              <div className="mt-8 bg-white/5 p-4 rounded-xl border border-dashed border-white/10 text-center text-[11px] text-gray-400">
                Your reservation card will download and generate a local printable invoice immediately upon confirmation.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bookings Storage Center */}
      {bookings.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 text-left space-y-6">
          <h3 className="font-serif text-xl font-semibold text-white">Your Active Bookings ({bookings.length})</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-[#121212] rounded-xl border border-white/5 p-5 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37]" />
                
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] bg-[#1e1e1e] text-gray-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest block w-max">
                      {booking.id}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-white mt-1.5">
                      {booking.suiteName}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Cancel Booking"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-gray-300 font-sans border-t border-white/5 pt-3 mt-3">
                  <div className="flex justify-between border-b border-white/[0.02] pb-1">
                    <span>Lead Guest</span>
                    <span className="font-medium text-white">{booking.guestName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.02] pb-1">
                    <span>Dates</span>
                    <span className="font-medium text-white">{booking.checkIn} to {booking.checkOut}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.02] pb-1">
                    <span>Guests</span>
                    <span className="font-medium text-white">{booking.guests} {booking.guests > 1 ? "people" : "person"}</span>
                  </div>
                  <div className="flex justify-between font-mono font-medium text-[#D4AF37] pt-1.5 border-t border-dashed border-white/5">
                    <span>Total Rate Paid</span>
                    <span>₦{booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
