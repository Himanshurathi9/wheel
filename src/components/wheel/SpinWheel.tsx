import React from 'react';
import { Prize, Coupon } from '../../types';
import { useWheel } from '../../hooks/useWheel';

interface SpinWheelProps {
  prizes: Prize[];
  onWin: (coupon: Coupon | null) => void;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({ prizes, onWin }) => {
  const { isSpinning, rotation, spin } = useWheel(prizes, onWin);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 mb-10 drop-shadow-2xl">
        
        {/* Outer Rim Shadow/Bezel */}
        <div className="absolute inset-[-12px] bg-[#3c2f2f] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)]"></div>

        {/* Static Pointer Triangle */}
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[36px] border-t-[#cd853f] z-20 drop-shadow-md" />
        
        {/* The Rotating Wheel Container */}
        <div 
          className="w-full h-full rounded-full overflow-hidden relative shadow-inner z-10 border-4 border-[#fff4e6]"
          style={{ 
            transform: `rotate(${rotation}deg)`, 
            transition: 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' 
          }}
        >
          {prizes.map((prize, i) => {
            const angle = 360 / prizes.length;
            return (
              <div 
                key={prize.id}
                className="absolute w-full h-full flex items-start justify-center pt-6 sm:pt-8 text-white font-bold text-xs sm:text-sm text-center"
                style={{
                  backgroundColor: prize.color,
                  transform: `rotate(${i * angle}deg)`,
                  transformOrigin: '50% 50%',
                  clipPath: `polygon(50% 50%, 0 0, 100% 0)`
                }}
              >
                {/* Text rotation and positioning inside the slice */}
                <span className="block w-28 sm:w-32 transform -rotate-90 mt-4 drop-shadow-md">
                  {prize.label}
                </span>
              </div>
            );
          })}
          
          {/* Inner Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#fff4e6] rounded-full z-20 border-4 border-[#3c2f2f] shadow-inner flex items-center justify-center">
            <span className="text-[#3c2f2f] font-black text-xl">KC</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={spin}
        disabled={isSpinning}
        className="group relative px-10 py-4 bg-[#3c2f2f] text-[#fff4e6] text-xl font-bold rounded-full overflow-hidden shadow-[0_8px_0_#2a2121] active:translate-y-2 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_8px_0_#2a2121]"
      >
        <span className="relative z-10">{isSpinning ? 'Good Luck...' : 'Tap to Spin!'}</span>
        {/* Button hover gradient effect */}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      </button>
    </div>
  );
};