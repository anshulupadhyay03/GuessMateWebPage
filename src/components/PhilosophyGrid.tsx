import React from 'react';
import { Brain, Scale, Target, ShieldCheck, Check, X } from 'lucide-react';

export const PhilosophyGrid: React.FC = () => {
  return (
    <section className="py-20 bg-[#001D31] border-t border-[#003A5D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#003A5D] border border-[#CA4D4E]/40 text-xs font-semibold text-[#E8E61A]">
            <Brain className="w-3.5 h-3.5 text-[#E8E61A]" />
            <span>Product Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for Pure Strategic Logic
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            Every match begins with symmetric information depth. Victory depends entirely on decision-tree efficiency, hypothesis testing, and risk management.
          </p>
        </div>

        {/* Comparison Cards: Trivia vs GuessMacha */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Traditional Trivia Card */}
          <div className="p-8 rounded-2xl bg-[#00253e]/80 border border-[#003A5D] space-y-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <X className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-slate-300">Traditional Trivia Arcade Games</h3>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                LUCK BASED
              </span>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Rewards memorizing niche facts rather than analytical reasoning.</span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Multiple-choice questions with zero room for custom strategic inquiry.</span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Heavy RNG factor depending on which questions pop up in the card deck.</span>
              </li>
            </ul>
          </div>

          {/* GuessMacha Card */}
          <div className="p-8 rounded-2xl bg-[#003A5D] border border-[#CA4D4E]/80 space-y-6 relative shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#CA4D4E]/20 border border-[#CA4D4E]/40 flex items-center justify-center text-[#E8E61A]">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-white">GuessMacha Competitive Engine</h3>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#E8E61A]/20 text-[#E8E61A] border border-[#E8E61A]/30">
                100% STRATEGY
              </span>
            </div>

            <ul className="space-y-4 text-sm text-slate-100">
              <li className="flex items-start space-x-3">
                <Check className="w-4 h-4 text-[#E8E61A] shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">Free-Text Hypothesis Testing:</strong> Ask high-level binary or bounded spatial/temporal questions.</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-4 h-4 text-[#E8E61A] shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">Symmetric Information:</strong> Both players select secret entities from identical candidate pools.</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-4 h-4 text-[#E8E61A] shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">Turn Discipline:</strong> Premature guesses incur turn forfeit penalties to enforce analytical rigour.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#00253e] border border-[#003A5D] hover:border-[#CA4D4E]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#CA4D4E]/10 border border-[#CA4D4E]/30 flex items-center justify-center text-[#CA4D4E] mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">1. Binary Search Strategy</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Formulate constrained questions that halve the remaining candidate set every turn.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#00253e] border border-[#003A5D] hover:border-[#CA4D4E]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E8E61A]/10 border border-[#E8E61A]/30 flex items-center justify-center text-[#E8E61A] mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">2. Deduction Execution</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Synthesize affirmative and negative responses into precise candidate narrowing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#00253e] border border-[#003A5D] hover:border-[#CA4D4E]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#003A5D] border border-slate-600 flex items-center justify-center text-slate-200 mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">3. Calculated Risk</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Balance precise question gathering against taking a decisive winning strike.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#00253e] border border-[#003A5D] hover:border-[#CA4D4E]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">4. AI Fair Play</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Gemini AI models audit match logs to verify answer accuracy and ensure fair competition.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

