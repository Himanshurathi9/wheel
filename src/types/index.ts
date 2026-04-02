export interface Prize {
  id: string;
  label: string;
  color: string;
  probability: number;
  validityMinutes: number;
}

export interface Coupon {
  id: string;
  prizeId: string;
  rewardLabel: string;
  code: string;
  expiresAt: number;
}
