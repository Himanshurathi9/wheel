// Generates a random, professional-looking code like KIAR-X7B9A
export const generateCouponCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'KIAR-';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // Converts minutes into a future exact Unix timestamp
  export const calculateExpiry = (minutes: number): number => {
    return Date.now() + minutes * 60 * 1000;
  };