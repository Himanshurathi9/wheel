import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const duration = 3000; // 3 seconds of celebration
  const end = Date.now() + duration;

  // Custom cafe colors: Espresso, Caramel, Mocha, Accent
  const cafeColors = ['#3c2f2f', '#d4a373', '#8b5a2b', '#cd853f'];

  const frame = () => {
    // Shoot from the left edge
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: cafeColors,
    });
    
    // Shoot from the right edge
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: cafeColors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  
  frame();
};