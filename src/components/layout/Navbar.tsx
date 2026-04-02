import React from 'react';
import { Coffee } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-[#fff4e6]/80 backdrop-blur-md border-b border-[#d4a373]/30 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#3c2f2f] p-2.5 rounded-xl shadow-md">
            <Coffee className="text-[#fff4e6]" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#3c2f2f] tracking-tight leading-none">Kiar Cafe</h1>
            <span className="text-xs font-bold tracking-widest text-[#8b5a2b] uppercase">Gurgaon</span>
          </div>
        </div>
      </div>
    </nav>
  );
};