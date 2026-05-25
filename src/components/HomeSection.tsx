import React from "react";
import { ArrowRight, ArrowUpRight, Landmark, Sparkles, Trophy } from "lucide-react";
import { LAGOS_EXPLORATION } from "../data";

interface HomeSectionProps {
  onNavigate: (tabId: string) => void;
}

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
    <div className="animate-fade-in space-y-20 pb-16">
      {/* Premium Hero Banner */}
      <section className="relative h-[80vh] min-h-[500px] w-full flex items-center overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            alt="Lagos sunset waterfront skyline"
            className="w-full h-full object-cover scale-105 animate-fade-in filter brightness-75"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGNpUwZnBY26jGfddT6ImOP0EChFpepGKJPITiY78A5Ke5Ol-jrrtXy8eQ41DemgF_UmiUTrYqmQ3RqetOp1yOFwFbJ72FkRm6Emyv_gTS0ef-Ja3-x5dTEmlCDN55WC5y_QAYCfJJSOnR5fx5ftL-mpoS9-gUD-oAoph-6novOTtPSgai_tL3GZx7wNCj1SIxVzV5kkx0CHusWQI2YeIwOjXE_haXGYsPZoufS2Df6PnjJPBVkRsuPC5gibPMHswUJau_oIZVIA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hotel-charcoal/90 via-black/40 to-black/20" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-white space-y-6">
          <div className="inline-flex items-center gap-2 bg-hotel-gold/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#fffdf4]">
            <Sparkles className="w-3.5 h-3.5 text-hotel-gold-light" />
            Lagosian Refined Haven
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight tracking-tight">
            Modern African Luxury <br />
            <span className="italic font-normal text-hotel-gold-light">Reimagined.</span>
          </h1>
          <p className="font-sans text-sm sm:text-lg max-w-xl text-hotel-clay/90 font-light leading-relaxed">
            Experience the rhythmic, sophisticated soul of Lagos within an oasis of curated heritage, biophilic breathability, and bespoke opulence.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              id="hero-book-now"
              onClick={() => onNavigate("suites")}
              className="bg-hotel-gold hover:bg-hotel-gold/90 text-white font-medium text-xs sm:text-sm tracking-widest uppercase hover:scale-[1.03] transition-all px-8 py-4.5 rounded-lg flex items-center gap-2.5 shadow-lg shadow-hotel-gold/20"
            >
              BOOK YOUR STAY <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Floating Info Desk Card */}
      <div className="max-w-5xl mx-auto px-4 -mt-24 relative z-20 hidden md:block">
        <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl border border-white/5 shadow-2xl flex items-center justify-between gap-6">
          <div className="flex-1 grid grid-cols-3 gap-6 text-left">
            <div className="border-r border-white/10 pr-4">
              <span className="text-xs font-semibold text-hotel-gold tracking-widest uppercase block mb-1">RECEPTION</span>
              <p className="font-serif text-lg text-[#fffdf4] font-medium">Bespoke Design</p>
              <span className="text-xs text-gray-400">Handcrafted Accents</span>
            </div>
            <div className="border-r border-white/10 pr-4">
              <span className="text-xs font-semibold text-hotel-gold tracking-widest uppercase block mb-1">EXPERIENCE</span>
              <p className="font-serif text-lg text-[#fffdf4] font-medium">Curated Culture</p>
              <span className="text-xs text-gray-400">Nike Gallery Excursions</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-hotel-gold tracking-widest uppercase block mb-1">STAY MODE</span>
              <p className="font-serif text-lg text-[#fffdf4] font-medium">Flexible Rates</p>
              <span className="text-xs text-gray-400 font-light">Simulated Checkout</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate("suites")}
            className="bg-hotel-gold hover:bg-[#F5D061] text-black font-semibold px-8 py-5 rounded-sm text-xs font-semibold tracking-widest uppercase transition-colors shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.25)]"
          >
            CHECK SUITES
          </button>
        </div>
      </div>

      {/* Legacy Introduction */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative group">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
          <img
            alt="New Love International Lobby space with yellow chairs and tapestries"
            className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5] object-center relative z-10 transition-transform duration-700 group-hover:scale-[1.01]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYmp6q7KedEej_NwDLk8nQrWMb4BywFsmMFBWnJiLSrxkfrH6mRx-OM_ZlW134OJAYJ5VNOnG_LbUDGDtaGJZByaf0UIBp_TaAojnyhmOaCvHiOPWYyBXA8p508_EKMEl-rBkPuk2ERLerEZNXdOFv7nqzVUtQCpGTH_bzFLXtZKQx-J7C7N8s-ELb0V7RRZrxQ3cFS6itGddfMQOo2IBaIHmMQCvKeiNIBcYSPWxngUCYRfrR6Ta8lzhx61bD06IPPF8nBJidBw"
          />
          <div className="absolute -bottom-4 -right-4 bg-hotel-gold-light p-6 rounded-xl hidden sm:block z-20 shadow-lg text-left max-w-[180px]">
            <Trophy className="w-5 h-5 text-[#080808] mb-2" />
            <p className="font-serif text-sm font-semibold text-[#080808] leading-snug">Elite African Excellence</p>
          </div>
        </div>

        <div className="space-y-6 text-left">
          <div className="inline-block px-4 py-1 border border-hotel-gold/30 text-hotel-gold font-semibold rounded-full text-xs uppercase tracking-widest bg-hotel-gold/5">
            The Legacy
          </div>
          <h2 className="font-serif text-4xl leading-tight text-white font-semibold flex flex-col">
            Our Heritage,
            <span className="text-hotel-gold italic font-normal">Your Sanctuary</span>
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-hotel-gold to-transparent w-24 rounded-full" />
          <p className="font-sans text-gray-400 leading-relaxed font-light">
            New Love International is more than a hotel; it's a love letter to the West African coast. We blend the rhythmic vibrancy of Lagos with the disciplined calm of global minimalism to create a space that feels both grounded and transcendental. Custom Adire patterns, local hand-thrown pottery, and lush biophilic flora merge in breathtaking harmony.
          </p>
          
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
            <div>
              <span className="block font-serif text-3xl text-hotel-gold font-bold">24</span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Bespoke Suites</span>
            </div>
            <div>
              <span className="block font-serif text-3xl text-hotel-gold font-bold">15</span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Local Artists</span>
            </div>
            <div>
              <span className="block font-serif text-3xl text-hotel-gold font-bold">03</span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Culinary Venues</span>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Igando & Alimosho - Bento Grid section */}
      <section className="bg-white/5 border border-white/5 py-16 px-6 md:px-12 rounded-3xl max-w-7xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 text-left">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-2 text-white">Explore Igando &amp; Alimosho</h2>
              <p className="text-gray-400 text-sm max-w-md font-light">
                Discover local cultural theatres, royal Yoruba palaces, and exquisite culinary hotspots adjacent to our boutique hotel.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Igando Theatre Card */}
            <div className="md:col-span-8 relative overflow-hidden rounded-2xl group min-h-[350px] flex items-end shadow-md">
              <img
                alt="Lagos Theatre Igando, a spectacular modern cultural center"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75"
                src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="relative z-10 p-8 text-left text-white max-w-lg space-y-3">
                <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[#D4AF37] text-black mb-1 font-sans">
                  Iconic Landmark
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold">Lagos Theatre Igando</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Lagos State's flagship community theatre hosting creative stage drama, local Lagosian film premieres, dance masterclasses, and vibrant contemporary African art festivals.
                </p>
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Lagos+Theatre+Igando"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#D4AF37] hover:text-white bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-md border border-[#D4AF37]/30 transition-all font-mono uppercase tracking-wider"
                  >
                    View on Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.google.com/search?q=Lagos+Theatre+Igando+events+plays+tickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/5 transition-all font-mono uppercase tracking-wider"
                  >
                    Search Plays <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Culinary Expeditions & Cultural Concierge Column */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {/* Culinary */}
              <div className="relative overflow-hidden rounded-2xl group min-h-[190px] flex items-end shadow-md flex-1">
                <img
                  alt="Fine dining table set with handcrafted West African ceramics"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwsv-_Xr__xj2W1y_uZrPCEQZcWEzX3HpBAY4tiK-bgCsPrYgtOvtjm_f2FnNdOZAt9N82nsUBda18laOBJ5W2dNUMbEWJLZm5DJi_M7GsPicLNnLoSPB8KvANYElJ7m2LfIbe8zaTNCX3vkdzDuywV1eE6QPmc84v__cIDjag0W2PFRyNTurEYaXbDalNXncBFf52heBzm4SxJG1xtzcvCagNhRosVDP2tdxfaV5w-jC_pkNrzQjCE5Z0pftY0tuRfK770mZw5g"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="relative z-10 p-5 text-left text-white w-full space-y-1">
                  <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider block font-mono">Culinary Expeditions</span>
                  <h3 className="font-serif text-base font-medium">Igando Food &amp; Chop Spots</h3>
                  <p className="text-[11px] text-gray-300 font-light leading-relaxed mb-3">
                    Savor local amala, authentic suya centers, or popular dining classics like CFM Cafe and Sweet Sensation.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=CFM+Cafe+Igando+Lagos"
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 text-[9px] font-mono text-[#D4AF37] hover:text-white font-semibold"
                    >
                      CFM Cafe <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                    <span className="text-gray-600 text-[9px]">•</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Sweet+Sensation+Igando+Lagos"
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 text-[9px] font-mono text-[#D4AF37] hover:text-white font-semibold"
                    >
                      Sweet Sensation <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Cultural Concept Box */}
              <div className="bg-[#151515] border border-white/5 p-5 rounded-2xl shadow-sm flex flex-col justify-between text-left relative overflow-hidden flex-1 group">
                <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.04] bg-[#D4AF37] rounded-full translate-x-4 -translate-y-4" />
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <Landmark className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider block font-mono">Heritage Tours</span>
                    <h3 className="font-serif text-base font-medium text-white">Yoruba Cultural Royalties</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light mt-1">
                      Experience historical Awori heritage with private tours of the Palace of Onigando of Igando or sacred nearby landmarks.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-white/5 flex gap-4">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Palace+of+the+Onigando+of+Igando"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#D4AF37] hover:text-white uppercase tracking-wider font-mono"
                  >
                    Onigando Palace <ArrowRight className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href="https://www.google.com/search?q=cultural+spots+and+history+Alimosho+and+Igando+Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-400 hover:text-white uppercase tracking-wider font-mono"
                  >
                    Explore Guide <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Quick Links / Highlight Sections */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 grid sm:grid-cols-3 gap-8 text-left">
        {/* Suites Spot */}
        <div className="group cursor-pointer" onClick={() => onNavigate("suites")}>
          <div className="relative overflow-hidden rounded-xl aspect-square mb-4 shadow-xl bg-white/5 border border-white/5 p-1">
            <div className="w-full h-full bg-[#111] overflow-hidden rounded-lg">
              <img
                alt="Luxury hotel room interior view"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-75"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOR7bed5zh2yr0SiLQzrnAQ-YAQr78z3JwX7GIsmP1k8XuJzQvX9CRbxvpp4kRVO08M5fy17CtuKeVzU598QGoU_PpgwRXwOtrBLqrgpMam6ckCMXVsM21DrJeR4llm58fKLmnyAT43QAfAyDiZgCVmBWGr33LGnH0X1xSQ9cduxwxFaVBnKdbAZUwtHCVsFgTbp2oAh8kL5Qwb3IgqI5onUw1YVV85rnbkjojKvHPvP2XAH1FJDCWHP8QYsAVkcLM2SK_pl-PFg"
              />
            </div>
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#fffdf4] mb-1 group-hover:text-hotel-gold transition-colors">
            Royal Heritage Suites
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light mb-3">
            Unparalleled ground floor, mid level, and penthouse selections.
          </p>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] border-b border-[#D4AF37]/30 pb-0.5 group-hover:border-hotel-gold">
            View Suites
          </span>
        </div>

        {/* Gym Spot */}
        <div className="group cursor-pointer" onClick={() => onNavigate("wellness")}>
          <div className="relative overflow-hidden rounded-xl aspect-square mb-4 shadow-xl bg-white/5 border border-white/5 p-1">
            <div className="w-full h-full bg-[#111] overflow-hidden rounded-lg">
              <img
                alt="Lagos Wellness Suite and gym area"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-75"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKkV5KGwl7Euu3_FflxVDmcK2VSkLk5fANVPeNsaQTq_h-3h-P1iYBOJf8ibCXxuzlga4I2aUqm3w_hamvc8i0nvtQ3m2D9ktJZIre5ms29xY1NHUzP3OXLinjd33-CTcMXHDiqHnWOtOVzSmY3JPXWHrzg4Gb6e44BskaA7fh0DJL93PrO70_RCoVub6Z3-u5YmR3_PI7CvhB-xnFYpDAKUbzupzOX4xEt_TdJCjUEBl6MgG98doyAnEutZEGkOTXs076J9Nxtg"
              />
            </div>
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#fffdf4] mb-1 group-hover:text-hotel-gold transition-colors">
            Serenity Gym &amp; Spa
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light mb-3">
            Restorative wellness sanctuary in a high-contrast biophilic oasis.
          </p>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] border-b border-[#D4AF37]/30 pb-0.5 group-hover:border-hotel-gold">
            Discover Wellness
          </span>
        </div>

        {/* Events Spot */}
        <div className="group cursor-pointer" onClick={() => onNavigate("events")}>
          <div className="relative overflow-hidden rounded-xl aspect-square mb-4 shadow-xl bg-white/5 border border-white/5 p-1">
            <div className="w-full h-full bg-[#111] overflow-hidden rounded-lg">
              <img
                alt="Grand event ballroom prepared with yellow drapery"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-75"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyRktVkv-XQnzfsXU4OvroKzRJsYOGL5uT3a5a2tKdVIJJ6kX90QWjrCx0t2DSJjVxDtHvaZ_NiuihhRW3YmieIBqPZ02iMmNutp-RPvRh9WN8sB1JrLhDy-IUY2qgvZW7XTI1_fTHBmYEZgSKXtHHC1Lc8LbxuOLBfDjP1-UCf0LLGn9zluOgfnc6ZhZz3GYdrggijPddFc_UGgqitSvxDluQYUA0xFoMDNRDUX4FtThDOEU318G3R2K0vTgJGeksWZDG8Qu9Yg"
              />
            </div>
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#fffdf4] mb-1 group-hover:text-hotel-gold transition-colors">
            Grand Events
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light mb-3">
            From premier executive summits to sophisticated cultural galas.
          </p>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] border-b border-[#D4AF37]/30 pb-0.5 group-hover:border-hotel-gold font-sans font-semibold">
            Plan Events
          </span>
        </div>
      </section>
    </div>
  );
}
