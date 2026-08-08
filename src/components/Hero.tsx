import React from 'react';
import { Play, Shield, Users, ArrowRight, Zap, Brain, Smartphone, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenPreRegister: () => void;
  onOpenGameplayModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPreRegister, onOpenGameplayModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-[#001D31]">
      
      {/* Subtle Background Surface Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#003A5D_1px,transparent_1px),linear-gradient(to_bottom,#003A5D_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Product Positioning & Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#003A5D] border border-[#CA4D4E]/40 text-xs font-semibold text-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E8E61A]" />
              <span className="text-slate-100">Competitive Social Deduction Engine</span>
              <span className="text-slate-400">•</span>
              <span className="text-[#E8E61A]">iOS & Android</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.08]">
              Every Question <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#CA4D4E] via-[#E8E61A] to-slate-100 bg-clip-text text-transparent">
                Shrinks the Matrix.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Master the art of competitive inquiry. GuessMacha fuses twenty questions, decision-tree strategy, and real-time social deduction into 2–5 minute live matches evaluated by AI Fair Play.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onOpenPreRegister}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-white bg-[#CA4D4E] hover:bg-[#b83d3e] shadow-lg transition-all flex items-center justify-center space-x-2.5 group active:scale-[0.98]"
              >
                <Smartphone className="w-4 h-4 text-[#E8E61A]" />
                <span>Pre-Register for App Stores</span>
                <ArrowRight className="w-4 h-4 text-[#E8E61A] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenGameplayModal}
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-white bg-[#003A5D] hover:bg-[#004f7c] border border-[#CA4D4E]/40 transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 text-[#E8E61A] fill-current" />
                <span>Watch Competitive Match</span>
              </button>
            </div>

            {/* Value Proposition Pills */}
            <div className="pt-4 border-t border-[#003A5D] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="p-3 rounded-xl bg-[#003A5D]/70 border border-[#003A5D]">
                <div className="flex items-center space-x-1.5 text-[#E8E61A] text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>2–5 Mins</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">Speed Strategy Duels</p>
              </div>

              <div className="p-3 rounded-xl bg-[#003A5D]/70 border border-[#003A5D]">
                <div className="flex items-center space-x-1.5 text-[#e26162] text-xs font-semibold">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Zero Luck</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">Pure Strategic Logic</p>
              </div>

              <div className="p-3 rounded-xl bg-[#003A5D]/70 border border-[#003A5D]">
                <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>AI Review</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">Automated Truth Check</p>
              </div>

              <div className="p-3 rounded-xl bg-[#003A5D]/70 border border-[#003A5D]">
                <div className="flex items-center space-x-1.5 text-slate-100 text-xs font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Free-Text</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">Form Any Hypothesis</p>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Mobile Mockup Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Phone Frame Mockup */}
            <div className="w-full max-w-[340px] rounded-[40px] bg-[#00253e] border-4 border-[#003A5D] p-3 shadow-2xl relative">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="w-28 h-4 bg-[#001D31] rounded-b-xl mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-[#003A5D] rounded-full" />
              </div>

              {/* Screen Content */}
              <div className="w-full bg-[#003A5D]/80 rounded-[30px] pt-8 pb-5 px-4 space-y-4 border border-[#CA4D4E]/30 text-left font-sans relative overflow-hidden">
                
                {/* Match Status Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#003A5D]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#E8E61A]" />
                    <span className="text-[11px] font-mono font-bold text-white">RANKED MATCH #2810</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#CA4D4E]/20 text-[#E8E61A] border border-[#CA4D4E]/40">
                    TURN 4 / 10
                  </span>
                </div>

                {/* Secret Card & Opponent Target */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#00253e] border border-[#003A5D]">
                    <p className="text-[9px] font-semibold text-slate-300 uppercase tracking-wider">Your Entity</p>
                    <p className="text-xs font-bold text-white mt-0.5 font-mono">🐅 Bengal Tiger</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#00253e] border border-[#003A5D]">
                    <p className="text-[9px] font-semibold text-slate-300 uppercase tracking-wider">Opponent Target</p>
                    <p className="text-xs font-bold text-slate-400 mt-0.5 font-mono">🔒 [Undisclosed]</p>
                  </div>
                </div>

                {/* Deduction Probability Matrix */}
                <div className="p-3 rounded-xl bg-[#00253e] border border-[#003A5D] space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-300 font-mono">Possibility Set Size</span>
                    <span className="font-mono text-[#E8E61A] font-bold">14 / 240 Entities</span>
                  </div>
                  <div className="w-full bg-[#003A5D] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#CA4D4E] to-[#E8E61A] h-full w-[12%]" />
                  </div>
                </div>

                {/* Strategic Dialogue History */}
                <div className="space-y-2.5 text-xs">
                  
                  {/* Question item */}
                  <div className="p-2.5 rounded-xl bg-[#00253e] border border-[#003A5D]">
                    <p className="text-[10px] font-mono text-[#CA4D4E] font-semibold mb-0.5">Your Question</p>
                    <p className="text-slate-100 text-xs font-medium">"Is this entity native to rainforest biomes?"</p>
                  </div>

                  {/* Response item */}
                  <div className="p-2.5 rounded-xl bg-[#003A5D] border border-[#CA4D4E]/30 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-slate-300 font-semibold">Opponent Answer</p>
                      <p className="text-xs font-bold text-[#E8E61A]">"YES"</p>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> AI Verified
                    </span>
                  </div>

                </div>

                {/* Question Input Field Mockup */}
                <div className="pt-1">
                  <div className="p-2.5 rounded-xl bg-[#00253e] border border-[#003A5D] flex items-center justify-between text-slate-300 text-xs">
                    <span className="text-slate-400 italic">Type strategic question...</span>
                    <button className="px-3 py-1 bg-[#CA4D4E] text-white rounded-lg text-[10px] font-semibold">
                      Ask
                    </button>
                  </div>
                </div>

                {/* AI Fair Play Footer Bar */}
                <div className="p-2 rounded-lg bg-[#00253e] border border-[#003A5D] flex items-center justify-between text-[10px] text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <Shield className="w-3 h-3 text-[#E8E61A]" />
                    <span>Gemini AI Integrity Engine</span>
                  </span>
                  <span className="text-[#E8E61A] font-mono font-bold">100% Valid</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

