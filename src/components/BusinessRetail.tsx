import React from 'react';
import { COMMERCIAL_SPACES } from '../data/mockData';
import { Briefcase, Store, Check, ArrowRight } from 'lucide-react';

interface BusinessRetailProps {
  onOpenInquireWithUnit: (unitCode: string) => void;
}

export const BusinessRetail: React.FC<BusinessRetailProps> = ({ onOpenInquireWithUnit }) => {
  return (
    <section id="business" className="relative w-full py-28 px-4 sm:px-8 bg-[#151E14]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-[#C8A97E]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
                Prestigious Commercial Address
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F5F3ED] font-light leading-tight">
              Offices &amp; Retail Pavilions
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#D5C7B2] font-light leading-relaxed">
              Designed for enterprises, flagship boutiques, and culinary visionaries who recognize their physical address as a lasting statement of reputation, aesthetic discernment, and prestige.
            </p>
          </div>
        </div>

        {/* Commercial Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMMERCIAL_SPACES.map((space) => (
            <div
              key={space.id}
              className="rounded-3xl bg-[#1A2519] border border-[#C8A97E]/20 p-8 flex flex-col justify-between hover:border-[#C8A97E]/60 transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#253523] flex items-center justify-center text-[#C8A97E]">
                    {space.type.includes('Retail') ? (
                      <Store className="w-5 h-5" />
                    ) : (
                      <Briefcase className="w-5 h-5" />
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#283826] text-[#C8A97E] border border-[#C8A97E]/20">
                    {space.status}
                  </span>
                </div>

                <span className="text-xs uppercase text-[#A68553] tracking-widest block mb-1">
                  {space.level}
                </span>
                <h3 className="font-serif text-2xl text-[#F5F3ED] mb-3">{space.type}</h3>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/5 mb-6 text-left">
                  <div>
                    <span className="text-[10px] uppercase text-[#A68553] block">Gross Area</span>
                    <span className="text-base font-semibold text-[#E8DFD1]">{space.areaSqM} m²</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#A68553] block">Ceiling Height</span>
                    <span className="text-base font-semibold text-[#E8DFD1]">{space.ceilingHeightM}m Clearance</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-8">
                  {space.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#D5C7B2] font-light">
                      <Check className="w-3.5 h-3.5 text-[#C8A97E] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onOpenInquireWithUnit(space.unitCode)}
                className="w-full btn-roll py-3 rounded-full bg-[#263724] hover:bg-[#C8A97E] hover:text-[#121811] text-[#E8DFD1] text-xs uppercase tracking-widest font-semibold transition-all group"
              >
                <span className="roll-text-1">
                  Inquire For Commercial Space <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
                <span className="roll-text-2">
                  Inquire For Commercial Space <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
