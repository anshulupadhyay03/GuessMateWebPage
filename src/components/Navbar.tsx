import React, { useState } from 'react';
import { Shield, Menu, X, Smartphone } from 'lucide-react';
import { GuessMateIcon } from './GuessMateIcon';

interface NavbarProps {
  onOpenBeta: () => void;
  onOpenPreRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPreRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0B1020]/90 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <GuessMateIcon size="md" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans">
                  Guess<span className="text-blue-500">Mate</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700/80 rounded-full">
                  Competitive Strategy
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">Real-Time Deduction Warfare</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('mobile-showcase')}
              className="hover:text-white transition-colors"
            >
              Mobile App
            </button>
            <button
              onClick={() => scrollToSection('ai-review')}
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Fair Play</span>
            </button>
            <button
              onClick={() => scrollToSection('categories')}
              className="hover:text-white transition-colors"
            >
              Puzzle Library
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-white transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenPreRegister}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all flex items-center space-x-2 active:scale-[0.98]"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-100" />
              <span>Pre-Register</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onOpenPreRegister}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 shadow-sm flex items-center space-x-1"
            >
              <Smartphone className="w-3 h-3 text-white" />
              <span>Pre-Register</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1020] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white text-sm font-medium"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white text-sm font-medium"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('mobile-showcase')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white text-sm font-medium"
          >
            Mobile Screens
          </button>
          <button
            onClick={() => scrollToSection('ai-review')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white text-sm font-medium flex items-center space-x-2"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span>AI Fair Play Review</span>
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white text-sm font-medium"
          >
            Categories & Puzzle Library
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white text-sm font-medium"
          >
            FAQ
          </button>
          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreRegister();
              }}
              className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 flex items-center justify-center space-x-2 shadow-sm"
            >
              <Smartphone className="w-4 h-4 text-blue-100" />
              <span>Pre-Register for App Stores</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
