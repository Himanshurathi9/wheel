import React from 'react';
import { Coffee, LogOut, ClipboardList, User } from 'lucide-react';

interface NavbarProps {
  showNav?: boolean;
  onSignOut?: () => void;
  breadcrumbs?: { label: string; active?: boolean }[];
}

export const Navbar: React.FC<NavbarProps> = ({ showNav = false, onSignOut, breadcrumbs }) => {
  return (
    <nav className="w-full sticky top-0 z-40 shadow-[0_1px_0_rgba(255,255,255,0.08)]"
         style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-5 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
            <Coffee className="text-white" size={20} />
          </div>
          <div>
            <p className="text-white font-bold text-[17px] leading-none tracking-tight">Kiar Cafe</p>
            <p className="text-white/50 text-[10px] font-semibold tracking-[0.18em] uppercase leading-none mt-0.5">Gurgaon</p>
          </div>
        </div>

        {/* Nav links (shown after login) */}
        {showNav && (
          <div className="hidden md:flex items-center gap-2">
            <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all">
              <User size={15} />
              My Account
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all">
              <ClipboardList size={15} />
              Order History
            </a>
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-all ml-2"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            )}
          </div>
        )}

        {/* Breadcrumbs (phone gate) */}
        {breadcrumbs && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-white/50 font-medium">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-white/25">›</span>}
                <span className={b.active ? 'text-white font-semibold' : ''}>{b.label}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
