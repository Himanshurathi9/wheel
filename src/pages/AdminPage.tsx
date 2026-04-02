import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { StatsRow } from '../components/admin/StatsRow';
import { FilterTabs } from '../components/admin/FilterTabs';
import { CouponTable } from '../components/admin/CouponTable';
import { useCoupons } from '../hooks/useCoupons';
import { Lock, KeyRound } from 'lucide-react';

export default function AdminPage() {
  const { coupons, loadAllCoupons } = useCoupons();
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [isLocked, setIsLocked] = useState(true);
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState(false);

  const STAFF_PIN = '2026';

  useEffect(() => {
    if (sessionStorage.getItem('kiar_admin_unlocked') === 'true') {
      setIsLocked(false);
      loadAllCoupons();
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === STAFF_PIN) {
      setIsLocked(false);
      setError(false);
      sessionStorage.setItem('kiar_admin_unlocked', 'true');
      loadAllCoupons();
    } else {
      setError(true);
      setPinInput('');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem('kiar_admin_unlocked');
    setIsLocked(true);
    setPinInput('');
  };

  // ── LOCK SCREEN ──────────────────────────────
  if (isLocked) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'var(--ice)' }}
      >
        <div
          className="w-full max-w-sm rounded-3xl p-8 text-center fade-up"
          style={{
            background: 'white',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 8px 40px rgba(13,33,87,0.1)',
          }}
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: '#0d2157' }}
          >
            <Lock size={26} className="text-white" />
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ color: '#0d2157', fontFamily: 'var(--font-display)' }}>
            Staff Access
          </h1>
          <p className="text-sm font-medium mb-7" style={{ color: '#64748b' }}>
            Enter your PIN to view active cafe rewards.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              placeholder="••••"
              className="w-full text-center text-3xl tracking-[0.5em] font-bold py-4 rounded-2xl outline-none transition-all"
              style={{
                background: error ? '#fef2f2' : '#f8faff',
                border: `2px solid ${error ? '#c0392b' : '#dbeafe'}`,
                color: error ? '#c0392b' : '#0d2157',
                fontFamily: 'monospace',
              }}
              onFocus={e => { if (!error) e.target.style.borderColor = '#2352c8'; }}
              onBlur={e => { e.target.style.borderColor = error ? '#c0392b' : '#dbeafe'; }}
            />

            {error && (
              <p className="text-sm font-bold" style={{ color: '#c0392b' }}>
                Incorrect PIN. Try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-white font-bold text-[16px] tracking-wide transition-all active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #1a3a8f 0%, #0d2157 100%)',
                boxShadow: '0 8px 24px rgba(13,33,87,0.25)',
              }}
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: 'var(--ice)' }}>
      {/* Dark navy header (matching screenshot 5) */}
      <div style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-5 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <KeyRound size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-[17px] leading-none tracking-tight">Kiar Cafe</p>
              <p className="text-white/50 text-[10px] font-semibold tracking-[0.18em] uppercase leading-none mt-0.5">Gurgaon</p>
            </div>
          </div>
          <button
            onClick={handleLock}
            className="flex items-center gap-2 text-sm font-bold transition-all hover:opacity-80"
            style={{ color: '#c0392b' }}
          >
            <Lock size={14} />
            Lock Screen
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-5 py-10">

        {/* Title row */}
        <div className="mb-8 fade-up">
          <h1 className="text-3xl font-bold" style={{ color: '#0d2157', fontFamily: 'var(--font-display)' }}>
            Staff Dashboard
          </h1>
          <p className="mt-1 font-medium" style={{ color: '#64748b' }}>
            Verify customer rewards and track active coupons.
          </p>
        </div>

        {/* Stats */}
        <div className="fade-up fade-up-1">
          <StatsRow coupons={coupons} />
        </div>

        {/* Filter + Table */}
        <div className="fade-up fade-up-2">
          <FilterTabs currentFilter={filter} setFilter={setFilter} />
          <CouponTable coupons={coupons} filter={filter} />
        </div>
      </main>
    </div>
  );
}
