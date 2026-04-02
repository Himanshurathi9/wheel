import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Zap } from 'lucide-react';

interface TickerItem {
  phone: string;
  reward: string;
  time: string;
}

const FAKE_WINNERS: TickerItem[] = [
  { phone: '98XXXXXX21', reward: 'Free Espresso', time: '1h ago' },
  { phone: '87XXXXXX44', reward: '10% Off Bill', time: '3h ago' },
  { phone: '99XXXXXX09', reward: 'Free Cookie', time: '4h ago' },
  { phone: '76XXXXXX88', reward: 'Buy 1 Get 1 Coffee', time: '6h ago' },
  { phone: '63XXXXXX12', reward: 'Free Espresso', time: '7h ago' },
];

const getTimeAgo = (dateString: string) => {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return '1d ago';
};

export const WinnerTicker: React.FC = () => {
  const [winners, setWinners] = useState<TickerItem[]>([...FAKE_WINNERS, ...FAKE_WINNERS]);

  useEffect(() => {
    const fetchRealWinners = async () => {
      const { data } = await supabase
        .from('user_coupons')
        .select('phone_number, reward_label, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (data && data.length > 0) {
        const real = data.map(win => {
          const s = String(win.phone_number);
          return {
            phone: s.length >= 10 ? `${s.slice(0, 2)}XXXXXX${s.slice(-2)}` : 'Winner',
            reward: win.reward_label,
            time: getTimeAgo(win.created_at),
          };
        });
        const combined = [...real, ...FAKE_WINNERS].slice(0, 8);
        setWinners([...combined, ...combined]);
      }
    };

    fetchRealWinners();
    const interval = setInterval(fetchRealWinners, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden"
      style={{
        background: 'var(--navy)',
        borderTop: '2px solid rgba(255,255,255,0.1)',
        height: '44px',
      }}
    >
      <div className="flex items-center h-full">
        {/* Label badge */}
        <div
          className="flex items-center gap-2 px-5 h-full shrink-0 z-10"
          style={{
            background: 'var(--navy)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span className="pulse-dot w-2 h-2 rounded-full bg-[#c0392b]" />
          <Zap size={13} className="text-white/60" />
          <span className="text-white font-bold text-[11px] tracking-[0.15em] uppercase">Live Wins</span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-ticker flex items-center">
            {winners.map((w, i) => (
              <span key={i} className="flex items-center gap-1.5 mx-8 text-[13px] whitespace-nowrap">
                <span className="text-white/40 font-medium">{w.time} ·</span>
                <span className="text-white font-bold tracking-wide">{w.phone}</span>
                <span className="text-white/60 font-medium">won</span>
                <span className="text-[#e74c3c] font-bold">{w.reward}</span>
                <span>🎉</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
