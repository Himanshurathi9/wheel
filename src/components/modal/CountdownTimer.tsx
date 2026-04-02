import { useCountdown } from '../../hooks/useCountdown';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  expiresAt: number;
}

// MAKE SURE it says "export const CountdownTimer" right here!
export const CountdownTimer = ({ expiresAt }: CountdownTimerProps) => {
  const { hours, minutes, seconds, isExpired } = useCountdown(expiresAt);

  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold tracking-wide">
        Expired
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fff4e6] border-2 border-[#d4a373] rounded-lg shadow-sm">
      <Timer size={18} className="text-[#8b5a2b]" />
      <span className="text-[#3c2f2f] font-mono font-bold text-lg tracking-widest w-[85px] text-center">
        {String(hours).padStart(2, '0')}:
        {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};