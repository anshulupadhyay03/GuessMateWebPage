import React from 'react';
import { Users, KeyRound, MessageSquare, RotateCcw, Shield, Zap, Layers, AlertTriangle } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const FEATURES = [
    {
      icon: MessageSquare,
      title: 'Free-Text Hypothesis Engine',
      description: 'Formulate custom strategic questions to test binary, spatial, temporal, or taxonomic bounds.',
    },
    {
      icon: Shield,
      title: 'AI Fair Play Verification',
      description: 'Gemini AI audits match logs to verify response honesty and eliminate misleading answers.',
    },
    {
      icon: Zap,
      title: 'Low-Latency Matchmaking',
      description: 'Sub-100ms real-time state synchronization across live iOS, Android, and web clients.',
    },
    {
      icon: AlertTriangle,
      title: 'Risk & Penalty System',
      description: 'Incorrect guesses incur turn forfeits, giving your opponent consecutive questioning moves.',
    },
    {
      icon: KeyRound,
      title: 'Private Match Codes',
      description: 'Instantly spin up private competitive lobbies using 6-character match IDs.',
    },
    {
      icon: Layers,
      title: 'Infinite Category Datasets',
      description: 'Curated sets across Tech, Cinema, History, Biology, Sports, and custom user sets.',
    },
    {
      icon: RotateCcw,
      title: 'Decision Tree Replay',
      description: 'Review full match transcripts and decision pathways post-game to sharpen strategy.',
    },
    {
      icon: Users,
      title: 'Ranked Competitive Elo',
      description: 'Track your deduction rating, win ratios, and decision efficiency against global players.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#001D31]/75 backdrop-blur-sm border-t border-[#003A5D]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#003A5D] border border-[#CA4D4E]/40 text-xs font-semibold text-[#E8E61A]">
            <span>Product Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Competitive Strategy
          </h2>
          <p className="text-base text-slate-200">
            A high-performance social deduction platform built for speed, accuracy, and skill-based competition.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#00253e] border border-[#003A5D] hover:border-[#CA4D4E] transition-all duration-200 hover:-translate-y-0.5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#CA4D4E]/10 border border-[#CA4D4E]/30 flex items-center justify-center text-[#E8E61A] mb-4 transition-colors group-hover:bg-[#CA4D4E]/20">
                  <Icon className="w-5 h-5 text-[#E8E61A]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

