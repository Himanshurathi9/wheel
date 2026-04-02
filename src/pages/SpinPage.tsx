import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { SpinWheel } from '../components/wheel/SpinWheel';
import { PrizeModal } from '../components/modal/PrizeModal';
import { CountdownTimer } from '../components/modal/CountdownTimer';
import { WinnerTicker } from '../components/wheel/WinnerTicker';
import { KIAR_PRIZES } from '../constants/prizes';
import { useCoupons } from '../hooks/useCoupons';
import { Coupon } from '../types';
import { Phone, CheckCircle, LogOut, ChevronRight, Clock } from 'lucide-react';

export default function SpinPage() {
  const { coupons, isLoading, error, checkCanSpin, recordSpin, loadUserCoupons } = useCoupons();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [hasSpunThisSession, setHasSpunThisSession] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentWin, setCurrentWin] = useState<Coupon | null>(null);

  const verifyUser = async (phone: string) => {
    const canSpin = await checkCanSpin(phone);
    await loadUserCoupons(phone);
    setIsVerified(true);
    setHasSpunThisSession(!canSpin);
  };

  useEffect(() => {
    const saved = localStorage.getItem('kiar_user_phone');
    if (saved) { setPhoneNumber(saved); verifyUser(saved); }
  }, []);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    localStorage.setItem('kiar_user_phone', phoneNumber);
    await verifyUser(phoneNumber);
  };

  const handleWin = async (coupon: Coupon | null) => {
    await recordSpin(phoneNumber, coupon);
    setCurrentWin(coupon);
    setHasSpunThisSession(true);
    setModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('kiar_user_phone');
    setIsVerified(false);
    setPhoneNumber('');
    setHasSpunThisSession(false);
  };

  // ──────────────────────────────────────────────
  // PHONE GATE (Screenshot 1)
  // ──────────────────────────────────────────────
  if (!isVerified) {
    return (
      <div
        className="min-h-screen flex flex-col relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0d2157 0%, #1a3a8f 55%, #0d2157 100%)' }}
      >
        {/* Concentric decorative rings */}
        <div className="absolute left-[-15%] bottom-[-15%] w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
             style={{ border: '1px solid rgba(255,255,255,0.15)',
                      boxShadow: '0 0 0 80px rgba(255,255,255,0.05), 0 0 0 160px rgba(255,255,255,0.03)' }} />
        <div className="absolute right-[-10%] top-[10%] w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />

        {/* Coffee bean silhouette decoration */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-8 pointer-events-none select-none"
             style={{ fontSize: '220px', filter: 'blur(2px)', opacity: 0.06 }}>☕</div>
        <div className="absolute left-[5%] top-1/4 opacity-8 pointer-events-none select-none"
             style={{ fontSize: '80px', filter: 'blur(1px)', opacity: 0.05 }}>✦</div>

        <Navbar
          breadcrumbs={[
            { label: 'Home' },
            { label: 'Promotions' },
            { label: 'Unlock Wheel', active: true },
          ]}
        />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[440px] relative fade-up">

            {/* Floating phone icon */}
            <div
              className="absolute -top-14 left-1/2 animate-float w-24 h-24 rounded-full flex items-center justify-center z-20"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
              }}
            >
              {/* Inner glow ring */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                <Phone size={26} className="text-white" />
              </div>
            </div>

            {/* Glass card */}
            <div
              className="pt-16 pb-8 px-8 rounded-3xl"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
              }}
            >
              <div className="mb-7">
                <h2
                  className="text-[32px] font-bold text-white mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Unlock the Wheel
                </h2>
                <p className="text-white/60 font-medium leading-relaxed text-[15px]">
                  Enter your phone number to see if you have a spin available!
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                {/* Input */}
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl text-[17px] font-semibold outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.92)',
                      color: '#0d2157',
                      border: '2px solid transparent',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#2352c8')}
                    onBlur={e => (e.target.style.borderColor = 'transparent')}
                  />
                  <ChevronRight
                    size={20}
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                    style={{ color: '#c0392b' }}
                  />
                </div>

                {error && (
                  <div
                    className="px-4 py-3 rounded-xl text-sm font-semibold"
                    style={{ background: 'rgba(192,57,43,0.2)', color: '#fca5a5', border: '1px solid rgba(192,57,43,0.3)' }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || phoneNumber.length < 10}
                  className="w-full py-4 rounded-2xl text-white font-bold text-[17px] tracking-wide transition-all active:scale-[0.98] disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #c0392b 0%, #96281b 100%)',
                    boxShadow: '0 8px 24px rgba(192,57,43,0.4)',
                  }}
                >
                  {isLoading ? 'Checking…' : 'Continue'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // SPIN / POST-SPIN PAGE (Screenshots 2, 3, 4)
  // ──────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-grid pb-12 relative">
      <Navbar
        showNav={true}
        onSignOut={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 pt-10 pb-16">

        {/* Page heading */}
        <div className="text-center mb-10 fade-up">
          <h1
            className="text-5xl sm:text-6xl font-bold"
            style={{ color: '#0d2157', fontFamily: 'var(--font-display)' }}
          >
            Spin to Win!
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* LEFT: Wheel or cooldown */}
          <div className="flex flex-col items-center justify-center fade-up fade-up-1">
            {hasSpunThisSession ? (
              /* COOLDOWN STATE (Screenshot 4) */
              <div
                className="w-full max-w-[480px] rounded-3xl p-10 flex flex-col items-center text-center"
                style={{
                  background: 'white',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 4px 24px rgba(13,33,87,0.08)',
                }}
              >
                {/* Big check */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ background: '#eff6ff', border: '2px solid #dbeafe' }}
                >
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M8 18 L15 25 L28 11"
                      stroke="#1a3a8f"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="draw-check"
                    />
                  </svg>
                </div>

                <h3
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#0d2157', fontFamily: 'var(--font-display)' }}
                >
                  Spin Recorded!
                </h3>
                <p className="font-medium mb-6" style={{ color: '#64748b' }}>
                  Your next spin unlocks in 2 hours.
                </p>

                {error && (
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: '#f0f4ff', color: '#1a3a8f' }}
                  >
                    <Clock size={15} />
                    {error.replace('Next spin available in ', '')}
                  </div>
                )}
              </div>
            ) : (
              <SpinWheel prizes={KIAR_PRIZES} onWin={handleWin} />
            )}
          </div>

          {/* RIGHT: Rewards panel */}
          <div
            className="rounded-3xl overflow-hidden fade-up fade-up-2"
            style={{
              background: 'white',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 4px 24px rgba(13,33,87,0.08)',
            }}
          >
            {/* Panel header */}
            <div
              className="px-7 py-5 flex items-center justify-between"
              style={{ borderBottom: '1px solid #f1f5f9' }}
            >
              <h3 className="text-[19px] font-bold" style={{ color: '#0d2157' }}>
                Your Active Rewards
              </h3>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-semibold transition-all hover:opacity-70"
                style={{ color: '#c0392b' }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>

            {/* Reward list */}
            <div className="p-4">
              {coupons.length === 0 ? (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ background: '#f8faff', border: '1.5px dashed #dbeafe' }}
                >
                  <p className="font-semibold" style={{ color: '#64748b' }}>
                    Spin the wheel to win!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[440px] overflow-y-auto">
                  {coupons.map(coupon => (
                    <div
                      key={coupon.id}
                      className="coupon-card rounded-2xl overflow-hidden"
                      style={{ border: '1.5px solid #e2e8f0' }}
                    >
                      {/* Reward name header */}
                      <div
                        className="px-5 py-3 flex items-center gap-2"
                        style={{ background: '#c0392b' }}
                      >
                        <CheckCircle size={15} className="text-white/80" />
                        <p className="text-white font-bold text-[15px]">{coupon.rewardLabel}</p>
                      </div>
                      {/* Code + timer */}
                      <div className="px-5 py-4 flex items-center justify-between gap-3">
                        <span
                          className="font-bold tracking-widest text-sm"
                          style={{ color: '#0d2157', fontFamily: 'monospace' }}
                        >
                          {coupon.code}
                        </span>
                        <CountdownTimer expiresAt={coupon.expiresAt} compact />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <PrizeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} coupon={currentWin} />
      <WinnerTicker />
    </div>
  );
}
