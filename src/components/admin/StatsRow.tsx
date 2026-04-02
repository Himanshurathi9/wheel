import React from 'react';
import { Coupon } from '../../types';
import { Ticket, Clock, CheckCircle2 } from 'lucide-react';

interface StatsRowProps {
  coupons: Coupon[];
}

export const StatsRow: React.FC<StatsRowProps> = ({ coupons }) => {
  const now = Date.now();
  const activeCount = coupons.filter(c => c.expiresAt > now).length;
  const expiredCount = coupons.length - activeCount;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#d4a373]/30 flex items-center gap-4">
        <div className="p-4 bg-[#fff4e6] rounded-xl text-[#8b5a2b]">
          <Ticket size={28} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Issued</p>
          <p className="text-3xl font-black text-[#3c2f2f]">{coupons.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#d4a373]/30 flex items-center gap-4">
        <div className="p-4 bg-green-50 rounded-xl text-green-600">
          <CheckCircle2 size={28} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Now</p>
          <p className="text-3xl font-black text-[#3c2f2f]">{activeCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#d4a373]/30 flex items-center gap-4">
        <div className="p-4 bg-red-50 rounded-xl text-red-500">
          <Clock size={28} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Expired</p>
          <p className="text-3xl font-black text-[#3c2f2f]">{expiredCount}</p>
        </div>
      </div>
    </div>
  );
};