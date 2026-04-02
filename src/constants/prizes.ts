import { Prize } from '../types';
export const KIAR_PRIZES: Prize[] = [
  { id: 'prize_1', label: 'Free Espresso', color: '#c0392b', probability: 0.1, validityMinutes: 60 },
  { id: 'prize_2', label: '10% Off Bill', color: '#1a3a8f', probability: 0.4, validityMinutes: 120 },
  { id: 'prize_3', label: 'Free Cookie', color: '#e8ecf8', probability: 0.2, validityMinutes: 60 },
  { id: 'prize_4', label: 'Better Luck Next Time', color: '#2352c8', probability: 0.2, validityMinutes: 0 },
  { id: 'prize_5', label: 'Buy 1 Get 1 Coffee', color: '#e74c3c', probability: 0.1, validityMinutes: 1440 },
];
