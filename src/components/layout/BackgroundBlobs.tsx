import React from 'react';

export const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
      {/* Top right caramel blob */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#d4a373]/20 blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Bottom left mocha blob */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#8b5a2b]/10 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s' }} />
      
      {/* Center accent blob */}
      <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#cd853f]/15 blur-[90px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
    </div>
  );
};