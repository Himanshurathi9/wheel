import { useState } from 'react';
import { Prize, Coupon } from '../types';
import { generateCouponCode, calculateExpiry } from '../utils/coupon';

export const useWheel = (prizes: Prize[], onWin: (coupon: Coupon | null) => void) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Calculate winner based on probability
    const random = Math.random();
    let cumulativeProb = 0;
    let winnerIndex = 0;

    for (let i = 0; i < prizes.length; i++) {
      cumulativeProb += prizes[i].probability;
      if (random <= cumulativeProb) {
        winnerIndex = i;
        break;
      }
    }

    const selectedPrize = prizes[winnerIndex];
    const sliceAngle = 360 / prizes.length;
    const extraSpins = 360 * 5; // Spin 5 times for dramatic effect
    
    // Calculate exact degrees to land the winning slice at the top (0 degrees)
    const targetRotation = extraSpins + (360 - (winnerIndex * sliceAngle)) - (sliceAngle / 2);

    setRotation((prev) => prev + targetRotation);

    // Wait for the CSS animation to finish (5000ms)
    setTimeout(() => {
      setIsSpinning(false);

      if (selectedPrize.validityMinutes > 0) {
        const newCoupon: Coupon = {
          id: Math.random().toString(36).substring(2, 9),
          prizeId: selectedPrize.id,
          rewardLabel: selectedPrize.label,
          code: generateCouponCode(),
          expiresAt: calculateExpiry(selectedPrize.validityMinutes),
        };
        onWin(newCoupon);
      } else {
        // "Better luck next time" scenario
        onWin(null); 
      }
    }, 5000); 
  };

  return { isSpinning, rotation, spin };
};