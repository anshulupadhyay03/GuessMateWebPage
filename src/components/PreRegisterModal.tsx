import React, { useState } from 'react';
import { X, CheckCircle2, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { GuessMachaIcon } from './GuessMateIcon';

interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreRegisterModal: React.FC<PreRegisterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [platform, setPlatform] = useState<'iOS' | 'Android'>('Android');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

    try {
      // 1. Post to Google Sheet URL if configured
      if (sheetUrl) {
        await fetch(sheetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, platform, timestamp: new Date().toISOString() }),
        });
      }

      // 2. Post to server endpoint as backup / proxy logger
      await fetch('/api/pre-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, platform }),
      }).catch(() => {});
    } catch (err) {
      console.error('Error submitting pre-registration:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#00253e] border border-[#003A5D] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-300 hover:text-white rounded-lg bg-[#001D31]"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <GuessMachaIcon size="lg" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Pre-Register for App Store Launch</h3>
              <p className="text-xs text-slate-200">
                Receive early match invitation keys, competitive rank badges, and private beta access on iOS & Android.
              </p>
            </div>

            {/* Platform selection */}
            <div className="grid grid-cols-2 gap-2">
              {(['Android', 'iOS'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`py-2 rounded-xl font-semibold text-xs transition-all border ${
                    platform === p
                      ? 'bg-[#CA4D4E] text-white border-[#CA4D4E] shadow-sm'
                      : 'bg-[#001D31] text-slate-300 border-[#003A5D]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#001D31] border border-[#003A5D] rounded-xl text-xs text-white focus:outline-none focus:border-[#CA4D4E] disabled:opacity-50 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold text-xs text-white bg-[#CA4D4E] hover:bg-[#b83d3e] disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#E8E61A] animate-spin" />
                    <span>Registering Email...</span>
                  </>
                ) : (
                  <>
                    <span>Reserve Beta Spot & Claim Founder Badge</span>
                    <ArrowRight className="w-4 h-4 text-[#E8E61A]" />
                  </>
                )}
              </button>
            </form>

            <p className="text-[10px] text-slate-400 font-mono">
              Zero spam. Unsubscribe anytime. 100% skill-based strategy platform.
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4 py-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Registered for Early Access</h3>
            <p className="text-xs text-slate-200">
              We've registered <strong className="text-[#E8E61A] font-mono">{email}</strong> for {platform} access. Watch your inbox for competitive match keys!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#CA4D4E] hover:bg-[#b83d3e]"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

