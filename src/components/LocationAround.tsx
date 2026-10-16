import React, { useState } from 'react';
import { NEARBY_LANDMARKS } from '../data/mockData';
import type { NearbyLandmark } from '../types';
import { Car, Footprints, MapPin } from 'lucide-react';

export const LocationAround: React.FC = () => {
  const [activeLandmark, setActiveLandmark] = useState<NearbyLandmark>(NEARBY_LANDMARKS[0]);

  return (
    <section id="location" className="relative w-full py-28 px-4 sm:px-8 bg-[#111710] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#3E562E]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-px bg-[#C8A97E]" />
            <p className="text-xs uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
              Prime Connectivity • New Belgrade
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F5F3ED] font-light mb-4">
            What's Around
          </h2>
          <p className="text-sm sm:text-base text-[#D5C7B2] max-w-xl font-light leading-relaxed">
            Situated on Bulevar heroja sa Košara, Belgrade Arbor anchors New Belgrade’s vibrant center, placing transit, business, elite education, and gastronomy moments away.
          </p>
        </div>

        {/* Two-Column Interactive Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Landmark List */}
          <div className="lg:col-span-6 space-y-2">
            {NEARBY_LANDMARKS.map((landmark) => {
              const isSelected = activeLandmark.id === landmark.id;
              return (
                <div
                  key={landmark.id}
                  onClick={() => setActiveLandmark(landmark)}
                  onMouseEnter={() => setActiveLandmark(landmark)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#1C261A] border-[#C8A97E]/50 shadow-lg translate-x-2'
                      : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#A68553] font-medium block">
                        {landmark.category}
                      </span>
                      <h4
                        className={`font-serif text-xl sm:text-2xl transition-colors ${
                          isSelected ? 'text-[#C8A97E]' : 'text-[#E8DFD1]'
                        }`}
                      >
                        {landmark.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {landmark.walkTimeMin && (
                        <div className="flex items-center gap-1 text-[#E8DFD1] bg-[#253223] px-2.5 py-1 rounded-full border border-white/5">
                          <Footprints className="w-3.5 h-3.5 text-[#C8A97E]" />
                          <span>{landmark.walkTimeMin} min</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-[#E8DFD1] bg-[#253223] px-2.5 py-1 rounded-full border border-white/5">
                        <Car className="w-3.5 h-3.5 text-[#C8A97E]" />
                        <span>{landmark.driveTimeMin} min</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-white/5 animate-fade-in">
                      <p className="text-xs text-[#D5C7B2] font-light leading-relaxed">
                        {landmark.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Preview with Feathered Vignette Mask */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/11] w-full rounded-3xl overflow-hidden border border-[#C8A97E]/30 shadow-2xl bg-[#162114]">
              <img
                key={activeLandmark.id}
                src={activeLandmark.imageUrl}
                alt={activeLandmark.name}
                className="w-full h-full object-cover filter brightness-90 contrast-[1.05] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111710] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C8A97E] text-xs mb-2 border border-[#C8A97E]/30">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeLandmark.highlight}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F3ED]">
                  {activeLandmark.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
