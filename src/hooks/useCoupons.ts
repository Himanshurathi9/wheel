import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Coupon } from '../types';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkCanSpin = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    const { data, error: dbError } = await supabase
      .from('cafe_users')
      .select('last_spin_at')
      .eq('phone_number', phoneNumber)
      .maybeSingle();

    setIsLoading(false);

    if (dbError) {
      console.error("DB Error:", dbError);
      return false;
    }

    if (!data) return true; 

    const lastSpin = new Date(data.last_spin_at).getTime();
    const hoursSinceLastSpin = (Date.now() - lastSpin) / (1000 * 60 * 60);

    // LIMIT: 2 HOURS
    if (hoursSinceLastSpin < 2) {
      const remainingTime = 2 - hoursSinceLastSpin;
      const hours = Math.floor(remainingTime);
      const mins = Math.ceil((remainingTime - hours) * 60);
      setError(`Next spin available in ${hours > 0 ? hours + 'h ' : ''}${mins}m`);
      return false; 
    }

    return true; 
  };

  const recordSpin = async (phoneNumber: string, coupon: Coupon | null) => {
    // 1. Update the 2-hour timer
    const { error: userError } = await supabase.from('cafe_users').upsert({ 
      phone_number: phoneNumber, 
      last_spin_at: new Date().toISOString() 
    });

    if (userError) console.error("User Save Error:", userError);

    // 2. Save the coupon if they won
    if (coupon) {
      const { error: couponError } = await supabase.from('user_coupons').insert({
        phone_number: phoneNumber,
        reward_label: coupon.rewardLabel,
        code: coupon.code,
        expires_at: coupon.expiresAt
      });
      
      if (couponError) console.error("Coupon Save Error:", couponError);
      
      // Update local state so it shows up immediately
      setCoupons(prev => [coupon, ...prev]);
    }
  };

  const loadUserCoupons = async (phoneNumber: string) => {
    const { data, error: fetchError } = await supabase
      .from('user_coupons')
      .select('*')
      .eq('phone_number', phoneNumber)
      .gt('expires_at', Date.now()); 

    if (fetchError) {
      console.error("Fetch Error:", fetchError);
      return;
    }

    if (data) {
      setCoupons(data.map(d => ({
        id: d.id,
        prizeId: 'db',
        rewardLabel: d.reward_label,
        code: d.code,
        expiresAt: Number(d.expires_at)
      })));
    }
  };

  const loadAllCoupons = async () => {
    const { data } = await supabase
      .from('user_coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setCoupons(data.map(d => ({
        id: d.id,
        prizeId: 'db',
        rewardLabel: d.reward_label,
        code: d.code,
        expiresAt: Number(d.expires_at)
      })));
    }
  };

  return { coupons, isLoading, error, checkCanSpin, recordSpin, loadUserCoupons, loadAllCoupons };
};