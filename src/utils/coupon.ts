export const generateCouponCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'KIAR-';
  for (let i = 0; i < 5; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
};
export const calculateExpiry = (minutes: number): number => Date.now() + minutes * 60 * 1000;
