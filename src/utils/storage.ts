import { Coupon } from '../types';

const STORAGE_KEY = 'kiar_cafe_coupons';

export const saveCoupons = (coupons: Coupon[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
};

export const loadCoupons = (): Coupon[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse Kiar Cafe coupons', e);
    return [];
  }
};