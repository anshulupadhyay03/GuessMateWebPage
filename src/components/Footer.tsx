import React from 'react';
import { ArrowRight, Github, Twitter, MessageSquare, Smartphone } from 'lucide-react';
import { GuessMateIcon } from './GuessMateIcon';

interface FooterProps {
  onOpenBeta: () => void;
  onOpenPreRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPreRegister }) => {
  return (
    <footer className="bg-[#0B1020] text-white border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Final Banner CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#131A2A] border border-slate-800 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B1020] border border-slate-800 text-xs font-semibold text-blue-400">
            <span>Competitive Social Deduction</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Ready to Master Competitive Deduction?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Test your strategic reasoning in 2–5 minute live matches powered by decision-tree strategy and automated AI Fair Play verification.
          </p>

          <div className="flex justify-center pt-2">
            <button
              onClick={onOpenPreRegister}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              <Smartphone className="w-4 h-4 text-blue-100" />
              <span>Pre-Register for iOS & Android</span>
              <ArrowRight className="w-4 h-4 text-blue-100" />
            </button>
          </div>
        </div>

        {/* Footer Navigation & Brand Row */}
        <div className="mt-20 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs text-slate-400">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <GuessMateIcon size="sm" />
              <span className="text-lg font-bold text-white font-sans">
                Guess<span className="text-blue-500">Mate</span>
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-semibold bg-[#131A2A] text-slate-300 border border-slate-700 rounded">
                v1.0
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              A real-time competitive social deduction game where strategic questioning and decision-tree logic determine victory.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider font-mono">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-white">How Matches Work</a></li>
              <li><a href="#features" className="hover:text-white">Product Capabilities</a></li>
              <li><a href="#categories" className="hover:text-white">Dataset Library</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider font-mono">Verification & Trust</h4>
            <ul className="space-y-2">
              <li><a href="#ai-review" className="hover:text-white">AI Fair Play Audit</a></li>
              <li><a href="#mobile-showcase" className="hover:text-white">Mobile Interface Specs</a></li>
              <li><a href="#faq" className="hover:text-white">Rules & Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider font-mono">Community</h4>
            <div className="flex items-center space-x-3">
              <a href="#" className="p-2 rounded-lg bg-[#131A2A] border border-slate-800 text-slate-400 hover:text-white">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#131A2A] border border-slate-800 text-slate-400 hover:text-white">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#131A2A] border border-slate-800 text-slate-400 hover:text-white">
                <Github className="w-4 h-4" />
              </a>
            </div>
            <p className="mt-4 text-[11px] text-slate-500 font-mono">
              © {new Date().getFullYear()} GuessMate. Skill-based strategy gaming.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};
