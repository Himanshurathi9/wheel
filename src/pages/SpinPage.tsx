import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { SpinWheel } from '../components/wheel/SpinWheel';
import { PrizeModal } from '../components/modal/PrizeModal';
import { CountdownTimer } from '../components/modal/CountdownTimer';
import { WinnerTicker } from '../components/wheel/WinnerTicker';
import { KIAR_PRIZES } from '../constants/prizes';
import { useCoupons } from '../hooks/useCoupons';
import { Coupon } from '../types';
import { Phone, Lock, LogOut } from 'lucide-react';

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
    const savedPhone = localStorage.getItem('kiar_user_phone');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
      verifyUser(savedPhone);
    }
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
  };

  return (
    // Deep, rich cafe gradient background
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2a1f1f] via-[#3c2f2f] to-[#1a1212] relative overflow-hidden z-0">
      
      {/* Decorative background ripples */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full border border-white/5 opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full border border-white/5 opacity-20 pointer-events-none"></div>

      <Navbar />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 pb-24 flex flex-col justify-center relative z-10">
        
        {/* --- PREMIUM GLASSMORPHISM PHONE GATE --- */}
        {!isVerified ? (
          <div className="max-w-md mx-auto w-full relative mt-10">
            
            {/* Floating Glass Icon */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] z-20 animate-float">
              <Phone size={36} className="text-[#d4a373] drop-shadow-md" />
            </div>

            {/* Frosted Glass Panel */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 pt-16 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] animate-in zoom-in-95 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-[#fff4e6] tracking-tight mb-2">Unlock the Wheel</h2>
                <p className="text-[#d4a373] font-medium opacity-90">Enter your phone number to see if you have a spin available!</p>
              </div>
              
              <form onSubmit={handlePhoneSubmit}>
                <div className="relative mb-6 group">
                  <input 
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-xl font-bold px-6 py-5 rounded-2xl bg-black/20 border border-white/10 text-[#fff4e6] placeholder-white/30 focus:outline-none focus:border-[#d4a373] focus:bg-black/40 transition-all shadow-inner"
                  />
                  {/* Subtle input glow on focus */}
                  <div className="absolute inset-0 rounded-2xl border border-[#d4a373] opacity-0 group-focus-within:opacity-100 group-focus-within:shadow-[0_0_15px_rgba(212,163,115,0.3)] transition-all pointer-events-none"></div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                    <p className="text-red-200 text-sm font-bold text-center">{error}</p>
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isLoading || phoneNumber.length < 10}
                  className="w-full py-5 bg-gradient-to-r from-[#d4a373] to-[#b07d4b] text-[#3c2f2f] text-xl font-black rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(212,163,115,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all"
                >
                  {isLoading ? 'Checking...' : 'Continue'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-700">
            
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* --- ELEGANT GOLDEN COOLDOWN SCREEN --- */}
              {hasSpunThisSession ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-[#d4a373] blur-[100px] opacity-20 rounded-full"></div>
                  <div className="bg-[#1a1212]/80 backdrop-blur-md p-12 rounded-[3rem] text-center border border-[#d4a373]/30 max-w-md w-full shadow-2xl relative z-10 golden-glow">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#d4a373] to-[#8b5a2b] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-[#1a1212]">
                      <Lock size={32} className="text-[#1a1212]" />
                    </div>
                    <h3 className="text-3xl font-black text-[#d4a373] mb-3 uppercase tracking-widest">Vault Locked</h3>
                    <p className="text-[#fff4e6] font-medium text-lg mb-6 opacity-80">Your next spin is currently charging.</p>
                    {error && (
                       <div className="inline-block px-6 py-3 bg-black/40 border border-[#d4a373]/20 rounded-xl">
                         <span className="font-mono text-[#d4a373] font-bold text-xl">{error.replace('Next spin available in ', '')}</span>
                       </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-5xl font-black text-[#fff4e6] mb-4 drop-shadow-md">Spin to Win!</h2>
                  </div>
                  <SpinWheel prizes={KIAR_PRIZES} onWin={handleWin} />
                </>
              )}
            </div>

            {/* --- REWARDS PANEL (Glassmorphism update) --- */}
            <div className="lg:col-span-5 flex flex-col h-full lg:pt-16">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/10 relative">
                
                <button 
                  onClick={handleLogout}
                  className="absolute top-8 right-8 text-white/50 hover:text-[#d4a373] transition-colors flex items-center gap-2 text-sm font-bold bg-black/20 px-4 py-2 rounded-full hover:bg-black/40"
                >
                  <LogOut size={16} /> 
                  Sign Out
                </button>

                <h3 className="text-2xl font-black text-[#fff4e6] mb-8 drop-shadow-sm">Your Active Rewards</h3>
                {coupons.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-white/20 rounded-2xl">
                    <p className="text-[#d4a373] font-medium text-lg">Spin the wheel to win!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {coupons.map(coupon => (
                      <div key={coupon.id} className="p-6 bg-gradient-to-r from-white/10 to-transparent border-l-4 border-[#d4a373] rounded-2xl shadow-sm hover:bg-white/10 transition-colors">
                        <p className="font-black text-xl text-[#fff4e6] mb-3">{coupon.rewardLabel}</p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <p className="text-sm font-mono bg-black/40 px-4 py-2 rounded-xl border border-white/10 font-bold text-[#d4a373] tracking-widest">{coupon.code}</p>
                          <CountdownTimer expiresAt={coupon.expiresAt} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
          </div>
        )}
      </main>

      <PrizeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} coupon={currentWin} />
      
      <WinnerTicker />
    </div>
  );
}