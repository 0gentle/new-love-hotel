import React, { useState } from "react";
import { Sparkles, Calendar, Landmark, BookOpen, Flame, Menu, X, Landmark as BuildingIcon } from "lucide-react";
import HomeSection from "./components/HomeSection";
import SuitesSection from "./components/SuitesSection";
import WellnessSection from "./components/WellnessSection";
import EventsSection from "./components/EventsSection";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navigationTabs = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "suites", label: "Suites & Booking", icon: BookOpen },
    { id: "wellness", label: "Gym & Wellness", icon: Calendar },
    { id: "events", label: "Events", icon: Landmark }
  ];

  const handleTabNavigation = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smoothly scroll to top on tab changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#080808] text-white font-sans antialiased text-left relative overflow-hidden">
      
      {/* Immersive Atmospheric Background Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#1a1a2e ] rounded-full blur-[120px] opacity-40 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] bg-[#2d1b0d] rounded-full blur-[150px] opacity-35 pointer-events-none z-0"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#22132d] rounded-full blur-[140px] opacity-20 pointer-events-none z-0"></div>

      {/* Premium Luxury Global Header */}
      <header className="sticky top-0 z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo Group */}
          <div 
            onClick={() => handleTabNavigation("home")}
            className="flex items-center gap-3 cursor-pointer group text-left relative z-10"
          >
            <div className="w-8 h-8 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BuildingIcon className="-rotate-45 w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="ml-1">
              <span className="block font-serif text-lg leading-tight font-bold tracking-[0.2em] text-[#fffdf4] uppercase group-hover:text-hotel-gold transition-colors">
                New Love
              </span>
              <span className="block text-[8px] text-gray-400 tracking-[0.3em] font-medium uppercase mt-0.5">
                International Hotel
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 relative z-10">
            {navigationTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  id={`nav-link-${tab.id}`}
                  key={tab.id}
                  onClick={() => handleTabNavigation(tab.id)}
                  className={`px-4.5 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? "bg-[#D4AF37]/15 text-[#D4AF37] border-b border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]" 
                      : "text-gray-400 hover:text-[#D4AF37] hover:bg-white/5"
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-[#D4AF37]" : "text-gray-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile responsive drawer toggler */}
          <div className="md:hidden relative z-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-hotel-gold transition-colors p-2"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-t border-white/5 absolute w-full left-0 p-5 space-y-2 shadow-2xl animate-fade-in text-left z-20">
            {navigationTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  id={`nav-mobile-link-${tab.id}`}
                  key={tab.id}
                  onClick={() => handleTabNavigation(tab.id)}
                  className={`w-full px-4 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-3 cursor-pointer ${
                    isActive 
                      ? "bg-[#D4AF37] text-black font-bold" 
                      : "bg-[#161616] text-[#fffdf4] hover:bg-[#1f1f1f]"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Adaptive Sections Shell */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 pt-10">
        {activeTab === "home" && <HomeSection onNavigate={handleTabNavigation} />}
        {activeTab === "suites" && <SuitesSection />}
        {activeTab === "wellness" && <WellnessSection />}
        {activeTab === "events" && <EventsSection />}
      </main>

      {/* Exquisite Pan-African Heritage Footer */}
      <footer className="bg-hotel-charcoal text-gray-400 border-t border-white/10 mt-16 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 text-left">
          
          {/* Column 1: Brand details and brief intro */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-lg font-bold tracking-widest text-white uppercase">
              NEW LOVE INTERNATIONAL
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              We weave the majestic design values of the historic West African coast directly into modern minimalist sanctuaries. Every suite, events table, and sounded spa corner honors our local soils.
            </p>
            <div className="flex gap-4 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D061]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            </div>
          </div>

          {/* Column 2: Quick navigation anchors */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
              REFINED DEPARTMENTS
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>
                <button onClick={() => handleTabNavigation("home")} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  The Oasis &amp; Gardens
                </button>
              </li>
              <li>
                <button onClick={() => handleTabNavigation("suites")} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Botanical Level Suites
                </button>
              </li>
              <li>
                <button onClick={() => handleTabNavigation("wellness")} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Serenity sound Bath Atrium
                </button>
              </li>
              <li>
                <button onClick={() => handleTabNavigation("events")} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  The Grand Sacred ballroom
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details & Location */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
              THE SANCTUARY SEAT
            </h4>
            <div className="text-xs text-gray-300 space-y-2 font-light">
              <p><strong className="text-white">Headquarters Address:</strong> 4 Royal Heritage Way, Lekki Peninsula II, Lagos, Nigeria</p>
              <p><strong className="text-white">Concierge Hot-Desk:</strong> +234 (1) 450-SWAN • support@newloveinternational.com</p>
              <p className="text-[10px] text-gray-500 pt-2 uppercase font-mono">
                * Simulated Experience for Google AI Studio Webapp Prototyping
              </p>
            </div>
          </div>

        </div>

        {/* Trademark and structural boundaries clearance */}
        <div className="max-w-7xl mx-auto px-6 border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 font-mono">
          <span>
            © {new Date().getFullYear()} New Love International Hotel Ltd. All rights reserved.
          </span>
          <span className="mt-2 sm:mt-0">
            Crafted for Modern African Luxury | Authentic Curation
          </span>
        </div>
      </footer>

    </div>
  );
}
