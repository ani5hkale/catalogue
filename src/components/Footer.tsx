import React from 'react';
import { ArrowUp, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#0D120C] border-t border-[#C8A97E]/15 text-[#E8DFD1] py-16 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Footer Ribbon */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-white/10 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#C8A97E]/40 flex items-center justify-center text-[#C8A97E] font-serif font-bold text-lg">
              A
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl tracking-[0.15em] uppercase text-[#F5F3ED] block">
                Belgrade <span className="text-[#C8A97E]">Arbor</span>
              </span>
              <span className="text-[11px] text-[#A68553] uppercase tracking-widest block">
                Residential &amp; Business Complex
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182317] border border-[#C8A97E]/20 text-xs text-[#C8A97E]">
              <Award className="w-4 h-4 text-[#C8A97E]" />
              <span>Awwwards Honorable Mention</span>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-3 rounded-full bg-[#1A2519] hover:bg-[#C8A97E] hover:text-[#121811] text-[#E8DFD1] transition-all cursor-pointer border border-white/5"
              title="Return to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Footer Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs text-[#A68553]">
          <div>
            <h5 className="font-serif text-base text-[#F5F3ED] uppercase tracking-wider mb-3">
              Location
            </h5>
            <p className="leading-relaxed font-light">
              Bulevar heroja sa Košara<br />
              Block 65, New Belgrade<br />
              Republic of Serbia
            </p>
          </div>

          <div>
            <h5 className="font-serif text-base text-[#F5F3ED] uppercase tracking-wider mb-3">
              Sales Office
            </h5>
            <p className="leading-relaxed font-light">
              Monday – Friday: 09:00 – 19:00<br />
              Saturday: 10:00 – 15:00<br />
              +381 (0) 11 430 0000<br />
              sales@belgradearbor.rs
            </p>
          </div>

          <div>
            <h5 className="font-serif text-base text-[#F5F3ED] uppercase tracking-wider mb-3">
              Architectural Credits
            </h5>
            <p className="leading-relaxed font-light">
              Investor: <strong className="text-[#E8DFD1]">Perose Property Group</strong><br />
              Architecture: <strong className="text-[#E8DFD1]">Bureau Cube Partners</strong><br />
              Digital Experience: <strong className="text-[#E8DFD1]">Square43 Studio</strong>
            </p>
          </div>

          <div>
            <h5 className="font-serif text-base text-[#F5F3ED] uppercase tracking-wider mb-3">
              Navigation
            </h5>
            <ul className="space-y-1.5 font-light">
              <li><a href="#3d-explorer" className="hover:text-[#C8A97E] transition-colors">3D Building Tour</a></li>
              <li><a href="#residences" className="hover:text-[#C8A97E] transition-colors">Residential Apartments</a></li>
              <li><a href="#business" className="hover:text-[#C8A97E] transition-colors">Offices &amp; Retail</a></li>
              <li><a href="#location" className="hover:text-[#C8A97E] transition-colors">Neighborhood Connectivity</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A68553] font-light gap-4">
          <p>
            © {new Date().getFullYear()} Belgrade Arbor. All rights reserved. Visualizations and 3D architectural renderings are for illustrative purposes.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#C8A97E] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#C8A97E] cursor-pointer">Terms of Living</span>
            <span>•</span>
            <span className="hover:text-[#C8A97E] cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
