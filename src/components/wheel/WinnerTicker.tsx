import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

interface TickerItem {
  phone: string;
  reward: string;
  time: string;
}

// 1. Authentic-looking seeded data spread across several hours
const FAKE_WINNERS: TickerItem[] = [
  { phone: '98XXXXXX21', reward: 'Free Espresso', time: '1h ago' },
  { phone: '87XXXXXX44', reward: '10% Off Bill', time: '3h ago' },
  { phone: '99XXXXXX09', reward: 'Free Cookie', time: '4h ago' },
  { phone: '76XXXXXX88', reward: 'Buy 1 Get 1 Coffee', time: '6h ago' },
  { phone: '63XXXXXX12', reward: 'Free Espresso', time: '7h ago' },
];

// Helper function to turn database timestamps into "Xh ago" or "Xm ago"
const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return '1d ago';
};

export const WinnerTicker: React.FC = () => {
  const [winners, setWinners] = useState<TickerItem[]>(FAKE_WINNERS);

  useEffect(() => {
    const fetchRealWinners = async () => {
      // Pull real winners AND their timestamps from the database
      const { data } = await supabase
        .from('user_coupons')
        .select('phone_number, reward_label, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (data && data.length > 0) {
        const realWinners = data.map(win => {
          const phoneStr = String(win.phone_number);
          const masked = phoneStr.length >= 10 
            ? `${phoneStr.substring(0, 2)}XXXXXX${phoneStr.substring(phoneStr.length - 2)}`
            : 'New Winner';

          return {
            phone: masked,
            reward: win.reward_label,
            // Calculate the actual time difference
            time: getTimeAgo(win.created_at)
          };
        });

        // Mix real winners with the fake ones so it's always populated
        setWinners([...realWinners, ...FAKE_WINNERS].slice(0, 8));
      }
    };

    fetchRealWinners();
    
    // Refresh every 2 minutes
    const interval = setInterval(fetchRealWinners, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#3c2f2f] text-[#fff4e6] py-3 overflow-hidden border-t-4 border-[#d4a373] shadow-inner fixed bottom-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center">
        <div className="px-4 font-black tracking-widest uppercase text-xs text-[#d4a373] border-r border-[#d4a373]/30 whitespace-nowrap z-10 bg-[#3c2f2f]">
          Live Wins ⚡
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-ticker pl-4">
            {winners.map((winner, idx) => (
              <span key={idx} className="mx-6 text-sm font-medium">
                <span className="opacity-70">{winner.time} •</span> 
                <span className="font-bold tracking-wider mx-2 text-[#fff4e6]">{winner.phone}</span> 
                won <span className="text-[#d4a373] font-bold">{winner.reward}</span>! 🎉
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};