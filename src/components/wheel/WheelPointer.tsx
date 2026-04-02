import React from 'react';

export const WheelPointer: React.FC = () => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))'
      }}
    >
      <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 50L0 0H40L20 50Z" fill="#F59E0B" />
        <path d="M20 45L5 5H35L20 45Z" fill="#D97706" />
      </svg>
    </div>
  );
};