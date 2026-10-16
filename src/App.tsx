import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Building3DExplorer } from './components/Building3DExplorer';
import { DesignPhilosophy } from './components/DesignPhilosophy';
import { ResidencesSection } from './components/ResidencesSection';
import { LocationAround } from './components/LocationAround';
import { BusinessRetail } from './components/BusinessRetail';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import type { ResidenceUnit } from './types';

export function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryUnitCode, setInquiryUnitCode] = useState<string>('');

  const handleOpenInquire = (unitCode?: string) => {
    setInquiryUnitCode(unitCode || '');
    setIsInquiryModalOpen(true);
  };

  const handleScrollTo3D = () => {
    const el = document.getElementById('3d-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToResidences = () => {
    const el = document.getElementById('residences');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectUnit = (unit: ResidenceUnit) => {
    handleOpenInquire(`Unit ${unit.unitCode} (${unit.type}, Level ${unit.floor})`);
  };

  return (
    <div className="relative min-h-screen bg-[#121811] text-[#E8DFD1] selection:bg-[#C8A97E]/30 selection:text-white">
      {/* Floating Pill Header */}
      <Navbar
        onOpenInquire={(code) => handleOpenInquire(code)}
        onOpen3D={handleScrollTo3D}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExplore3D={handleScrollTo3D}
          onExploreResidences={handleScrollToResidences}
        />

        {/* 3D WebGL Building & Floor Explorer */}
        <Building3DExplorer
          onOpenInquire={handleOpenInquire}
          onSelectUnitFromFloor={(_floor) => {
            handleScrollToResidences();
          }}
        />

        {/* Architecture & Canopy Philosophy */}
        <DesignPhilosophy />

        {/* Residences & Floor Plan Blueprint Explorer */}
        <ResidencesSection
          onSelectUnit={handleSelectUnit}
          onOpenInquireWithUnit={(code) => handleOpenInquire(`Unit ${code}`)}
        />

        {/* Location & Neighborhood Connectivity */}
        <LocationAround />

        {/* Commercial Suites & Retail */}
        <BusinessRetail
          onOpenInquireWithUnit={(code) => handleOpenInquire(`Commercial ${code}`)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Consultation & Booking Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialUnitCode={inquiryUnitCode}
      />
    </div>
  );
}

export default App;
