import React from 'react';
import { Play, Shield, Users, ArrowRight, Zap, Brain, Smartphone, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenPreRegister: () => void;
  onOpenGameplayModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPreRegister, onOpenGameplayModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-[#0B1020]">
      
      {/* Subtle Background Surface Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Product Positioning & Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#131A2A] border border-slate-800 text-xs font-semibold text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-slate-200">Competitive Social Deduction Engine</span>
              <span className="text-slate-600">•</span>
              <span className="text-blue-400">iOS & Android</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.08]">
              Every Question <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-slate-200 bg-clip-text text-transparent">
                Shrinks the Matrix.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Master the art of competitive inquiry. GuessMate fuses twenty questions, decision-tree strategy, and real-time social deduction into 2–5 minute live matches evaluated by AI Fair Play.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onOpenPreRegister}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all flex items-center justify-center space-x-2.5 group active:scale-[0.98]"
              >
                <Smartphone className="w-4 h-4 text-blue-100" />
                <span>Pre-Register for App Stores</span>
                <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenGameplayModal}
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-[#131A2A] hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 text-blue-400 fill-current" />
                <span>Watch Competitive Match</span>
              </button>
            </div>

            {/* Value Proposition Pills */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="p-3 rounded-xl bg-[#131A2A]/60 border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>2–5 Mins</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Speed Strategy Duels</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131A2A]/60 border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-indigo-400 text-xs font-semibold">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Zero Luck</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Pure Strategic Logic</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131A2A]/60 border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>AI Review</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Automated Truth Check</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131A2A]/60 border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-slate-200 text-xs font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Free-Text</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Form Any Hypothesis</p>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Mobile Mockup Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Phone Frame Mockup (Clean, realistic dark hardware outline) */}
            <div className="w-full max-w-[340px] rounded-[40px] bg-slate-900 border-4 border-slate-800 p-3 shadow-2xl shadow-slate-950/80 relative">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="w-28 h-4 bg-slate-950 rounded-b-xl mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Screen Content */}
              <div className="w-full bg-[#131A2A] rounded-[30px] pt-8 pb-5 px-4 space-y-4 border border-slate-800 text-left font-sans relative overflow-hidden">
                
                {/* Match Status Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-mono font-bold text-slate-300">RANKED MATCH #2810</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    TURN 4 / 10
                  </span>
                </div>

                {/* Secret Card & Opponent Target */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#0B1020] border border-slate-800">
                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Your Entity</p>
                    <p className="text-xs font-bold text-white mt-0.5 font-mono">🐅 Bengal Tiger</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0B1020] border border-slate-800">
                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Opponent Target</p>
                    <p className="text-xs font-bold text-slate-500 mt-0.5 font-mono">🔒 [Undisclosed]</p>
                  </div>
                </div>

                {/* Deduction Probability Matrix */}
                <div className="p-3 rounded-xl bg-[#0B1020] border border-slate-800/90 space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-mono">Possibility Set Size</span>
                    <span className="font-mono text-emerald-400 font-bold">14 / 240 Entities</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-[12%]" />
                  </div>
                </div>

                {/* Strategic Dialogue History */}
                <div className="space-y-2.5 text-xs">
                  
                  {/* Question item */}
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] font-mono text-blue-400 font-semibold mb-0.5">Your Question</p>
                    <p className="text-slate-200 text-xs font-medium">"Is this entity native to rainforest biomes?"</p>
                  </div>

                  {/* Response item */}
                  <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-slate-400 font-semibold">Opponent Answer</p>
                      <p className="text-xs font-bold text-emerald-400">"YES"</p>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> AI Verified
                    </span>
                  </div>

                </div>

                {/* Question Input Field Mockup */}
                <div className="pt-1">
                  <div className="p-2.5 rounded-xl bg-[#0B1020] border border-slate-800 flex items-center justify-between text-slate-400 text-xs">
                    <span className="text-slate-500 italic">Type strategic question...</span>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-semibold">
                      Ask
                    </button>
                  </div>
                </div>

                {/* AI Fair Play Footer Bar */}
                <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center space-x-1.5">
                    <Shield className="w-3 h-3 text-blue-400" />
                    <span>Gemini AI Integrity Engine</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">100% Valid</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
