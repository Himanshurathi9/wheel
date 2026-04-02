import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { StatsRow } from '../components/admin/StatsRow';
import { FilterTabs } from '../components/admin/FilterTabs';
import { CouponTable } from '../components/admin/CouponTable';
import { useCoupons } from '../hooks/useCoupons';
import { Lock } from 'lucide-react';

export default function AdminPage() {
  const { coupons, loadAllCoupons } = useCoupons();
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');
  
  const [isLocked, setIsLocked] = useState(true);
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState(false);
  
  const STAFF_PIN = '2026'; 

  // NEW: Check if already unlocked when the page loads/refreshes
  useEffect(() => {
    const isUnlocked = sessionStorage.getItem('kiar_admin_unlocked');
    if (isUnlocked === 'true') {
      setIsLocked(false);
      loadAllCoupons();
    }
  }, []); // Empty array means this only runs once when the page loads

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === STAFF_PIN) {
      setIsLocked(false);
      setError(false);
      sessionStorage.setItem('kiar_admin_unlocked', 'true'); // Save to session!
      loadAllCoupons(); 
    } else {
      setError(true);
      setPinInput('');
    }
  };

  // NEW: Securely lock the screen and clear the session
  const handleLock = () => {
    sessionStorage.removeItem('kiar_admin_unlocked');
    setIsLocked(true);
    setPinInput('');
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#fff4e6] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#d4a373]/30 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-[#3c2f2f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock size={28} className="text-[#fff4e6]" />
          </div>
          <h1 className="text-2xl font-black text-[#3c2f2f] mb-2">Staff Access</h1>
          <p className="text-gray-500 text-sm mb-8 font-medium">Enter your PIN to view active cafe rewards.</p>
          
          <form onSubmit={handleUnlock}>
            <input 
              type="password" 
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              className={`w-full text-center text-3xl tracking-[1em] font-mono font-bold p-4 rounded-xl border-2 outline-none transition-colors mb-4 ${
                error ? 'border-red-400 bg-red-50 text-red-600' : 'border-[#d4a373]/50 focus:border-[#cd853f] bg-stone-50 text-[#3c2f2f]'
              }`}
            />
            {error && <p className="text-red-500 text-sm font-bold mb-4 animate-bounce">Incorrect PIN. Try again.</p>}
            
            <button 
              type="submit"
              className="w-full py-4 bg-[#3c2f2f] text-[#fff4e6] text-lg font-bold rounded-xl shadow-lg hover:bg-[#5a4646] active:translate-y-1 transition-all"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-12">
      <Navbar />
      
      <main className="max-w-6xl w-full mx-auto px-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-[#3c2f2f] tracking-tight">Staff Dashboard</h1>
            <p className="text-gray-500 mt-1 font-medium">Verify customer rewards and track active coupons.</p>
          </div>
          <button 
            onClick={handleLock}
            className="text-sm font-bold text-gray-400 hover:text-[#3c2f2f] transition-colors underline"
          >
            Lock Screen
          </button>
        </div>

        <StatsRow coupons={coupons} />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
          <FilterTabs currentFilter={filter} setFilter={setFilter} />
        </div>

        <CouponTable coupons={coupons} filter={filter} />
      </main>
    </div>
  );
}