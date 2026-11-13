import React, { useState, useEffect } from 'react';
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
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsConditionsPage } from './components/TermsConditionsPage';

import { InteractiveBetaModal } from './components/InteractiveBetaModal';
import { GameplayModal } from './components/GameplayModal';
import { PreRegisterModal } from './components/PreRegisterModal';

type AppPage = 'home' | 'privacy' | 'terms';

function getPageFromLocation(): AppPage {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  if (path === '/privacy-policy' || path === '/privacy' || window.location.hash === '#privacy-policy') {
    return 'privacy';
  }
  if (
    path === '/terms-and-conditions' ||
    path === '/terms-of-conditions' ||
    path === '/terms' ||
    path === '/terms-of-service' ||
    window.location.hash === '#terms-and-conditions'
  ) {
    return 'terms';
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(getPageFromLocation);
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [quickRoomCode, setQuickRoomCode] = useState<string | undefined>(undefined);
  
  const [isGameplayModalOpen, setIsGameplayModalOpen] = useState(false);
  const [isPreRegisterModalOpen, setIsPreRegisterModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: AppPage, sectionId?: string) => {
    const targetPath =
      page === 'privacy'
        ? '/privacy-policy'
        : page === 'terms'
          ? '/terms-and-conditions'
          : sectionId
            ? `/#${sectionId}`
            : '/';
    if (window.location.pathname + window.location.hash !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentPage(page);

    if (page === 'home') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBeta = (roomCode?: string) => {
    setQuickRoomCode(roomCode);
    setIsBetaModalOpen(true);
  };

  return (
    <div className="min-h-screen relative bg-[#001424] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased overflow-x-hidden">
      
      {/* Global Optimized WebP Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transform-gpu bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/aistudio/sm_bg_website_ad21b7af.webp')`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          imageRendering: '-webkit-optimize-contrast',
        }}
        aria-hidden="true"
      />

      {/* Subtle Readability & Atmospheric Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-[#001D31]/25 to-[#001424]/50"
        aria-hidden="true"
      />

      {/* Page Content Layers */}
      <div className="relative z-10">
        {/* Navigation Header */}
        <Navbar
          onOpenBeta={() => handleOpenBeta()}
          onOpenPreRegister={() => setIsPreRegisterModalOpen(true)}
          currentPage={currentPage}
          onNavigate={navigateTo}
        />

        {/* Main Content Sections */}
        <main>
          {currentPage === 'privacy' ? (
            <PrivacyPolicyPage onBackHome={() => navigateTo('home')} />
          ) : currentPage === 'terms' ? (
            <TermsConditionsPage onNavigatePrivacy={() => navigateTo('privacy')} />
          ) : (
            <>
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
            </>
          )}
        </main>

        {/* Footer */}
        <Footer
          onOpenBeta={() => handleOpenBeta()}
          onOpenPreRegister={() => setIsPreRegisterModalOpen(true)}
          onNavigate={navigateTo}
        />
      </div>

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
