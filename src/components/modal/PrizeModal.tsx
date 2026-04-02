import React, { useEffect } from 'react';
import { Coupon } from '../../types';
import { CountdownTimer } from './CountdownTimer';
import { triggerConfetti } from '../confetti/Confetti';
import { X, Gift } from 'lucide-react';

interface PrizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: Coupon | null;
}

export const PrizeModal: React.FC<PrizeModalProps> = ({ isOpen, onClose, coupon }) => {
  useEffect(() => {
    if (isOpen && coupon) triggerConfetti();
  }, [isOpen, coupon]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(13,33,87,0.55)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden relative fade-up"
        style={{
          background: 'white',
          boxShadow: '0 32px 80px rgba(13,33,87,0.25), 0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-slate-100 z-10"
          style={{ color: '#94a3b8' }}
        >
          <X size={18} />
        </button>

        {coupon ? (
          <div className="p-8 flex flex-col items-center text-center">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1a3a8f 0%, #0d2157 100%)' }}
            >
              <Gift size={28} className="text-white" />
            </div>

            {/* Heading */}
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-1" style={{ color: '#94a3b8' }}>
              Congratulations
            </p>
            <h2 className="text-4xl font-bold mb-1" style={{ color: '#0d2157', fontFamily: 'var(--font-display)' }}>
              You Won!
            </h2>
            <p className="text-xl font-bold mb-8" style={{ color: '#c0392b' }}>
              {coupon.rewardLabel}
            </p>

            {/* Code box */}
            <div
              className="w-full rounded-2xl p-5 mb-6"
              style={{
                background: '#f8faff',
                border: '2px dashed #2352c8',
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#94a3b8' }}>
                Your Code
              </p>
              <p
                className="text-3xl font-bold tracking-widest"
                style={{ color: '#0d2157', fontFamily: 'monospace' }}
              >
                {coupon.code}
              </p>
            </div>

            {/* Expiry */}
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: '#94a3b8' }}>
              Offer Expires In
            </p>
            <CountdownTimer expiresAt={coupon.expiresAt} />
          </div>
        ) : (
          <div className="p-10 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: '#f1f5f9' }}
            >
              <span className="text-3xl">😔</span>
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0d2157', fontFamily: 'var(--font-display)' }}>
              Aw, Snap!
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Better luck next time. Grab a coffee and spin again in 2 hours!
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="px-8 pb-8">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl text-white font-bold text-base tracking-wide transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #1a3a8f 0%, #0d2157 100%)',
              boxShadow: '0 8px 24px rgba(13,33,87,0.3)',
            }}
          >
            Awesome, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
