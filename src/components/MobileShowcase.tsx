import React, { useState } from 'react';
import { MobileScreenType } from '../types';
import { Smartphone, Shield, Trophy, Play, CheckCircle2, RotateCcw, Search, KeyRound, Sparkles, User, AlertTriangle, MessageSquare } from 'lucide-react';

export const MobileShowcase: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<MobileScreenType>('gameplay');

  const SCREENS_NAV: Array<{ id: MobileScreenType; label: string; icon: any }> = [
    { id: 'splash', label: '1. Splash Screen', icon: Sparkles },
    { id: 'login', label: '2. Login (Google)', icon: User },
    { id: 'home', label: '3. Home Dashboard', icon: Play },
    { id: 'create_room', label: '4. Create Lobby', icon: KeyRound },
    { id: 'join_room', label: '5. Join Lobby', icon: KeyRound },
    { id: 'secret_selection', label: '6. Entity Selection', icon: CheckCircle2 },
    { id: 'gameplay', label: '7. Gameplay Arena', icon: MessageSquare },
    { id: 'guess', label: '8. Strike Dialog', icon: Search },
    { id: 'victory', label: '9. Victory Screen', icon: Trophy },
    { id: 'defeat', label: '10. Defeat Screen', icon: AlertTriangle },
    { id: 'replay', label: '11. Match Replay', icon: RotateCcw },
    { id: 'ai_review', label: '12. AI Fair Play Audit', icon: Shield },
  ];

  return (
    <section id="mobile-showcase" className="py-20 bg-[#001D31] border-t border-[#003A5D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#003A5D] border border-[#CA4D4E]/40 text-xs font-semibold text-[#E8E61A]">
            <Smartphone className="w-3.5 h-3.5 text-[#E8E61A]" />
            <span>Mobile Interface Specs</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mobile Application Screens
          </h2>
          <p className="text-base text-slate-200">
            Preview the official GuessMacha mobile interface designed for competitive play on iOS & Android.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Screen Selector List */}
          <div className="lg:col-span-5 space-y-2 max-h-[560px] overflow-y-auto pr-2">
            {SCREENS_NAV.map((s) => {
              const Icon = s.icon;
              const isActive = activeScreen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveScreen(s.id)}
                  className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-[#003A5D] border-[#CA4D4E] text-white shadow-md'
                      : 'bg-[#00253e]/60 border-[#003A5D] text-slate-300 hover:text-white hover:border-[#CA4D4E]/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E8E61A]' : 'text-slate-400'}`} />
                    <span>{s.label}</span>
                  </div>
                  {isActive && <div className="w-2 h-2 rounded-full bg-[#E8E61A]" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Realistic Mobile Phone Frame Render */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[340px] h-[620px] bg-[#00253e] rounded-[44px] p-4 border-4 border-[#003A5D] shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Phone Notch & Top Status Bar */}
              <div className="flex items-center justify-between px-4 pt-1 text-[10px] font-mono font-semibold text-slate-300 z-10 shrink-0">
                <span>9:41</span>
                <div className="w-20 h-3.5 bg-[#001D31] rounded-full border border-[#003A5D] mx-auto" />
                <span className="text-slate-200">5G 100%</span>
              </div>

              {/* Dynamic Phone Content Area */}
              <div className="my-3 flex-1 bg-[#003A5D]/80 rounded-[28px] p-4 overflow-y-auto border border-[#CA4D4E]/30 text-xs flex flex-col">
                
                {/* 1. SPLASH SCREEN */}
                {activeScreen === 'splash' && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 my-auto">
                    <div className="w-14 h-14 rounded-2xl bg-[#00253e] border border-[#CA4D4E] flex items-center justify-center shadow-lg">
                      <span className="text-xl font-extrabold text-[#E8E61A] font-mono">G</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">GuessMacha</h3>
                      <p className="text-[10px] text-slate-300">Competitive Social Deduction</p>
                    </div>
                  </div>
                )}

                {/* 2. LOGIN SCREEN */}
                {activeScreen === 'login' && (
                  <div className="flex-1 flex flex-col justify-between py-6 my-auto text-center space-y-6">
                    <div className="space-y-2 pt-6">
                      <div className="w-10 h-10 rounded-xl bg-[#CA4D4E]/20 text-[#E8E61A] border border-[#CA4D4E]/30 flex items-center justify-center mx-auto">
                        <User className="w-5 h-5 text-[#E8E61A]" />
                      </div>
                      <h3 className="text-base font-bold text-white">Competitive Sign In</h3>
                      <p className="text-[11px] text-slate-300">Authenticate to record ranked matches</p>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full py-3 rounded-xl font-semibold text-xs bg-white text-slate-900 shadow flex items-center justify-center space-x-2">
                        <span className="text-sm font-bold text-[#CA4D4E]">G</span>
                        <span>Sign in with Google</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. HOME DASHBOARD */}
                {activeScreen === 'home' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#003A5D]">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#CA4D4E] text-white font-bold flex items-center justify-center text-xs">
                          A
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">Alex R.</p>
                          <p className="text-[9px] text-[#E8E61A] font-mono">Rating: 1,420 Elo</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] font-mono bg-[#00253e] text-emerald-400 rounded border border-[#003A5D]">
                        ONLINE
                      </span>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-[#CA4D4E] hover:bg-[#b83d3e] shadow flex items-center justify-center space-x-2">
                        <KeyRound className="w-4 h-4 text-[#E8E61A]" />
                        <span>Create Competitive Lobby</span>
                      </button>
                      <button className="w-full py-3 rounded-xl font-semibold text-xs text-slate-200 bg-[#00253e] border border-[#003A5D] flex items-center justify-center space-x-2">
                        <span>Join with Match ID</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-[#00253e] border border-[#003A5D] space-y-2">
                      <p className="text-[9px] font-mono uppercase text-slate-300 font-semibold">Season Performance</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-[#003A5D] border border-[#003A5D]">
                          <p className="text-slate-300 text-[9px]">Matches</p>
                          <p className="font-bold text-white font-mono">42 Played</p>
                        </div>
                        <div className="p-2 rounded-lg bg-[#003A5D] border border-[#003A5D]">
                          <p className="text-slate-300 text-[9px]">Win Rate</p>
                          <p className="font-bold text-[#E8E61A] font-mono">74%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. CREATE ROOM */}
                {activeScreen === 'create_room' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs text-white text-center">Create Game Lobby</h4>
                    <div className="p-3 rounded-xl bg-[#00253e] border border-[#003A5D] space-y-1 text-center">
                      <p className="text-[9px] text-slate-300 uppercase font-mono">Generated Match ID</p>
                      <p className="text-sm font-mono font-bold text-[#E8E61A]">G3N-789</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-semibold text-slate-300">Dataset Domain:</p>
                      <div className="p-2.5 rounded-lg bg-[#CA4D4E] text-white font-semibold text-xs">
                        🐾 Wildlife & Mammals (250 items)
                      </div>
                    </div>
                    <button className="w-full py-2.5 rounded-lg font-semibold text-xs text-white bg-[#CA4D4E]">
                      Initialize Lobby
                    </button>
                  </div>
                )}

                {/* 5. JOIN ROOM */}
                {activeScreen === 'join_room' && (
                  <div className="space-y-4 my-auto">
                    <h4 className="font-bold text-xs text-white text-center">Enter Match ID</h4>
                    <div className="p-3 bg-[#00253e] border border-[#003A5D] rounded-xl text-center">
                      <span className="text-base font-mono font-bold text-[#E8E61A] tracking-widest">G3N-789</span>
                    </div>
                    <button className="w-full py-2.5 rounded-lg font-semibold text-xs text-white bg-[#CA4D4E]">
                      Connect to Match
                    </button>
                  </div>
                )}

                {/* 6. SECRET SELECTION */}
                {activeScreen === 'secret_selection' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-white text-center">Select Secret Entity</h4>
                    <div className="space-y-1.5">
                      <div className="p-2.5 rounded-lg bg-[#CA4D4E] text-white font-bold text-xs">
                        🐅 Bengal Tiger (Selected)
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#00253e] text-slate-200 text-xs border border-[#003A5D]">
                        🐘 African Elephant
                      </div>
                    </div>
                    <button className="w-full py-2 rounded-lg font-semibold text-xs text-white bg-[#CA4D4E]">
                      Lock Selection
                    </button>
                  </div>
                )}

                {/* 7. GAMEPLAY ARENA */}
                {activeScreen === 'gameplay' && (
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div className="p-2 rounded-lg bg-[#00253e] border border-[#003A5D] flex justify-between text-[10px]">
                      <span className="text-slate-300 font-mono">Domain: <strong className="text-white">Wildlife</strong></span>
                      <span className="text-[#E8E61A] font-mono font-bold">Secret: 🐅 Tiger</span>
                    </div>

                    <div className="space-y-2 my-auto text-[11px]">
                      <div className="p-2.5 rounded-lg bg-[#00253e] border border-[#003A5D] text-slate-100">
                        <p className="text-[9px] text-slate-300 font-mono mb-0.5">Your Question</p>
                        <p className="text-xs">"Does it inhabit rainforest biomes?"</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#003A5D] text-slate-100 text-right border border-[#CA4D4E]/40">
                        <p className="text-[9px] text-slate-300 font-mono mb-0.5">Opponent Response</p>
                        <p className="text-xs font-bold text-[#E8E61A]">"YES"</p>
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <input
                        disabled
                        placeholder="Type strategic question..."
                        className="flex-1 bg-[#00253e] px-3 py-1.5 rounded-lg text-[10px] text-slate-200 border border-[#003A5D]"
                      />
                      <button className="px-3 py-1.5 rounded-lg bg-[#CA4D4E] text-white font-semibold text-[10px]">
                        Submit
                      </button>
                    </div>
                  </div>
                )}

                {/* 8. GUESS DIALOG */}
                {activeScreen === 'guess' && (
                  <div className="p-3 bg-[#00253e] border border-[#003A5D] rounded-xl space-y-3 my-auto">
                    <h4 className="font-bold text-xs text-white">Execute Winning Guess</h4>
                    <input
                      disabled
                      placeholder="Filter candidate set..."
                      className="w-full p-2 rounded-lg bg-[#003A5D] border border-[#003A5D] text-[10px] text-slate-200"
                    />
                    <div className="p-2 rounded-lg bg-[#CA4D4E] text-white font-bold text-xs">
                      🐘 African Elephant
                    </div>
                    <button className="w-full py-2 rounded-lg bg-[#CA4D4E] font-semibold text-xs text-white">
                      Confirm Guess
                    </button>
                  </div>
                )}

                {/* 9. VICTORY SCREEN */}
                {activeScreen === 'victory' && (
                  <div className="text-center space-y-3 my-auto">
                    <Trophy className="w-8 h-8 text-[#E8E61A] mx-auto" />
                    <h3 className="text-base font-bold text-white">MATCH VICTORY</h3>
                    <p className="text-[10px] text-slate-200 font-mono">Opponent entity correctly identified in 4 turns.</p>
                    <button className="w-full py-2 rounded-lg bg-[#CA4D4E] text-white font-semibold text-xs">
                      Audit Match Log
                    </button>
                  </div>
                )}

                {/* 10. DEFEAT SCREEN */}
                {activeScreen === 'defeat' && (
                  <div className="text-center space-y-3 my-auto">
                    <AlertTriangle className="w-8 h-8 text-[#E8E61A] mx-auto" />
                    <h3 className="text-base font-bold text-white">MATCH CONCEDED</h3>
                    <p className="text-[10px] text-slate-300 font-mono">Opponent Secret: Blue Whale</p>
                    <button className="w-full py-2 rounded-lg bg-[#003A5D] text-white font-semibold text-xs">
                      Rematch
                    </button>
                  </div>
                )}

                {/* 11. MATCH REPLAY */}
                {activeScreen === 'replay' && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-white">Match Decision Tree</h4>
                    <div className="p-2 rounded-lg bg-[#00253e] border border-[#003A5D] text-[10px] space-y-1">
                      <p className="text-[#CA4D4E] font-mono">Q1: "Is it warm-blooded?"</p>
                      <p className="text-slate-200 font-mono">Ans: Yes</p>
                    </div>
                  </div>
                )}

                {/* 12. AI REVIEW SCREEN */}
                {activeScreen === 'ai_review' && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-[#E8E61A]">
                      <Shield className="w-4 h-4 text-[#E8E61A]" />
                      <h4 className="font-bold text-xs text-white">AI Fair Play Report</h4>
                    </div>
                    <div className="p-3 bg-[#00253e] border border-[#003A5D] rounded-lg space-y-1 text-[10px]">
                      <p className="font-mono font-bold text-[#E8E61A]">Fair Play Index: 98% CLEAN</p>
                      <p className="text-slate-200">No logical contradictions or misdirections detected in match transcript.</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Phone Bar */}
              <div className="w-24 h-1 bg-[#003A5D] rounded-full mx-auto shrink-0 mb-1" />

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

