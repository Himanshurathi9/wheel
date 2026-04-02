import { Prize } from '../types';

export const KIAR_PRIZES: Prize[] = [
  { 
    id: 'prize_1', 
    label: 'Free Espresso', 
    color: '#3c2f2f', // Deep Espresso
    probability: 0.1, 
    validityMinutes: 60 
  },
  { 
    id: 'prize_2', 
    label: '10% Off Bill', 
    color: '#8b5a2b', // Mocha
    probability: 0.4, 
    validityMinutes: 120 
  },
  { 
    id: 'prize_3', 
    label: 'Free Cookie', 
    color: '#d4a373', // Caramel
    probability: 0.2, 
    validityMinutes: 60 
  },
  { 
    id: 'prize_4', 
    label: 'Better Luck Next Time', 
    color: '#a0522d', // Sienna
    probability: 0.2, 
    validityMinutes: 0 
  },
  { 
    id: 'prize_5', 
    label: 'Buy 1 Get 1 Coffee', 
    color: '#cd853f', // Peru/Warm Accent
    probability: 0.1, 
    validityMinutes: 1440 // 24 hours
  },
];