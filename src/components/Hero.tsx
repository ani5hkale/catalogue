import React, { useState, useEffect } from 'react';
import { ArrowDown, Compass, Building, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore3D: () => void;
  onExploreResidences: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore3D, onExploreResidences }) => {
  const [loadPercent, setLoadPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#121811]">
      {/* Cinematic Full-Bleed Architectural Visual Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Belgrade Arbor Architectural Rendering"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.1] transition-transform duration-1000 ease-out"
        />
        {/* Deep botanical canopy gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121811] via-[#1A2419]/60 to-[#121811]/70" />
        <div className="absolute inset-0 bg-radial-[at_bottom_right] from-[#3E562E]/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating Foliage Accent Mask */}
      <div className="absolute top-0 right-0 w-[45vw] h-full pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
        <svg viewBox="0 0 400 600" className="w-full h-full text-[#3E562E]" fill="currentColor">
          <path d="M200,0 C300,100 400,300 350,500 C300,700 100,500 50,300 C0,100 100,0 200,0 Z" />
        </svg>
      </div>

      {/* Intro Loader Curtain */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#151D14] transition-opacity duration-700">
          <div className="w-12 h-12 rounded-full border border-[#C8A97E]/30 flex items-center justify-center mb-6">
            <span className="font-serif text-[#C8A97E] text-lg font-bold">A</span>
          </div>
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-[#C8A97E] transition-all duration-100 ease-out rounded-full"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="font-mono text-xs text-[#A68553] tracking-widest">{loadPercent}%</span>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center mt-12 sm:mt-16">
        {/* Subtle Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F2B1D]/80 backdrop-blur-md border border-[#C8A97E]/30 mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A97E]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
            New Belgrade • Bulevar heroja sa Košara
          </span>
        </div>

        {/* Grand Hero Title */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.08em] uppercase text-[#F5F3ED] font-light leading-[1.05] mb-6">
          Belgrade <span className="text-[#C8A97E] italic font-normal">Arbor</span>
        </h1>

        {/* Subtitle / Philosophy */}
        <p className="font-display text-lg sm:text-2xl md:text-3xl text-[#E8DFD1]/90 max-w-3xl font-light italic leading-relaxed mb-10 text-center">
          "A living architectural ecosystem inspired by the form of a tree canopy — where organic balance, prestige, and longevity converge."
        </p>

        {/* Interactive CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-16">
          <button
            type="button"
            onClick={onExplore3D}
            className="btn-roll cursor-pointer w-full sm:w-auto px-8 py-4 rounded-full bg-[#C8A97E] text-[#121811] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#DFC79B] transition-all shadow-xl group"
          >
            <span className="roll-text-1">
              <Compass className="w-4 h-4 mr-1" /> Explore in 3D
            </span>
            <span className="roll-text-2">
              <Compass className="w-4 h-4 mr-1" /> Explore in 3D
            </span>
          </button>

          <button
            type="button"
            onClick={onExploreResidences}
            className="btn-roll cursor-pointer w-full sm:w-auto px-8 py-4 rounded-full border border-[#C8A97E]/50 bg-[#1A2419]/80 backdrop-blur-md text-[#E8DFD1] text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 hover:text-white transition-all group"
          >
            <span className="roll-text-1">
              <Building className="w-4 h-4 mr-1 text-[#C8A97E]" /> Discover Residences
            </span>
            <span className="roll-text-2">
              <Building className="w-4 h-4 mr-1 text-[#C8A97E]" /> Discover Residences
            </span>
          </button>
        </div>

        {/* Architectural Stats Grid */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#C8A97E]/20 text-left">
          <div className="p-3">
            <span className="font-serif text-2xl sm:text-3xl text-[#C8A97E] font-light block">208</span>
            <span className="text-[11px] uppercase tracking-wider text-[#A68553] block">Luxury Residences</span>
          </div>
          <div className="p-3">
            <span className="font-serif text-2xl sm:text-3xl text-[#C8A97E] font-light block">31</span>
            <span className="text-[11px] uppercase tracking-wider text-[#A68553] block">Office Suites</span>
          </div>
          <div className="p-3">
            <span className="font-serif text-2xl sm:text-3xl text-[#C8A97E] font-light block">18</span>
            <span className="text-[11px] uppercase tracking-wider text-[#A68553] block">Retail Colonnades</span>
          </div>
          <div className="p-3">
            <span className="font-serif text-2xl sm:text-3xl text-[#C8A97E] font-light block">360°</span>
            <span className="text-[11px] uppercase tracking-wider text-[#A68553] block">Canopy Facade</span>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#A68553] opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-[0.25em]">Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C8A97E]" />
      </div>
    </section>
  );
};
