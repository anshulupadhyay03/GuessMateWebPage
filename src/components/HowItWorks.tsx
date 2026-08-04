import React, { useState } from 'react';
import { KeyRound, Shield, Play, HelpCircle, Trophy, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    {
      stepNumber: '01',
      title: 'Match Protocol Initialization',
      icon: KeyRound,
      badge: 'Lobby Creation',
      description: 'Host creates a private match, selects a category, and receives a unique 6-character match ID (e.g. G3N-789) to invite an opponent.',
      detail: 'Instant room initialization or direct deep-link invite.'
    },
    {
      stepNumber: '02',
      title: 'Secret Selection (Symmetric Set)',
      icon: HelpCircle,
      badge: 'Symmetric Info',
      description: 'Both players secretly select an entity from the exact same category pool (e.g. World History, Tech Brands, Wildlife, Cinema).',
      detail: 'Guarantees equal candidate domain depth.'
    },
    {
      stepNumber: '03',
      title: 'Turn-Based Strategic Inquiry',
      icon: Play,
      badge: 'Free-Text Questions',
      description: 'Player A submits an analytical question → Player B responds honestly → Player B submits a question → Player A responds.',
      detail: 'Ask any bounded question: geography, time, traits, classification.'
    },
    {
      stepNumber: '04',
      title: 'Risk Mechanics: Premature Penalty',
      icon: AlertTriangle,
      badge: 'Turn Forfeit',
      description: 'An incorrect guess forfeits your next questioning turn, yielding a consecutive questioning opportunity to your opponent.',
      detail: 'Enforces rigorous information gathering over blind guesses.'
    },
    {
      stepNumber: '05',
      title: 'Deductive Victory Execution',
      icon: Trophy,
      badge: '2–5 Min Matches',
      description: 'Correctly identify your opponent\'s hidden entity first to secure the match victory and gain competitive Elo points.',
      detail: 'Review full match decision trees anytime in match history.'
    },
    {
      stepNumber: '06',
      title: 'Automated AI Fair Play Audit',
      icon: Shield,
      badge: 'Gemini Engine',
      description: 'Post-match AI verification evaluates answer consistency against factual entity databases to eliminate misdirection or false answers.',
      detail: 'Generates a 0–100% Fair Play Score for competitive ratings.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0B1020] text-white relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#131A2A] border border-slate-800 text-xs font-semibold text-blue-400">
            <Play className="w-3.5 h-3.5 fill-current text-blue-400" />
            <span>Match Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How Matches Are Played
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Matches last between 2 and 5 minutes. Here is the step-by-step competitive flow.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#131A2A] border-blue-500/80 shadow-md scale-[1.01]'
                    : 'bg-[#131A2A]/50 border-slate-800 hover:border-slate-700 hover:bg-[#131A2A]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-2xl font-bold text-slate-500">
                      {step.stepNumber}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{step.description}</p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center space-x-2 text-[11px] text-blue-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: Penalty Rule */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#131A2A] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-base font-bold text-white">Competitive Rule: Turn Forfeit Penalty</h4>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-800 text-amber-400 border border-slate-700 rounded">
                  Strategic Penalty
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
                An incorrect entity guess does <strong className="text-white">NOT</strong> eliminate you immediately. Instead, you forfeit your next questioning turn, giving your opponent <strong className="text-white">one consecutive bonus turn</strong>. Always verify candidate sets before taking a winning shot.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
