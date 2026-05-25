import React, { useState, useEffect } from "react";
import { Dumbbell, Calendar, SlidersHorizontal, Sparkles, CheckCircle, Clock, User, HeartHandshake } from "lucide-react";
import { WELLNESS_CLASSES } from "../data";
import { WellnessClass } from "../types";

export default function WellnessSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeRegistrations, setActiveRegistrations] = useState<string[]>([]);
  const [registrationMsg, setRegistrationMsg] = useState<{ [classId: string]: string }>({});

  // Load registration history from state
  useEffect(() => {
    const saved = localStorage.getItem("nil_wellness_reg");
    if (saved) {
      try {
        setActiveRegistrations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleRegister = (classId: string, className: string) => {
    const isAlreadyRegistered = activeRegistrations.includes(classId);
    let updatedRegistrations: string[];

    if (isAlreadyRegistered) {
      // Unregister
      updatedRegistrations = activeRegistrations.filter((id) => id !== classId);
      const updatedMsgs = { ...registrationMsg };
      delete updatedMsgs[classId];
      setRegistrationMsg(updatedMsgs);
    } else {
      // Register
      updatedRegistrations = [...activeRegistrations, classId];
      setRegistrationMsg((prev) => ({
        ...prev,
        [classId]: `Successfully booked! We look forward to seeing you at ${className}.`
      }));
    }

    setActiveRegistrations(updatedRegistrations);
    localStorage.setItem("nil_wellness_reg", JSON.stringify(updatedRegistrations));
  };

  const categories = ["all", "yoga", "strength", "mindfulness"];

  const filteredClasses = selectedCategory === "all"
    ? WELLNESS_CLASSES
    : WELLNESS_CLASSES.filter((c) => c.category === selectedCategory);

  return (
    <div className="animate-fade-in space-y-16 pb-16">
      
      {/* Visual Header Banner */}
      <section className="relative h-[45vh] min-h-[300px] w-full flex items-center overflow-hidden rounded-2xl md:rounded-3xl shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            alt="Lagos Wellness Suite and gym area with wood design"
            className="w-full h-full object-cover scaled-img filter brightness-75"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKkV5KGwl7Euu3_FflxVDmcK2VSkLk5fANVPeNsaQTq_h-3h-P1iYBOJf8ibCXxuzlga4I2aUqm3w_hamvc8i0nvtQ3m2D9ktJZIre5ms29xY1NHUzP3OXLinjd33-CTcMXHDiqHnWOtOVzSmY3JPXWHrzg4Gb6e44BskaA7fh0DJL93PrO70_RCoVub6Z3-u5YmR3_PI7CvhB-xnFYpDAKUbzupzOX4xEt_TdJCjUEBl6MgG98doyAnEutZEGkOTXs076J9Nxtg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hotel-charcoal/90 via-hotel-charcoal/30 to-black/10" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-white text-left space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-hotel-gold-light/95 text-hotel-charcoal px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit">
            <HeartHandshake className="w-3.5 h-3.5" />
            Lagos Wellness Suite &amp; Spa
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold">
            The Botanical <br />
            <span className="italic font-normal text-hotel-gold-light">Sanctuary</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm max-w-xl text-hotel-clay/90 font-light leading-relaxed">
            Decompress from the Lagos heat. Realign mind and body amidst our custom wood-carved details, cascading moisture waterfalls, and expert instructors.
          </p>
        </div>
      </section>

      {/* Wellness quotes / features section */}
      <section className="max-w-5xl mx-auto px-4 grid sm:grid-cols-3 gap-8 text-left">
        <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-2xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">THERAPY</span>
            <h3 className="font-serif text-base font-semibold text-white mb-1">Acoustic Soundscapes</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              High-ceiling sound bathing ceremonies leveraging authentic brass singing bowls from the coastal hinterland.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-2xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">FITNESS CORE</span>
            <h3 className="font-serif text-base font-semibold text-white mb-1">High-Contrast Training</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              A comprehensive gym suite loaded with premium kettlebells, power racks, and specialized rowing ergometers.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-2xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">BOTANICALS</span>
            <h3 className="font-serif text-base font-semibold text-white mb-1">Phyto-Hydro Therapy</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Cascading snake plants and air-purifying broadleaf ferns absorbing moisture to create a perfect breathing dome.
            </p>
          </div>
        </div>
      </section>

      {/* Class Calendar Selector Grid */}
      <section className="max-w-5xl mx-auto px-4 text-left space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-white">Botanical Class Calendar</h2>
            <p className="text-xs text-gray-400 font-light">Secure your complimentary session during your hotel stay</p>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
            <div className="flex gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#D4AF37] text-black font-semibold"
                      : "bg-white/5 hover:bg-white/10 text-gray-400 border border-white/5"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Classes List view */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredClasses.map((cl) => {
            const isRegistered = activeRegistrations.includes(cl.id);
            return (
              <div
                key={cl.id}
                className={`bg-[#131111]/90 border p-6 transition-all rounded-xl relative flex flex-col justify-between shadow-2xl ${
                  isRegistered ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/50" : "border-white/5"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-white/5 text-[#D4AF37]">
                      {cl.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{cl.time}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-semibold text-white mb-1">
                      {cl.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {cl.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-2 border-b border-dotted border-white/5 text-[11px] text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{cl.day}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{cl.coach}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2 space-y-3">
                  {registrationMsg[cl.id] && (
                    <div className="bg-[#1a1a1a] text-white p-3 rounded-lg flex items-start gap-1.5 text-[11px] border border-[#D4AF37]/20">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="leading-snug">{registrationMsg[cl.id]}</span>
                    </div>
                  )}

                  <button
                    onClick={() => handleRegister(cl.id, cl.name)}
                    className={`w-full py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-colors border flex items-center justify-center gap-2 cursor-pointer ${
                      isRegistered
                        ? "bg-[#1e1e1e] border-white/10 text-[#D4AF37] hover:bg-white/5"
                        : "bg-[#D4AF37] border-[#D4AF37] text-black hover:bg-[#F5D061]"
                    }`}
                  >
                    {isRegistered ? "CANCEL MY SPOT" : "REGISTER FOR SESSION"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
