import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhilosophyGrid } from './components/PhilosophyGrid';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesGrid } from './components/FeaturesGrid';
import { MobileShowcase } from './components/MobileShowcase';
import { AiFairPlaySection } from './components/AiFairPlaySection';
import { CategoryLibraryExplorer } from './components/CategoryLibraryExplorer';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

import { InteractiveBetaModal } from './components/InteractiveBetaModal';
import { GameplayModal } from './components/GameplayModal';
import { PreRegisterModal } from './components/PreRegisterModal';

export default function App() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [quickRoomCode, setQuickRoomCode] = useState<string | undefined>(undefined);
  
  const [isGameplayModalOpen, setIsGameplayModalOpen] = useState(false);
  const [isPreRegisterModalOpen, setIsPreRegisterModalOpen] = useState(false);

  const handleOpenBeta = (roomCode?: string) => {
    setQuickRoomCode(roomCode);
    setIsBetaModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased">
      
      {/* Navigation Header */}
      <Navbar
        onOpenBeta={() => handleOpenBeta()}
        onOpenPreRegister={() => setIsPreRegisterModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenPreRegister={() => setIsPreRegisterModalOpen(true)}
          onOpenGameplayModal={() => setIsGameplayModalOpen(true)}
        />
        <PhilosophyGrid />
        <HowItWorks />
        <FeaturesGrid />
        <MobileShowcase />
        <AiFairPlaySection />
        <CategoryLibraryExplorer />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBeta={() => handleOpenBeta()}
        onOpenPreRegister={() => setIsPreRegisterModalOpen(true)}
      />

      {/* Interactive Modals */}
      <InteractiveBetaModal
        isOpen={isBetaModalOpen}
        onClose={() => setIsBetaModalOpen(false)}
        initialRoomCode={quickRoomCode}
      />

      <GameplayModal
        isOpen={isGameplayModalOpen}
        onClose={() => setIsGameplayModalOpen(false)}
        onOpenBeta={() => handleOpenBeta()}
      />

      <PreRegisterModal
        isOpen={isPreRegisterModalOpen}
        onClose={() => setIsPreRegisterModalOpen(false)}
      />

    </div>
  );
}
