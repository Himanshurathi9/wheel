import React from 'react';
import { Coupon } from '../../types';

interface CouponTableProps {
  coupons: Coupon[];
  filter: 'all' | 'active' | 'expired';
}

export const CouponTable: React.FC<CouponTableProps> = ({ coupons, filter }) => {
  const now = Date.now();
  
  const filteredCoupons = coupons.filter(coupon => {
    if (filter === 'active') return coupon.expiresAt > now;
    if (filter === 'expired') return coupon.expiresAt <= now;
    return true; // 'all'
  });

  if (filteredCoupons.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
        <p className="text-gray-500 font-medium">No coupons found for this filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Coupon Code</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reward</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Expires At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCoupons.map((coupon) => {
              const isActive = coupon.expiresAt > now;
              const date = new Date(coupon.expiresAt);
              
              return (
                <tr key={coupon.id} className="hover:bg-[#fff4e6]/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#8b5a2b]">
                    {coupon.code}
                  </td>
                  <td className="p-4 font-bold text-[#3c2f2f]">
                    {coupon.rewardLabel}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {isActive ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};