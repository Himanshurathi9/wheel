import { useState, useEffect } from 'react';
export const useCountdown = (expiresAt: number) => {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, expiresAt - Date.now()));
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      const newTimeLeft = Math.max(0, expiresAt - Date.now());
      setTimeLeft(newTimeLeft);
      if (newTimeLeft <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, timeLeft]);
  const totalMinutes = Math.floor(timeLeft / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, isExpired: timeLeft <= 0 };
};
