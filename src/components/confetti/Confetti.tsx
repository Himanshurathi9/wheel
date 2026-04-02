import confetti from 'canvas-confetti';
export const triggerConfetti = () => {
  const end = Date.now() + 3000;
  const colors = ['#0d2157', '#2352c8', '#c0392b', '#e8ecf8', '#1a3a8f'];
  const frame = () => {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
};
