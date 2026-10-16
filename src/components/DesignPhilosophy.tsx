import React, { useState } from 'react';
import { ArrowRight, Leaf, Shield, SunMedium } from 'lucide-react';

export const DesignPhilosophy: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      kicker: 'BELGRADE ARBOR DESIGN',
      title: 'The visual identity is defined by an elegant facade inspired by the tree canopy.',
      paragraph:
        'A symbol of natural growth, balance, and longevity. The multi-tiered organic fins filter direct solar gain while welcoming filtered daylight and panoramic skyline views across the Sava and Danube basins.',
      highlight: 'Organic Biomimicry • Natural Solar Shading',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    },
    {
      number: '02',
      kicker: 'AN URBAN SANCTUARY',
      title: "Not merely an addition to the skyline, but a curated ecosystem evolving with the city.",
      paragraph:
        'Belgrade Arbor seamlessly reconciles urban vibrancy with secluded private tranquility. Lush courtyard gardens, private loggias, and pedestrian avenues foster well-being in the center of New Belgrade.',
      highlight: 'Acoustic Triple Glazing • Air Purification Gardens',
      icon: SunMedium,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    },
    {
      number: '03',
      kicker: 'ROOTS & LONGEVITY',
      title: 'Crafted not merely for the present, but as a legacy that matures gracefully with time.',
      paragraph:
        'Bureau Cube Partners and Perose Property Group selected timeless materials: honed travertine stone, artisanal bronzed trims, and sustainably harvested European oak to ensure perpetual prestige.',
      highlight: 'Enduring Craftsmanship • LEED Gold Standards',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section id="architecture" className="relative w-full py-28 px-4 sm:px-8 bg-gradient-to-b from-[#121811] via-[#162114] to-[#121811] overflow-hidden">
      {/* Decorative SVG Canopy Background Contour */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[600px] pointer-events-none opacity-5">
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 300C300 150 600 450 900 300C1200 150 1440 300 1440 300V600H0V300Z" fill="#C8A97E" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Step Progress Line & Phase Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-10 border-b border-[#C8A97E]/20 mb-16 gap-6">
          <div className="flex items-center gap-4">
            <span className="font-serif text-3xl sm:text-4xl text-[#C8A97E] font-light">
              {current.number}
            </span>
            <div className="w-16 h-px bg-[#C8A97E]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#A68553]">
              Chapter {activeStep + 1} of 3
            </span>
          </div>

          <div className="flex items-center gap-2">
            {steps.map((st, idx) => (
              <button
                key={st.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#C8A97E] text-[#121811] font-bold shadow-md'
                    : 'bg-[#1F2B1D] text-[#E8DFD1] hover:bg-[#2A3A29] border border-white/5'
                }`}
              >
                <span>Phase {st.number}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Chapter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C8A97E]">
              <CurrentIcon className="w-4 h-4 text-[#C8A97E]" />
              <span>{current.kicker}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl text-[#F5F3ED] font-light leading-[1.2]">
              {current.title}
            </h3>

            <p className="text-base sm:text-lg text-[#D5C7B2] font-light leading-relaxed max-w-xl">
              {current.paragraph}
            </p>

            <div className="pt-4 flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#202E1E] border border-[#C8A97E]/30 text-xs text-[#C8A97E] tracking-wider font-medium">
                {current.highlight}
              </span>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#E8DFD1] hover:text-[#C8A97E] transition-colors group cursor-pointer"
              >
                <span>Next Design Principle</span>
                <div className="w-8 h-8 rounded-full border border-[#C8A97E]/40 flex items-center justify-center group-hover:border-[#C8A97E] group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A97E]" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Morphing Mask Geometric Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto aspect-[4/5] max-w-md w-full svg-masked-frame">
              {/* Decorative border frame */}
              <div className="absolute inset-0 border border-[#C8A97E]/30 rounded-[2.5rem] -rotate-3 transition-transform duration-700" />
              
              {/* Image with organic rounded geometry */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#C8A97E]/40 bg-[#1F2B1D]">
                <img
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-opacity duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121811]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#C8A97E] block mb-1">
                    Architectural Render
                  </span>
                  <p className="font-serif text-lg text-[#F5F3ED]">{current.highlight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
