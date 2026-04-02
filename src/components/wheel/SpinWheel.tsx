import React from 'react';
import { Prize, Coupon } from '../../types';
import { useWheel } from '../../hooks/useWheel';

interface SpinWheelProps {
  prizes: Prize[];
  onWin: (coupon: Coupon | null) => void;
}

// Premium color palette for wheel slices matching screenshot blue/red/white theme
const WHEEL_COLORS = [
  '#c0392b', // crimson
  '#1a3a8f', // navy
  '#e8ecf8', // ice white
  '#2352c8', // blue
  '#e74c3c', // bright red
];

export const SpinWheel: React.FC<SpinWheelProps> = ({ prizes, onWin }) => {
  const { isSpinning, rotation, spin } = useWheel(prizes, onWin);
  const sliceAngle = 360 / prizes.length;

  return (
    <div className="flex flex-col items-center gap-10">

      {/* Wheel wrapper with glow */}
      <div className="relative">

        {/* Ambient glow behind wheel */}
        <div className="absolute inset-[-24px] rounded-full opacity-30 blur-2xl pointer-events-none"
             style={{ background: 'radial-gradient(circle, #2352c8 0%, transparent 70%)' }} />

        {/* Outer decorative ring */}
        <div className="absolute inset-[-10px] rounded-full border border-white/20 pointer-events-none" />
        <div className="absolute inset-[-20px] rounded-full border border-white/10 pointer-events-none" />

        {/* Pointer triangle */}
        <div className="absolute top-[-22px] left-1/2 -translate-x-1/2 z-30 drop-shadow-lg">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '30px solid #c0392b',
              filter: 'drop-shadow(0 2px 6px rgba(192,57,43,0.5))'
            }}
          />
        </div>

        {/* Main wheel */}
        <div
          className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full wheel-ring"
          style={{
            background: 'white',
            border: '10px solid #0d2157',
            boxShadow: '0 20px 60px rgba(13,33,87,0.3), inset 0 2px 0 rgba(255,255,255,0.3)',
          }}
        >
          {/* Rotating part */}
          <div
            className="w-full h-full rounded-full overflow-hidden relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                : 'none',
            }}
          >
            <svg
              viewBox="-1 -1 2 2"
              className="w-full h-full absolute inset-0"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {prizes.map((prize, i) => {
                const startAngle = (i * sliceAngle * Math.PI) / 180;
                const endAngle = ((i + 1) * sliceAngle * Math.PI) / 180;
                const x1 = Math.cos(startAngle);
                const y1 = Math.sin(startAngle);
                const x2 = Math.cos(endAngle);
                const y2 = Math.sin(endAngle);
                const largeArc = sliceAngle > 180 ? 1 : 0;
                const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
                const midAngle = ((i + 0.5) * sliceAngle * Math.PI) / 180;
                const textR = 0.62;
                const tx = Math.cos(midAngle) * textR;
                const ty = Math.sin(midAngle) * textR;
                const textAngle = (i + 0.5) * sliceAngle + 90;
                const isLight = color === '#e8ecf8';

                return (
                  <g key={prize.id}>
                    {/* Slice */}
                    <path
                      d={`M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={color}
                      stroke="white"
                      strokeWidth="0.02"
                    />
                    {/* Label */}
                    <text
                      x={tx}
                      y={ty}
                      fontSize="0.095"
                      fontFamily="'Plus Jakarta Sans', sans-serif"
                      fontWeight="700"
                      fill={isLight ? '#0d2157' : 'white'}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textAngle}, ${tx}, ${ty})`}
                    >
                      {prize.label.length > 12
                        ? prize.label.split(' ').map((word, wi) => (
                            <tspan key={wi} x={tx} dy={wi === 0 ? `-${(prize.label.split(' ').length - 1) * 0.05}` : '0.11'}>
                              {word}
                            </tspan>
                          ))
                        : prize.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Center hub */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-20 flex items-center justify-center"
              style={{
                width: '72px',
                height: '72px',
                background: 'linear-gradient(145deg, #f0f0f0 0%, #d8d8d8 100%)',
                border: '4px solid #0d2157',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <span style={{ color: '#0d2157', fontWeight: 800, fontSize: '15px', letterSpacing: '-0.5px' }}>KC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="relative overflow-hidden shimmer-btn px-12 py-4 rounded-full text-white font-bold text-lg tracking-wide disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
        style={{
          background: isSpinning
            ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
            : 'linear-gradient(135deg, #c0392b 0%, #96281b 100%)',
          boxShadow: isSpinning
            ? 'none'
            : '0 8px 24px rgba(192,57,43,0.4), 0 2px 0 rgba(255,255,255,0.1) inset',
        }}
      >
        {isSpinning ? 'Spinning…' : 'Tap to Spin!'}
      </button>
    </div>
  );
};
