import React, { useState } from 'react';
import { X, CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import { GuessMateIcon } from './GuessMateIcon';

interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreRegisterModal: React.FC<PreRegisterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [platform, setPlatform] = useState<'iOS' | 'Android'>('Android');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#131A2A] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-[#0B1020]"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <GuessMateIcon size="lg" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Pre-Register for App Store Launch</h3>
              <p className="text-xs text-slate-300">
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
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : 'bg-[#0B1020] text-slate-400 border-slate-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0B1020] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Reserve Beta Spot & Claim Founder Badge</span>
                <ArrowRight className="w-4 h-4 text-blue-100" />
              </button>
            </form>

            <p className="text-[10px] text-slate-500 font-mono">
              Zero spam. Unsubscribe anytime. 100% skill-based strategy platform.
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4 py-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Registered for Early Access</h3>
            <p className="text-xs text-slate-300">
              We've registered <strong className="text-white font-mono">{email}</strong> for {platform} access. Watch your inbox for competitive match keys!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
