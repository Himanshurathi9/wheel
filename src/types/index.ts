export interface Prize {
    id: string;
    label: string;
    color: string;
    probability: number;      // 0.0 to 1.0
    validityMinutes: number;  // 0 means no coupon generated
  }
  
  export interface Coupon {
    id: string;
    prizeId: string;
    rewardLabel: string;
    code: string;
    expiresAt: number;        // Unix timestamp
  }