import React from 'react';

export const WheelPointer: React.FC = () => {
  return (
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none" 
      style={{ transform: 'translateY(-10px)' }}
    >
      <div className="relative">
        {/* Glow effect */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-8 h-8"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,215,0,0.6) 0%, transparent 70%)',
            filter: 'blur(3px)',
            top: '-4px'
          }}
        />
        
        {/* Main pointer */}
        <div 
          className="w-8 h-12"
          style={{
            background: 'linear-gradient(to bottom, #FFD700, #FDB931, #FF8C00)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            position: 'relative'
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}
          />
        </div>
        
        {/* Center dot */}
        <div 
          className="absolute left-1/2 w-4 h-4 -translate-x-1/2"
          style={{
            top: '6px',
            background: 'radial-gradient(circle at 30% 30%, #FFD700, #FDB931)',
            borderRadius: '50%',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)'
          }}
        />
      </div>
    </div>
  );
};