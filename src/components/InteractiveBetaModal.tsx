import React, { useState } from 'react';
import { X, Play, Shield, Send, RefreshCw, AlertTriangle, Trophy, CheckCircle2, Search, ArrowRight, MessageSquare } from 'lucide-react';
import { CATEGORIES_DATA, PUZZLE_ITEMS_BY_CATEGORY } from '../data/categories';
import { QuestionTurn, AiReviewResult } from '../types';

interface InteractiveBetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomCode?: string;
}

export const InteractiveBetaModal: React.FC<InteractiveBetaModalProps> = ({
  isOpen,
  onClose,
  initialRoomCode
}) => {
  if (!isOpen) return null;

  // Game Setup State
  const [step, setStep] = useState<'LOBBY' | 'SELECT_SECRET' | 'GAMEPLAY' | 'RESULT'>('LOBBY');
  const [roomCode, setRoomCode] = useState(initialRoomCode || 'G3N-' + Math.floor(100 + Math.random() * 900));
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES_DATA[0].id);
  const [userSecret, setUserSecret] = useState('');
  const [aiSecret, setAiSecret] = useState('');
  
  // Search query for items
  const [itemSearchQuery, setItemSearchQuery] = useState('');

  // Gameplay State
  const [turns, setTurns] = useState<QuestionTurn[]>([]);
  const [currentQuestionInput, setCurrentQuestionInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [turnOwner, setTurnOwner] = useState<'PLAYER' | 'OPPONENT'>('PLAYER');
  const [penaltyActiveFor, setPenaltyActiveFor] = useState<'PLAYER' | 'OPPONENT' | null>(null);
  const [matchWinner, setMatchWinner] = useState<'PLAYER' | 'OPPONENT' | null>(null);

  // Guess Modal State
  const [isGuessModalOpen, setIsGuessModalOpen] = useState(false);
  const [selectedGuessItem, setSelectedGuessItem] = useState('');
  const [guessSearchQuery, setGuessSearchQuery] = useState('');

  // AI Fair Play Review State
  const [aiReview, setAiReview] = useState<AiReviewResult | null>(null);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  // Available items for current category
  const categoryItems = PUZZLE_ITEMS_BY_CATEGORY[selectedCategory] || ['Item A', 'Item B', 'Item C'];

  // Initialize or reset match
  const handleStartMatch = () => {
    if (!userSecret) {
      setUserSecret(categoryItems[0]);
    }
    // AI picks secret from same category
    const availableAiSecrets = categoryItems.filter(i => i !== userSecret);
    const randomAiSecret = availableAiSecrets[Math.floor(Math.random() * availableAiSecrets.length)] || categoryItems[0];
    setAiSecret(randomAiSecret);

    setTurns([]);
    setTurnOwner('PLAYER');
    setPenaltyActiveFor(null);
    setMatchWinner(null);
    setAiReview(null);
    setStep('GAMEPLAY');
  };

  // Handle Player asking a question
  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestionInput.trim() || isAiThinking) return;

    const questionText = currentQuestionInput.trim();
    setCurrentQuestionInput('');
    setIsAiThinking(true);

    try {
      // Call AI Opponent server API
      const res = await fetch('/api/ai-opponent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ANSWER_USER_QUESTION',
          category: selectedCategory,
          aiSecret,
          userQuestion: questionText,
        }),
      });

      const data = await res.json();
      const answerText = data.answer || 'Yes';

      const newTurn: QuestionTurn = {
        id: 'turn-' + (turns.length + 1),
        questionNumber: turns.length + 1,
        askedBy: 'PLAYER',
        questionText,
        answerText,
        answeredBy: 'OPPONENT',
      };

      const updatedTurns = [...turns, newTurn];
      setTurns(updatedTurns);

      // Change turn to AI
      setIsAiThinking(false);
      setTurnOwner('OPPONENT');

      // Trigger AI Turn after brief delay
      setTimeout(() => {
        handleAiTurn(updatedTurns);
      }, 1200);

    } catch (err) {
      console.error(err);
      setIsAiThinking(false);
    }
  };

  // Handle AI taking its turn
  const handleAiTurn = async (currentTurns: QuestionTurn[]) => {
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/ai-opponent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'GENERATE_AI_QUESTION',
          category: selectedCategory,
          transcript: currentTurns,
        }),
      });

      const data = await res.json();
      const aiQuestion = data.question || 'Is it warm-blooded?';

      // Simulate player answer based on userSecret properties
      let aiAnswer = 'Yes';
      const qLower = aiQuestion.toLowerCase();
      const uLower = userSecret.toLowerCase();

      if (qLower.includes('fly') && !['penguin', 'eagle', 'falcon', 'bat'].some(x => uLower.includes(x))) aiAnswer = 'No';
      if (qLower.includes('aquatic') || qLower.includes('water')) aiAnswer = ['whale', 'dolphin', 'shark', 'penguin', 'octopus'].some(x => uLower.includes(x)) ? 'Yes' : 'No';

      const newAiTurn: QuestionTurn = {
        id: 'turn-' + (currentTurns.length + 1),
        questionNumber: currentTurns.length + 1,
        askedBy: 'OPPONENT',
        questionText: aiQuestion,
        answerText: aiAnswer,
        answeredBy: 'PLAYER',
      };

      setTurns([...currentTurns, newAiTurn]);
      setIsAiThinking(false);

      // Check if penalty active
      if (penaltyActiveFor === 'PLAYER') {
        // Player forfeited turn due to wrong guess penalty, AI gets bonus turn!
        setPenaltyActiveFor(null);
        setTimeout(() => {
          handleAiTurn([...currentTurns, newAiTurn]);
        }, 1500);
      } else {
        setTurnOwner('PLAYER');
      }

    } catch (err) {
      console.error(err);
      setIsAiThinking(false);
      setTurnOwner('PLAYER');
    }
  };

  // Submit Guess
  const handleConfirmGuess = async () => {
    if (!selectedGuessItem) return;
    setIsGuessModalOpen(false);

    const isCorrect = selectedGuessItem.trim().toLowerCase() === aiSecret.trim().toLowerCase();

    if (isCorrect) {
      setMatchWinner('PLAYER');
      setStep('RESULT');
    } else {
      // WRONG GUESS PENALTY TRIGGER
      setPenaltyActiveFor('PLAYER');
      
      const penaltyTurn: QuestionTurn = {
        id: 'turn-' + (turns.length + 1),
        questionNumber: turns.length + 1,
        askedBy: 'PLAYER',
        questionText: `[INCORRECT GUESS]: "${selectedGuessItem}"`,
        answerText: 'Wrong Guess! Penalty Applied: Loss of next questioning turn + Opponent Bonus Turn.',
        answeredBy: 'OPPONENT',
        isPenaltyTurn: true
      };

      const updated = [...turns, penaltyTurn];
      setTurns(updated);
      setTurnOwner('OPPONENT');

      // Trigger AI turn due to penalty
      setTimeout(() => {
        handleAiTurn(updated);
      }, 1200);
    }
  };

  // Run AI Fair Play Review via Gemini Server API
  const handleRunAiReview = async () => {
    setIsReviewLoading(true);
    try {
      const res = await fetch('/api/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          player1Secret: userSecret,
          player2Secret: aiSecret,
          transcript: turns,
        }),
      });

      const data = await res.json();
      setAiReview(data);
    } catch (err) {
      console.error('Failed AI review:', err);
    } finally {
      setIsReviewLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#00253e] border border-[#003A5D] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#001D31] border-b border-[#003A5D] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#003A5D] border border-[#CA4D4E]/40 flex items-center justify-center text-[#E8E61A] font-mono font-bold">
              ?
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-white">GuessMacha Match Simulator</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#00253e] text-[#E8E61A] border border-[#003A5D] rounded">
                  LOBBY #{roomCode}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-[#00253e] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: LOBBY & CATEGORY SELECT */}
          {step === 'LOBBY' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">Select Match Dataset</h3>
                <p className="text-xs text-slate-300">
                  Both opponents select from the identical dataset domain for complete symmetric fairness.
                </p>
              </div>

              {/* Room Code Badge */}
              <div className="p-4 rounded-xl bg-[#001D31] border border-[#003A5D] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono font-semibold text-slate-400 uppercase">Match ID</p>
                  <p className="text-lg font-mono font-bold text-[#E8E61A] tracking-wider">{roomCode}</p>
                </div>
                <button
                  onClick={() => setRoomCode('G3N-' + Math.floor(100 + Math.random() * 900))}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00253e] text-slate-200 hover:text-white border border-[#003A5D] flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              </div>

              {/* Category Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES_DATA.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedCategory === cat.id
                        ? 'bg-[#CA4D4E]/20 border-[#CA4D4E] text-white shadow-sm'
                        : 'bg-[#001D31] border-[#003A5D] hover:border-[#CA4D4E]/40 text-slate-300'
                    }`}
                  >
                    <p className="font-bold text-sm text-white">{cat.name}</p>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{cat.description}</p>
                    <span className="inline-block mt-2 text-[10px] font-mono text-[#E8E61A]">
                      {cat.itemCount}+ entities
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep('SELECT_SECRET')}
                className="w-full py-3.5 rounded-xl font-semibold text-xs text-white bg-[#CA4D4E] hover:bg-[#b83d3e] shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Secret Selection</span>
                <ArrowRight className="w-4 h-4 text-[#E8E61A]" />
              </button>
            </div>
          )}

          {/* STEP 2: SELECT SECRET */}
          {step === 'SELECT_SECRET' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-[#001D31] text-[#E8E61A] border border-[#003A5D] rounded uppercase">
                  Dataset Domain: {CATEGORIES_DATA.find(c => c.id === selectedCategory)?.name}
                </span>
                <h3 className="text-xl font-bold text-white">Lock Secret Entity</h3>
                <p className="text-xs text-slate-300">
                  Your opponent must ask strategic questions to identify this entity. Keep it hidden!
                </p>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Filter candidate dataset..."
                  value={itemSearchQuery}
                  onChange={(e) => setItemSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#001D31] border border-[#003A5D] rounded-xl text-sm text-white focus:outline-none focus:border-[#CA4D4E] font-medium"
                />
              </div>

              {/* Items List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
                {categoryItems
                  .filter(i => i.toLowerCase().includes(itemSearchQuery.toLowerCase()))
                  .map(item => (
                    <button
                      key={item}
                      onClick={() => setUserSecret(item)}
                      className={`p-2.5 rounded-lg text-left text-xs font-semibold transition-all border ${
                        userSecret === item
                          ? 'bg-[#CA4D4E] text-white font-bold border-[#CA4D4E] shadow-sm'
                          : 'bg-[#001D31] text-slate-300 border-[#003A5D] hover:border-[#CA4D4E]/40'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
              </div>

              <div className="p-4 rounded-xl bg-[#001D31] border border-[#003A5D] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono font-semibold text-slate-400 uppercase">Selected Secret Entity</p>
                  <p className="text-base font-bold text-[#E8E61A] font-mono mt-0.5">{userSecret || categoryItems[0]}</p>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Locked</span>
                </div>
              </div>

              <button
                onClick={handleStartMatch}
                className="w-full py-3.5 rounded-xl font-semibold text-xs text-white bg-[#CA4D4E] hover:bg-[#b83d3e] shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-current text-[#E8E61A]" />
                <span>Initialize Match vs AI Opponent</span>
              </button>
            </div>
          )}

          {/* STEP 3: GAMEPLAY ARENA */}
          {step === 'GAMEPLAY' && (
            <div className="space-y-4">
              
              {/* Gameplay Header Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-[#0B1020] border border-slate-800 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Dataset</p>
                  <p className="text-white font-bold">{CATEGORIES_DATA.find(c => c.id === selectedCategory)?.name}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Your Secret</p>
                  <p className="text-blue-400 font-bold font-mono">🔒 {userSecret}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Match State</p>
                  <p className={`font-bold font-mono ${turnOwner === 'PLAYER' ? 'text-emerald-400' : 'text-blue-400'}`}>
                    {turnOwner === 'PLAYER' ? 'YOUR TURN TO ASK' : 'OPPONENT EVALUATING...'}
                  </p>
                </div>
              </div>

              {/* Penalty Alert Banner */}
              {penaltyActiveFor && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center space-x-3 text-xs text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>
                    <strong>WRONG GUESS PENALTY ACTIVE:</strong> You lost your questioning turn. Opponent receives bonus turn.
                  </span>
                </div>
              )}

              {/* Question & Answer Transcript Feed */}
              <div className="bg-[#0B1020] rounded-xl border border-slate-800 p-4 space-y-3 min-h-[260px] max-h-[340px] overflow-y-auto">
                {turns.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2 text-slate-500">
                    <MessageSquare className="w-8 h-8 text-slate-600" />
                    <p className="text-sm font-bold text-white">Match Active</p>
                    <p className="text-xs text-slate-400">Submit your first question below to begin narrowing down your opponent's secret.</p>
                  </div>
                ) : (
                  turns.map((t) => (
                    <div key={t.id} className="space-y-2 text-xs">
                      
                      {/* Question */}
                      <div className={`flex ${t.askedBy === 'PLAYER' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`p-3 rounded-xl max-w-[85%] border ${
                          t.askedBy === 'PLAYER'
                            ? 'bg-[#131A2A] border-slate-800 text-slate-200'
                            : 'bg-slate-900 border-slate-800 text-slate-100'
                        }`}>
                          <p className="text-[10px] font-mono font-semibold text-slate-400 mb-0.5">
                            Q#{t.questionNumber} - {t.askedBy === 'PLAYER' ? 'You' : 'Opponent'}
                          </p>
                          <p className="font-semibold text-white">{t.questionText}</p>
                        </div>
                      </div>

                      {/* Answer */}
                      <div className={`flex ${t.askedBy === 'PLAYER' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2.5 rounded-xl max-w-[80%] border ${
                          t.askedBy === 'PLAYER'
                            ? 'bg-blue-600/20 border-blue-500/30 text-blue-200'
                            : 'bg-[#131A2A] border-slate-800 text-slate-200'
                        }`}>
                          <p className="text-[10px] font-mono font-semibold text-slate-400 mb-0.5">
                            Response from {t.answeredBy === 'OPPONENT' ? 'Opponent' : 'You'}
                          </p>
                          <p className="font-bold">{t.answerText}</p>
                        </div>
                      </div>

                    </div>
                  ))
                )}

                {isAiThinking && (
                  <div className="flex justify-end">
                    <div className="p-3 rounded-xl bg-[#131A2A] border border-slate-800 text-slate-300 text-xs flex items-center space-x-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                      <span>AI opponent formulating question...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Controls */}
              <div className="space-y-3">
                
                {/* Form to ask question */}
                <form onSubmit={handleAskQuestion} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={turnOwner === 'PLAYER' ? "Ask strategic question..." : "Waiting for opponent turn..."}
                    value={currentQuestionInput}
                    disabled={turnOwner !== 'PLAYER' || isAiThinking}
                    onChange={(e) => setCurrentQuestionInput(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#0B1020] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={turnOwner !== 'PLAYER' || !currentQuestionInput.trim() || isAiThinking}
                    className="px-5 py-3 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center space-x-1.5"
                  >
                    <span>Submit</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Bottom Bar: Guess Button & Suggestions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <span className="font-bold text-slate-300">Quick Prompts:</span>
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionInput("Is it warm-blooded?")}
                      className="px-2 py-1 rounded bg-[#0B1020] border border-slate-800 hover:text-white text-slate-300"
                    >
                      Warm-blooded?
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionInput("Can it fly?")}
                      className="px-2 py-1 rounded bg-[#0B1020] border border-slate-800 hover:text-white text-slate-300"
                    >
                      Can fly?
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionInput("Is it larger than a human?")}
                      className="px-2 py-1 rounded bg-[#0B1020] border border-slate-800 hover:text-white text-slate-300"
                    >
                      Larger than human?
                    </button>
                  </div>

                  <button
                    onClick={() => setIsGuessModalOpen(true)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all flex items-center space-x-1.5"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Execute Strike Guess</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* STEP 4: VICTORY / RESULT MODAL */}
          {step === 'RESULT' && (
            <div className="space-y-6 text-center py-6 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
                <Trophy className="w-7 h-7 text-blue-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">MATCH VICTORY</h3>
                <p className="text-xs text-blue-400 font-mono mt-1">
                  Opponent entity correctly identified: <strong className="text-white font-mono">{aiSecret}</strong>
                </p>
              </div>

              {/* Match Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0B1020] border border-slate-800 text-xs text-left">
                <div>
                  <p className="text-slate-400 text-[10px] font-mono uppercase">Dataset</p>
                  <p className="font-bold text-white mt-0.5">{CATEGORIES_DATA.find(c => c.id === selectedCategory)?.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-mono uppercase">Total Turns</p>
                  <p className="font-bold text-white mt-0.5">{turns.length} Turns</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-mono uppercase">Your Secret</p>
                  <p className="font-bold text-blue-400 font-mono mt-0.5">{userSecret}</p>
                </div>
              </div>

              {/* AI Fair Play Review Trigger */}
              <div className="p-5 rounded-xl bg-[#0B1020] border border-slate-800 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <h4 className="font-bold text-sm text-white">AI Fair Play Post-Match Audit</h4>
                  </div>
                  <button
                    onClick={handleRunAiReview}
                    disabled={isReviewLoading}
                    className="px-4 py-2 rounded-lg font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center space-x-1.5"
                  >
                    {isReviewLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Shield className="w-3.5 h-3.5" />
                    )}
                    <span>{aiReview ? 'Re-Run AI Audit' : 'Run AI Audit'}</span>
                  </button>
                </div>

                {/* AI Review Report Output */}
                {aiReview && (
                  <div className="pt-3 border-t border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-blue-400 font-semibold">Fair Play Index:</span>
                      <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {aiReview.fairPlayScore}% {aiReview.status}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed">{aiReview.summary}</p>

                    <div>
                      <p className="font-semibold text-slate-200 mb-1">Key Observations:</p>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {aiReview.keyInsights?.map((insight, idx) => (
                          <li key={idx}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep('LOBBY');
                    setTurns([]);
                  }}
                  className="flex-1 py-3 rounded-xl font-semibold text-xs text-slate-300 bg-[#0B1020] border border-slate-800 hover:text-white transition-all"
                >
                  New Match
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all"
                >
                  Close Simulator
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* GUESS DIALOG OVERLAY */}
      {isGuessModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#131A2A] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-white">Execute Strike Guess</h4>
              <button
                onClick={() => setIsGuessModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-amber-300 font-medium bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
              ⚠️ Penalty Warning: An incorrect guess incurs a loss of questioning turn and grants opponent bonus move.
            </p>

            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter dataset items..."
                value={guessSearchQuery}
                onChange={(e) => setGuessSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#0B1020] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Select item */}
            <div className="max-h-48 overflow-y-auto space-y-1 p-1">
              {categoryItems
                .filter(i => i.toLowerCase().includes(guessSearchQuery.toLowerCase()))
                .map(item => (
                  <div
                    key={item}
                    onClick={() => setSelectedGuessItem(item)}
                    className={`p-2.5 rounded-lg cursor-pointer text-xs font-semibold flex items-center justify-between ${
                      selectedGuessItem === item
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-[#0B1020] hover:bg-[#0B1020]/80 text-slate-300'
                    }`}
                  >
                    <span>{item}</span>
                    {selectedGuessItem === item && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsGuessModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-xs text-slate-400 bg-[#0B1020] border border-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmGuess}
                disabled={!selectedGuessItem}
                className="flex-1 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                Confirm Guess
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
