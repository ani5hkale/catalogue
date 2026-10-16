import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Building2, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenInquire: (unitCode?: string) => void;
  onOpen3D: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquire, onOpen3D }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<'ENG' | 'SRB'>('ENG');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '3D Experience', href: '#3d-explorer', action: onOpen3D, icon: Compass },
    { label: 'Residences', href: '#residences', icon: Building2 },
    { label: 'Business & Retail', href: '#business', icon: ShieldCheck },
    { label: 'Location & Surroundings', href: '#location', icon: MapPin },
    { label: 'Architecture & Canopy', href: '#architecture', icon: Building2 },
    { label: 'Contact', href: '#contact', action: () => onOpenInquire(), icon: Phone },
  ];

  const handleLinkClick = (action?: () => void, href?: string) => {
    setIsMenuOpen(false);
    if (action) {
      action();
    } else if (href) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Capsule Bar */}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl transition-all duration-500 ${
          isScrolled ? 'top-3 scale-[0.98]' : 'top-6'
        }`}
      >
        <div className="relative rounded-[2rem] bg-[#172016]/85 backdrop-blur-xl border border-[#C8A97E]/20 shadow-2xl px-4 py-2.5 sm:px-6 sm:py-3 text-[#E8DFD1]">
          <div className="flex items-center justify-between">
            {/* Hamburger / Menu toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group flex items-center gap-3 py-1.5 px-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer text-xs uppercase tracking-[0.2em] font-medium"
                aria-label="Toggle Navigation"
              >
                <div className="w-5 flex flex-col justify-between h-3 relative">
                  <span
                    className={`block h-[1.5px] w-full bg-[#C8A97E] transition-all duration-300 origin-center ${
                      isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full bg-[#C8A97E] transition-all duration-300 origin-center ${
                      isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                    }`}
                  />
                </div>
                <span className="hidden sm:inline-block group-hover:text-white transition-colors">
                  {isMenuOpen ? 'Close' : 'Menu'}
                </span>
              </button>

              <button
                type="button"
                onClick={onOpen3D}
                className="hidden md:flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-widest text-[#C8A97E] hover:text-white transition-colors border border-[#C8A97E]/30 rounded-full"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>3D Tour</span>
              </button>
            </div>

            {/* Central Brand Identity / Monogram */}
            <a
              href="#"
              className="flex items-center gap-2 group text-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-7 h-7 rounded-full border border-[#C8A97E]/40 flex items-center justify-center text-[#C8A97E] font-serif font-bold text-sm group-hover:scale-105 group-hover:border-[#C8A97E] transition-all">
                A
              </div>
              <span className="font-serif text-base sm:text-lg tracking-[0.18em] uppercase text-[#F5F3ED] font-light">
                Belgrade <span className="font-normal text-[#C8A97E]">Arbor</span>
              </span>
            </a>

            {/* Language & Inquire CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center text-[11px] font-medium tracking-wider text-[#A68553] border border-[#C8A97E]/20 rounded-full p-0.5">
                <button
                  type="button"
                  onClick={() => setLang('ENG')}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    lang === 'ENG' ? 'bg-[#2A3A29] text-[#F5F3ED]' : 'hover:text-white'
                  }`}
                >
                  ENG
                </button>
                <button
                  type="button"
                  onClick={() => setLang('SRB')}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    lang === 'SRB' ? 'bg-[#2A3A29] text-[#F5F3ED]' : 'hover:text-white'
                  }`}
                >
                  SRB
                </button>
              </div>

              {/* Rolling Inquire Button */}
              <button
                type="button"
                onClick={() => onOpenInquire()}
                className="btn-roll cursor-pointer rounded-full border border-[#C8A97E]/60 bg-[#243322]/80 hover:bg-[#C8A97E] hover:text-[#121811] text-[#E8DFD1] px-4 py-2 sm:px-5 sm:py-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 shadow-md group"
              >
                <span className="roll-text-1">
                  Inquire <ArrowRight className="w-3.5 h-3.5 text-[#C8A97E] group-hover:text-[#121811] transition-colors" />
                </span>
                <span className="roll-text-2">
                  Inquire <ArrowRight className="w-3.5 h-3.5 text-[#C8A97E] group-hover:text-[#121811] transition-colors" />
                </span>
              </button>
            </div>
          </div>

          {/* Expandable Navigation Drawer */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? 'max-h-[500px] opacity-100 pt-6 pb-4 border-t border-white/10 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-3 px-2">
              {navLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleLinkClick(item.action, item.href)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#243322] flex items-center justify-center text-[#C8A97E] group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-serif text-lg text-[#F5F3ED] group-hover:text-[#C8A97E] transition-colors block">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-[#A68553] uppercase tracking-wider block">
                          Explore section
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C8A97E] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-[#A68553] px-2 gap-2">
              <span>Bulevar heroja sa Košara, New Belgrade</span>
              <span>Direct Sales: +381 (0) 11 430 0000</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
