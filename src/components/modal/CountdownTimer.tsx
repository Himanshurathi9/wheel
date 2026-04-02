import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  expiresAt: number;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiresAt, compact = false }) => {
  const { hours, minutes, seconds, isExpired } = useCountdown(expiresAt);

  if (isExpired) {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: '#fef2f2', color: '#c0392b' }}
      >
        Expired
      </span>
    );
  }

  if (compact) {
    return (
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
        style={{
          background: '#f0f4ff',
          border: '1.5px solid #2352c8',
        }}
      >
        <Timer size={14} style={{ color: '#c0392b' }} />
        <span
          className="font-bold tracking-widest text-sm"
          style={{ color: '#0d2157', fontFamily: 'monospace', minWidth: '72px' }}
        >
          {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
      style={{
        background: '#f0f4ff',
        border: '2px solid #2352c8',
        boxShadow: '0 4px 16px rgba(35,82,200,0.1)',
      }}
    >
      <Timer size={18} style={{ color: '#c0392b' }} />
      <span
        className="font-bold text-xl tracking-[0.2em]"
        style={{ color: '#0d2157', fontFamily: 'monospace', minWidth: '90px', textAlign: 'center' }}
      >
        {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
