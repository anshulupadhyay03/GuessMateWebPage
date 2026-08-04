import React, { useState } from 'react';
import { Shield, RefreshCw, AlertTriangle, Brain } from 'lucide-react';
import { AiReviewResult } from '../types';

export const AiFairPlaySection: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<'CLEAN' | 'CONTRADICTION'>('CLEAN');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewOutput, setReviewOutput] = useState<AiReviewResult | null>(null);

  const SAMPLE_CLEAN = [
    { questionNumber: 1, questionText: "Is it a mammal?", askedBy: "Player A", answerText: "Yes, warm-blooded mammal.", answeredBy: "Player B" },
    { questionNumber: 2, questionText: "Is it larger than a dog?", askedBy: "Player B", answerText: "Yes, adult tigers weigh 200kg+.", answeredBy: "Player A" },
    { questionNumber: 3, questionText: "Does it live in water?", askedBy: "Player A", answerText: "No, terrestrial land animal.", answeredBy: "Player B" },
    { questionNumber: 4, questionText: "Is it native to Asia?", askedBy: "Player A", answerText: "Yes, Bengal Tigers inhabit Asian reserves.", answeredBy: "Player B" }
  ];

  const SAMPLE_CONTRADICTION = [
    { questionNumber: 4, questionText: "Can it fly?", askedBy: "Player A", answerText: "No", answeredBy: "Player B" },
    { questionNumber: 8, questionText: "Does it have wings?", askedBy: "Player A", answerText: "Yes", answeredBy: "Player B" },
    { questionNumber: 11, questionText: "Does it live on land?", askedBy: "Player A", answerText: "Yes, strictly terrestrial.", answeredBy: "Player B" }
  ];

  const handleRunTest = async () => {
    setIsAnalyzing(true);
    setReviewOutput(null);

    const transcript = selectedSample === 'CLEAN' ? SAMPLE_CLEAN : SAMPLE_CONTRADICTION;

    try {
      const res = await fetch('/api/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'Animals',
          player1Secret: 'Tiger',
          player2Secret: 'Elephant',
          transcript,
        }),
      });

      const data = await res.json();
      setReviewOutput(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="ai-review" className="py-20 bg-[#0B1020] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#131A2A] border border-slate-800 text-xs font-semibold text-blue-400">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Fair Play Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Automated AI Fair Play Verification
          </h2>
          <p className="text-base text-slate-300">
            Trust is paramount in competitive deduction. Post-match AI auditing evaluates full game transcripts to verify answer consistency and eliminate misleading answers.
          </p>
        </div>

        {/* Interactive Testing Sandbox */}
        <div className="mt-14 max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#131A2A] border border-slate-800 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <span>Live AI Fair Play Verification Sandbox</span>
              </h3>
              <p className="text-xs text-slate-400">Select a sample transcript scenario below to test the AI evaluation engine live.</p>
            </div>

            {/* Scenario Toggles */}
            <div className="flex items-center space-x-2 bg-[#0B1020] p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedSample('CLEAN')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedSample === 'CLEAN'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sample 1: Clean Match
              </button>
              <button
                onClick={() => setSelectedSample('CONTRADICTION')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedSample === 'CONTRADICTION'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sample 2: Contradiction
              </button>
            </div>
          </div>

          {/* Transcript Preview */}
          <div className="p-4 rounded-xl bg-[#0B1020] border border-slate-800 space-y-3 font-mono text-xs">
            <p className="text-[10px] uppercase font-semibold text-slate-400 font-sans">
              Transcript Preview ({selectedSample === 'CLEAN' ? '4 Turns' : '3 Turns'}):
            </p>
            {(selectedSample === 'CLEAN' ? SAMPLE_CLEAN : SAMPLE_CONTRADICTION).map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#131A2A] border border-slate-800/80 flex items-center justify-between text-slate-300">
                <span>Q#{item.questionNumber}: <strong className="text-white">"{item.questionText}"</strong></span>
                <span className="text-blue-400 font-semibold">Answer: "{item.answerText}"</span>
              </div>
            ))}
          </div>

          {/* Execute Button */}
          <button
            onClick={handleRunTest}
            disabled={isAnalyzing}
            className="w-full py-3.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-blue-100" />
                <span>Auditing Match Transcript for Logical Consistency...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-blue-100" />
                <span>Run Gemini AI Fair Play Verification</span>
              </>
            )}
          </button>

          {/* Output Report */}
          {reviewOutput && (
            <div className="p-6 rounded-xl bg-[#0B1020] border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-sm text-white">AI Fair Play Audit Report</span>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  reviewOutput.fairPlayScore >= 90
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  Score: {reviewOutput.fairPlayScore}% ({reviewOutput.status})
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {reviewOutput.summary}
              </p>

              {reviewOutput.contradictions && reviewOutput.contradictions.length > 0 && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <p className="font-bold text-amber-400 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Contradictions Detected:</span>
                  </p>
                  {reviewOutput.contradictions.map((c, i) => (
                    <p key={i} className="text-slate-300 text-xs">
                      • Question #{c.questionNumber}: {c.issue} ({c.severity} Severity)
                    </p>
                  ))}
                </div>
              )}

              {reviewOutput.keyInsights && (
                <div>
                  <p className="font-semibold text-slate-200 mb-1">Audit Key Observations:</p>
                  <ul className="list-disc list-inside text-slate-400 space-y-1">
                    {reviewOutput.keyInsights.map((insight, i) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
