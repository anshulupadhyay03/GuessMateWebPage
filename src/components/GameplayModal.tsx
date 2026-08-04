import React, { useState } from 'react';
import { X, Play, ArrowRight } from 'lucide-react';

interface GameplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBeta: () => void;
}

export const GameplayModal: React.FC<GameplayModalProps> = ({ isOpen, onClose, onOpenBeta }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const MATCH_TIMELINE = [
    {
      time: '0:00',
      title: 'Lobby Creation & Secret Lock',
      category: 'Wildlife',
      question: null,
      answer: null,
      description: 'Host creates Lobby G3N-89A. Both opponents lock in secret entities from Wildlife pool.'
    },
    {
      time: '0:45',
      title: 'Turn 1: High-Level Constraint',
      category: 'Wildlife',
      question: 'Player A: "Does this entity inhabit tropical or rainforest biomes?"',
      answer: 'Player B: "YES, native to tropical forests."',
      description: 'Player A eliminates non-tropical candidate set.'
    },
    {
      time: '1:15',
      title: 'Turn 2: Counter-Inquiry',
      category: 'Wildlife',
      question: 'Player B: "Is this entity a carnivorous apex predator?"',
      answer: 'Player A: "YES."',
      description: 'Player B narrows candidate options.'
    },
    {
      time: '1:50',
      title: 'Turn 3: Spatial & Size Check',
      category: 'Wildlife',
      question: 'Player A: "Does an adult specimen weigh over 1,000 kg?"',
      answer: 'Player B: "YES, adult elephants weigh 4,000+ kg."',
      description: 'Player A reduces remaining candidate set size to 3 entities.'
    },
    {
      time: '2:10',
      title: 'Turn 4: Precise Deductive Guess',
      category: 'Wildlife',
      question: 'Player A: "Executing strike: AFRICAN ELEPHANT"',
      answer: 'System: "MATCH CONCLUDED - VICTORY PLAYER A"',
      description: 'Player A achieves victory in 2 minutes 10 seconds.'
    },
    {
      time: '2:25',
      title: 'Post-Match: AI Fair Play Verification',
      category: 'Wildlife',
      question: 'AI Evaluation Engine:',
      answer: 'Fair Play Score: 98% Clean. Zero contradictions detected.',
      description: 'Gemini AI verifies all responses match factual entity properties.'
    }
  ];

  const currentStep = MATCH_TIMELINE[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#131A2A] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Play className="w-4 h-4 fill-current text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Competitive Match Simulation</h3>
              <p className="text-xs text-slate-400">Step-by-step match replay timeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#0B1020]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Animated Match Screen Container */}
        <div className="p-5 rounded-xl bg-[#0B1020] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-bold">
              STEP {currentStepIndex + 1} OF {MATCH_TIMELINE.length}
            </span>
            <span className="font-mono text-slate-400 font-semibold">TIME: {currentStep.time}</span>
          </div>

          <h4 className="text-lg font-bold text-white">{currentStep.title}</h4>

          {/* Q&A Cards */}
          {currentStep.question && (
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-[#131A2A] border border-slate-800 text-slate-200 font-semibold">
                {currentStep.question}
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-bold">
                {currentStep.answer}
              </div>
            </div>
          )}

          <p className="text-xs text-slate-300 leading-relaxed bg-[#131A2A] p-3 rounded-lg border border-slate-800">
            {currentStep.description}
          </p>

          {/* Progress Timeline Dots */}
          <div className="flex items-center justify-between gap-1 pt-2">
            {MATCH_TIMELINE.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'bg-blue-500'
                    : idx < currentStepIndex
                    ? 'bg-blue-900'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B1020] text-slate-300 border border-slate-800 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.min(MATCH_TIMELINE.length - 1, prev + 1))}
              disabled={currentStepIndex === MATCH_TIMELINE.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B1020] text-slate-300 border border-slate-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBeta();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-sm flex items-center justify-center space-x-2"
          >
            <span>Launch Live Match Simulation</span>
            <ArrowRight className="w-4 h-4 text-blue-100" />
          </button>
        </div>

      </div>
    </div>
  );
};
