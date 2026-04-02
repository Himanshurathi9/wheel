import React, { useEffect } from 'react';
import { Coupon } from '../../types';
import { CountdownTimer } from './CountdownTimer';
import { triggerConfetti } from '../confetti/Confetti';
import { X, Gift, Copy } from 'lucide-react';

interface PrizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: Coupon | null;
}

export const PrizeModal: React.FC<PrizeModalProps> = ({ isOpen, onClose, coupon }) => {
  useEffect(() => {
    if (isOpen && coupon) {
      triggerConfetti();
    }
  }, [isOpen, coupon]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3c2f2f]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fff4e6] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full text-[#3c2f2f] transition-colors z-10"
        >
          <X size={20} />
        </button>

        {coupon ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#d4a373] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Gift size={32} className="text-[#3c2f2f]" />
            </div>
            
            <h2 className="text-3xl font-black text-[#3c2f2f] mb-2 tracking-tight">You Won!</h2>
            <p className="text-xl font-bold text-[#8b5a2b] mb-6">{coupon.rewardLabel}</p>
            
            <div className="w-full bg-white p-4 rounded-xl border-2 border-dashed border-[#cd853f] mb-6 relative group">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1 font-semibold">Your Code</p>
              <p className="text-3xl font-mono font-black text-[#3c2f2f]">{coupon.code}</p>
            </div>

            <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Offer expires in</p>
            <CountdownTimer expiresAt={coupon.expiresAt} />
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center text-center">
            <h2 className="text-3xl font-black text-[#3c2f2f] mb-2">Aw, Snap!</h2>
            <p className="text-lg text-gray-600">Better luck next time. Grab a coffee and try again tomorrow!</p>
          </div>
        )}
        
        <div className="bg-[#3c2f2f] p-4 text-center">
          <button 
            onClick={onClose}
            className="text-[#fff4e6] font-bold text-lg hover:text-[#d4a373] transition-colors"
          >
            Awesome, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};