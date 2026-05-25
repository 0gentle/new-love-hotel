import React, { useState, useEffect } from "react";
import { Send, FileCheck, Landmark, Flame, ShieldAlert, Award, FileText, CheckCircle } from "lucide-react";
import { SavedInquiry } from "../types";

export default function EventsSection() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [eventType, setEventType] = useState<string>("Bespoke Cultural Gala");
  const [expectedGuests, setExpectedGuests] = useState<number>(150);
  const [message, setMessage] = useState<string>("");
  const [inquiries, setInquiries] = useState<SavedInquiry[]>([]);
  const [inquirySuccess, setInquirySuccess] = useState<SavedInquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [brochureDownloaded, setBrochureDownloaded] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("nil_rfps");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmitRFP = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setInquirySuccess(null);

    if (!fullName.trim() || !email.trim()) {
      setErrorMsg("Please provide your full name and email address.");
      return;
    }

    if (expectedGuests < 10) {
      setErrorMsg("Our Sacred Spaces host gatherings for 10 or more refined guests.");
      return;
    }

    if (expectedGuests > 450) {
      setErrorMsg("Our maximum ballroom capacity is 450 seated guests to maintain comfort and breathing boundaries.");
      return;
    }

    const newInquiry: SavedInquiry = {
      id: "RFP-" + Math.floor(1000 + Math.random() * 9000),
      fullName,
      email,
      eventType,
      expectedGuests,
      message,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      status: "pending"
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("nil_rfps", JSON.stringify(updated));

    setInquirySuccess(newInquiry);
    setFullName("");
    setEmail("");
    setMessage("");
  };

  const handleDownloadBrochure = () => {
    setBrochureDownloaded(true);
    setTimeout(() => {
      setBrochureDownloaded(false);
    }, 5000);
  };

  return (
    <div className="animate-fade-in space-y-16 pb-16">
      
      {/* Visual Header Banner */}
      <section className="relative h-[45vh] min-h-[300px] w-full flex items-center overflow-hidden rounded-2xl md:rounded-3xl shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            alt="Sacred Spaces Grand ballroom prepared with table layouts and gold drapery in Lagos"
            className="w-full h-full object-cover filter brightness-50 scale-102"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZRJepezWzT0dKaRg-_tf9YTCwzAwvGzj4G1GFCWoDALoKaulyPFKuuA03U3yUGeD8HTpdN4wilFdQ5Z6DHbU8eCwRJi1cDU1hSkpJVEdhS2oTzRWEzNGP4iwGM2qsehp8ykevuFFKCKTZPDaFrp3ttcIfYuW7OGWUBfn-vlQTmYCayfECWJt8jXla_9Dd_Nw2IZp54fvm9bWoe7mYFq97SFhQWiGGJWwIvZHgT5XBTi1M7T-cW7ztvsVlpQHmmiR6sIIBTv_8ww"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/45 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-white text-left space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit">
            <Landmark className="w-3.5 h-3.5" />
            The Sacred Spaces Center
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold">
            Bespoke summits &amp; <br />
            <span className="italic font-normal text-[#D4AF37]">Cultural Galas</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm max-w-xl text-gray-300 font-light leading-relaxed">
            Frame your grand milestones in a soaring 12-meter high-ceilinged atrium styled with gold tapestries and local hardwoods.
          </p>
        </div>
      </section>

      {/* Main double column: specs & gourmet catering block */}
      <section className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 text-left items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] font-semibold rounded-full text-[10px] uppercase tracking-widest border border-[#D4AF37]/20">
            CULINARY PERFECTION
          </div>
          <h2 className="font-serif text-3xl font-semibold text-white leading-tight">
            Curated Gastronomy &amp; <br />
            <span className="italic font-normal text-[#D4AF37]">Plated Ecstasy</span>
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Every gala hosted in our Sacred Spaces features customized menus developed by our award-winning culinary directors. We combine traditional Nigerian heritage spices with modern French gastronomy and presentation styles. Each dish is plated on hand-thrown local pottery, accompanied by custom brass utensils.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div>
              <span className="block font-serif text-2xl text-[#D4AF37] font-bold">450</span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Seated Cap</span>
            </div>
            <div>
              <span className="block font-serif text-2xl text-[#D4AF37] font-bold">800 m²</span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Atrium Floor Area</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownloadBrochure}
              className="bg-[#D4AF37] hover:bg-[#F5D061] text-black px-6 py-4 rounded-sm text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <FileText className="w-4 h-4 text-black" /> DOWNLOAD GOURMET BROCHURE (PDF)
            </button>

            {brochureDownloaded && (
              <div className="mt-4 p-3.5 bg-white/5 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-sans rounded-md flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                <span>New Love International Gourmet Catering PDF started downloading.</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          <div className="border border-white/5 p-1 bg-white/5 rounded-2xl shadow-2xl">
            <img
              alt="Bespoke luxury culinary plated concepts with custom pottery in West Africa"
              className="w-full h-full object-cover rounded-xl aspect-[4/3] group-hover:scale-[1.01] transition-transform duration-500 filter brightness-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpRsF5geNrQW5j8XPCaEuVJDVmHpj9oPdGmJLA8xlaIKSdvP10kCFURUIV7NKQHTuV4qvRKHAPmBipOhzA_zusAeKyB9G1i_U3vu_CtUQKfRujg9BylNJLbslwV1VdldlfZmztw0HdJoPV4V-TwUUBJxiX1FeTDGqgth8wl4zjJB-5GNIq1vwzz5kNwEFwN31Tfo_NNH7r7SFf3jJ8lsKDgGB_F-Ec0zV7JLr9zjLjfdpLLWsEf5BjDG9AJ_xc2X999LhB3wOXOQ"
            />
          </div>
        </div>
      </section>

      {/* RFP Inquiry Form & Submission list */}
      <section className="max-w-5xl mx-auto px-4 grid md:grid-cols-12 gap-8 text-left">
        {/* RFP Submission */}
        <div className="md:col-span-7 bg-white/5 border border-white/5 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
            <div className="w-9 h-9 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center text-[#D4AF37]">
              <FileCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Submit Request for Proposal (RFP)</h3>
              <p className="text-[11px] text-gray-400 font-light">Custom milestones, summits and gala consultation</p>
            </div>
          </div>

          <form onSubmit={handleSubmitRFP} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Aliko Dangote"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="contact@dangote.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Event Conception Type</label>
                <div className="relative">
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                  >
                    <option value="Bespoke Cultural Gala">Bespoke Cultural Gala</option>
                    <option value="Executive Corporate Summit">Executive Corporate Summit</option>
                    <option value="High-Society Wedding Ceremony">High-Society Wedding Ceremony</option>
                    <option value="Private Fine-Dining Culinary Tasting">Private Fine-Dining Tasting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Expected Guests</label>
                <input
                  type="number"
                  required
                  min={10}
                  max={450}
                  value={expectedGuests}
                  onChange={(e) => setExpectedGuests(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1.5">Message / Architectural Details</label>
              <textarea
                rows={4}
                required
                placeholder="Share your specific botanical wishes, styling ideas, preferred caterer configurations, and acoustic soundscape wishes..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#131313] border border-white/10 px-4 py-3 rounded-lg text-xs font-sans text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>

            {errorMsg && (
              <div id="rfp-error" className="bg-red-950/40 text-red-200 border border-red-900/40 p-3 rounded-lg flex items-start gap-2 text-xs">
                <ShieldAlert className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              id="submit-rfp"
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#F5D061] text-black font-semibold text-xs tracking-widest uppercase transition-colors py-4 rounded-sm flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              SEND PROPOSAL BRIEF <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Informational specs and inquiry list tracker */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="bg-[#131313] border border-white/5 p-6 rounded-2xl flex-grow space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Submitted Proposals Status</h4>
            
            {inquirySuccess && (
              <div id="rfp-success" className="bg-[#1a1a1a] border border-[#D4AF37]/30 p-4.5 rounded-xl space-y-3 animate-fade-in animate-slide-up text-xs">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold uppercase tracking-widest">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                  PROPOSAL LOGGED
                </div>
                <p className="text-gray-300 leading-relaxed font-light">
                  A bespoke Event Director will contact <strong className="font-semibold text-white">{inquirySuccess.fullName}</strong> within 3 business hours.
                </p>
                <div className="bg-[#0c0c0c] border border-white/5 p-3 rounded-md text-[10px] font-mono text-gray-300 text-left space-y-1">
                  <div><strong>ID Code:</strong> {inquirySuccess.id}</div>
                  <div><strong>Theme:</strong> {inquirySuccess.eventType}</div>
                  <div><strong>Guests:</strong> {inquirySuccess.expectedGuests} seated</div>
                </div>
              </div>
            )}

            {inquiries.length > 0 ? (
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-[#181818] p-4 rounded-xl border border-white/5 text-xs flex justify-between items-center hover:bg-[#202020] transition-colors">
                    <div>
                      <span className="font-mono text-[9px] text-gray-500 block">{inq.id} • {inq.createdAt}</span>
                      <strong className="text-white font-medium font-serif block mt-0.5">{inq.eventType}</strong>
                      <span className="text-[10px] text-gray-400 font-light">{inq.fullName} ({inq.expectedGuests} guests)</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider text-[#D4AF37] uppercase text-right shrink-0">
                      ● IN QUEUE
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-[11px] text-gray-400 py-8 border border-dashed border-white/10 bg-white/5 rounded-xl">
                No active RFP inquiries logged yet. Fill the brief on the left to track proposal status immediately.
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
