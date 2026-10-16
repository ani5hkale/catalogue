import React, { useState } from 'react';
import { RESIDENCES } from '../data/mockData';
import type { ResidenceUnit } from '../types';
import { Compass, Maximize2, Check, ArrowRight } from 'lucide-react';

interface ResidencesSectionProps {
  onSelectUnit: (unit: ResidenceUnit) => void;
  onOpenInquireWithUnit: (unitCode: string) => void;
}

export const ResidencesSection: React.FC<ResidencesSectionProps> = ({
  onOpenInquireWithUnit,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedModalUnit, setSelectedModalUnit] = useState<ResidenceUnit | null>(null);

  const filters = ['All', '1-Bedroom', '2-Bedroom', '3-Bedroom', 'Studio', 'Penthouse'];

  const filteredUnits =
    activeFilter === 'All'
      ? RESIDENCES
      : RESIDENCES.filter((u) => u.type === activeFilter);

  return (
    <section id="residences" className="relative w-full py-28 px-4 sm:px-8 bg-[#131A12]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-[#C8A97E]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
                Exclusive Residential Collection
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F5F3ED] font-light">
              Crafted for Living
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#D5C7B2] max-w-lg font-light leading-relaxed">
            Every apartment at Belgrade Arbor balances generous volume, natural illumination, tactile craftsmanship, and expansive canopy loggias tailored for lifelong comfort.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filters.map((fl) => (
            <button
              key={fl}
              type="button"
              onClick={() => setActiveFilter(fl)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === fl
                  ? 'bg-[#C8A97E] text-[#121811] shadow-lg font-bold'
                  : 'bg-[#1C261B] text-[#E8DFD1] hover:bg-[#253324] border border-white/5'
              }`}
            >
              {fl}
            </button>
          ))}
        </div>

        {/* Residence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="rounded-3xl bg-[#182317] border border-[#C8A97E]/20 overflow-hidden shadow-xl hover:border-[#C8A97E]/60 transition-all duration-500 flex flex-col justify-between group"
            >
              {/* Card Image with Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1D2B1C]">
                <img
                  src={
                    unit.type === 'Penthouse'
                      ? 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
                      : unit.type === '3-Bedroom'
                      ? 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
                      : unit.type === '2-Bedroom'
                      ? 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
                      : 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={unit.unitCode}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-black/60 backdrop-blur-md text-[#C8A97E] border border-[#C8A97E]/30">
                    {unit.type}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider backdrop-blur-md ${
                      unit.status === 'Available'
                        ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-900/70 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {unit.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedModalUnit(unit)}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-[#E8DFD1] hover:text-[#C8A97E] transition-colors"
                  title="View Floor Plan Schematic"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl text-[#F5F3ED] font-light">
                      Unit {unit.unitCode}
                    </h3>
                    <span className="text-xs uppercase text-[#A68553] tracking-widest">
                      Level {unit.floor}
                    </span>
                  </div>

                  <p className="text-xs text-[#A68553] leading-relaxed line-clamp-2 mb-4 font-light">
                    {unit.description}
                  </p>

                  {/* Spec Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-4 text-center">
                    <div>
                      <span className="text-[10px] uppercase text-[#A68553] block">Interior</span>
                      <span className="text-sm font-semibold text-[#E8DFD1]">{unit.areaSqM} m²</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#A68553] block">Balcony</span>
                      <span className="text-sm font-semibold text-[#E8DFD1]">{unit.balconySqM} m²</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#A68553] block">Rooms</span>
                      <span className="text-sm font-semibold text-[#E8DFD1]">
                        {unit.bedrooms} Bed • {unit.bathrooms} Bath
                      </span>
                    </div>
                  </div>

                  {/* Orientation */}
                  <div className="flex items-center gap-1.5 text-xs text-[#C8A97E] mb-6">
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{unit.orientation}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] uppercase text-[#A68553] block">Starting from</span>
                    <span className="font-serif text-lg font-medium text-[#F5F3ED]">
                      {unit.priceStartingFrom}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenInquireWithUnit(unit.unitCode)}
                    className="btn-roll px-4 py-2 rounded-full bg-[#263524] hover:bg-[#C8A97E] hover:text-[#121811] text-[#E8DFD1] text-xs uppercase tracking-wider font-semibold transition-all group"
                  >
                    <span className="roll-text-1">
                      Inquire <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                    <span className="roll-text-2">
                      Inquire <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floor Plan Schematic Modal */}
      {selectedModalUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#172216] border border-[#C8A97E]/30 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedModalUnit(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2A3A29] text-[#C8A97E]">
                {selectedModalUnit.type}
              </span>
              <span className="text-xs text-[#A68553] uppercase tracking-widest">
                Level {selectedModalUnit.floor}
              </span>
            </div>

            <h3 className="font-serif text-3xl text-[#F5F3ED] font-light mb-4">
              Architectural Schematic: Unit {selectedModalUnit.unitCode}
            </h3>

            {/* Stylized Floor Plan Blueprint Rendering */}
            <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#0F160E] border border-[#C8A97E]/20 p-6 flex items-center justify-center mb-6 overflow-hidden">
              <svg viewBox="0 0 600 380" className="w-full h-full text-[#C8A97E]/80">
                {/* Perimeter Wall */}
                <rect x="30" y="30" width="540" height="320" fill="none" stroke="currentColor" strokeWidth="3" />
                {/* Balcony / Loggia */}
                <rect x="420" y="30" width="150" height="180" fill="rgba(200, 169, 126, 0.08)" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" />
                <text x="495" y="125" fill="#C8A97E" fontSize="13" textAnchor="middle" fontFamily="sans-serif">
                  CANOPY LOGGIA {selectedModalUnit.balconySqM}m²
                </text>
                {/* Master Bedroom */}
                <rect x="30" y="30" width="220" height="200" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="140" y="130" fill="#E8DFD1" fontSize="13" textAnchor="middle" fontFamily="sans-serif">
                  MASTER SUITE
                </text>
                {/* En-suite Bath */}
                <rect x="30" y="230" width="140" height="120" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="100" y="295" fill="#A68553" fontSize="11" textAnchor="middle" fontFamily="sans-serif">
                  BATHROOM
                </text>
                {/* Living & Dining Salon */}
                <rect x="250" y="140" width="320" height="210" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="410" y="250" fill="#E8DFD1" fontSize="14" textAnchor="middle" fontFamily="sans-serif">
                  LIVING SALON &amp; KITCHEN
                </text>
                {/* Entrance Foyer */}
                <text x="210" y="330" fill="#C8A97E" fontSize="11" textAnchor="middle" fontFamily="sans-serif">
                  ▲ ENTRANCE
                </text>
              </svg>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {selectedModalUnit.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs text-[#D5C7B2]">
                  <Check className="w-4 h-4 text-[#C8A97E] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="text-xs uppercase text-[#A68553] block">Total Gross Area</span>
                <span className="font-serif text-2xl text-[#F5F3ED]">
                  {selectedModalUnit.areaSqM + selectedModalUnit.balconySqM} m²
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const code = selectedModalUnit.unitCode;
                  setSelectedModalUnit(null);
                  onOpenInquireWithUnit(code);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C8A97E] text-[#121811] text-xs uppercase tracking-widest font-bold hover:bg-[#DFC79B] transition-all"
              >
                Request Private Consultation for {selectedModalUnit.unitCode}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
