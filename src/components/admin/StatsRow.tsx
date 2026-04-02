import React from 'react';
import { Coupon } from '../../types';
import { Ticket, CheckCircle2, Clock } from 'lucide-react';

interface StatsRowProps {
  coupons: Coupon[];
}

export const StatsRow: React.FC<StatsRowProps> = ({ coupons }) => {
  const now = Date.now();
  const activeCount = coupons.filter(c => c.expiresAt > now).length;
  const expiredCount = coupons.length - activeCount;

  const stats = [
    {
      label: 'Total Issued',
      value: coupons.length,
      icon: Ticket,
      iconBg: '#f0f4ff',
      iconColor: '#c0392b',
    },
    {
      label: 'Active Now',
      value: activeCount,
      icon: CheckCircle2,
      iconBg: '#f0fdf4',
      iconColor: '#16a34a',
    },
    {
      label: 'Expired',
      value: expiredCount,
      icon: Clock,
      iconBg: '#fef2f2',
      iconColor: '#c0392b',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">
      {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-2xl px-6 py-5 coupon-card"
          style={{
            background: 'white',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 2px 12px rgba(13,33,87,0.05)',
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: iconBg }}
          >
            <Icon size={26} style={{ color: iconColor }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-1" style={{ color: '#94a3b8' }}>
              {label}
            </p>
            <p className="text-4xl font-bold leading-none" style={{ color: '#0d2157' }}>
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
