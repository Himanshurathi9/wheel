import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Coupon } from '../types';
export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkCanSpin = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true); setError(null);
    const { data, error: dbError } = await supabase.from('cafe_users').select('last_spin_at').eq('phone_number', phoneNumber).maybeSingle();
    setIsLoading(false);
    if (dbError) { console.error(dbError); return false; }
    if (!data) return true;
    const hoursSince = (Date.now() - new Date(data.last_spin_at).getTime()) / (1000 * 60 * 60);
    if (hoursSince < 2) {
      const rem = 2 - hoursSince;
      const h = Math.floor(rem), m = Math.ceil((rem - h) * 60);
      setError(`Next spin available in ${h > 0 ? h + 'h ' : ''}${m}m`);
      return false;
    }
    return true;
  };
  const recordSpin = async (phoneNumber: string, coupon: Coupon | null) => {
    await supabase.from('cafe_users').upsert({ phone_number: phoneNumber, last_spin_at: new Date().toISOString() });
    if (coupon) {
      await supabase.from('user_coupons').insert({ phone_number: phoneNumber, reward_label: coupon.rewardLabel, code: coupon.code, expires_at: coupon.expiresAt });
      setCoupons(prev => [coupon, ...prev]);
    }
  };
  const loadUserCoupons = async (phoneNumber: string) => {
    const { data } = await supabase.from('user_coupons').select('*').eq('phone_number', phoneNumber).gt('expires_at', Date.now());
    if (data) setCoupons(data.map(d => ({ id: d.id, prizeId: 'db', rewardLabel: d.reward_label, code: d.code, expiresAt: Number(d.expires_at) })));
  };
  const loadAllCoupons = async () => {
    const { data } = await supabase.from('user_coupons').select('*').order('created_at', { ascending: false });
    if (data) setCoupons(data.map(d => ({ id: d.id, prizeId: 'db', rewardLabel: d.reward_label, code: d.code, expiresAt: Number(d.expires_at) })));
  };
  return { coupons, isLoading, error, checkCanSpin, recordSpin, loadUserCoupons, loadAllCoupons };
};
