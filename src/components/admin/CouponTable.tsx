import React from 'react';
import { Coupon } from '../../types';

interface CouponTableProps {
  coupons: Coupon[];
  filter: 'all' | 'active' | 'expired';
}

export const CouponTable: React.FC<CouponTableProps> = ({ coupons, filter }) => {
  const now = Date.now();

  const filtered = coupons.filter(c => {
    if (filter === 'active') return c.expiresAt > now;
    if (filter === 'expired') return c.expiresAt <= now;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div
        className="rounded-2xl p-12 text-center"
        style={{ background: 'white', border: '1.5px solid #e2e8f0' }}
      >
        <p className="font-semibold" style={{ color: '#94a3b8' }}>
          No coupons found for this filter.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'white',
        border: '1.5px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(13,33,87,0.06)',
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr style={{ background: '#0d2157' }}>
              {['Coupon Code', 'Reward', 'Status', 'Expires At'].map(h => (
                <th
                  key={h}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em]"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((coupon, idx) => {
              const isActive = coupon.expiresAt > now;
              const date = new Date(coupon.expiresAt);
              const dateStr = date.toLocaleDateString('en-US', {
                month: 'numeric', day: 'numeric', year: 'numeric'
              });
              const timeStr = date.toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit'
              });

              return (
                <tr
                  key={coupon.id}
                  style={{
                    background: idx % 2 === 0 ? 'white' : '#fafbff',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  {/* Code */}
                  <td className="px-6 py-4">
                    <span
                      className="font-bold tracking-wider text-[14px]"
                      style={{ color: '#0d2157', fontFamily: 'monospace' }}
                    >
                      {coupon.code}
                    </span>
                  </td>

                  {/* Reward */}
                  <td className="px-6 py-4">
                    <span className="font-bold text-[14px]" style={{ color: '#1e293b' }}>
                      {coupon.rewardLabel}
                    </span>
                  </td>

                  {/* Status badge */}
                  <td className="px-6 py-4">
                    <span
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold"
                      style={
                        isActive
                          ? { background: '#16a34a', color: 'white' }
                          : { background: '#c0392b', color: 'white' }
                      }
                    >
                      {isActive ? 'Active' : 'Expired'}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: '#64748b' }}>
                    {dateStr} at {timeStr}
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
