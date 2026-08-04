import React from 'react';

const AnimatedButterfly = ({ className, style }) => {
  return (
    <div className={`animated-butterfly-wrapper ${className || ''}`} style={style}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="butterfly-body">
          {/* Body */}
          <ellipse cx="50" cy="50" rx="3" ry="15" fill="#333" />
          {/* Antennae */}
          <path d="M49 35 Q 45 25 40 20" stroke="#333" strokeWidth="1.5" fill="none" />
          <path d="M51 35 Q 55 25 60 20" stroke="#333" strokeWidth="1.5" fill="none" />
          
          {/* Left Wing Group */}
          <g className="butterfly-wing-left">
            <path d="M48 50 C 30 20 10 30 20 60 C 25 75 40 70 48 50 Z" fill="url(#wingGradient)" stroke="#234E41" strokeWidth="2" opacity="0.9" />
            <path d="M48 55 C 35 70 20 85 30 95 C 40 100 45 80 48 55 Z" fill="url(#wingGradient)" stroke="#234E41" strokeWidth="2" opacity="0.9" />
            <circle cx="25" cy="55" r="3" fill="#fff" opacity="0.6"/>
            <circle cx="33" cy="85" r="2" fill="#fff" opacity="0.6"/>
          </g>
          
          {/* Right Wing Group */}
          <g className="butterfly-wing-right">
            <path d="M52 50 C 70 20 90 30 80 60 C 75 75 60 70 52 50 Z" fill="url(#wingGradient)" stroke="#234E41" strokeWidth="2" opacity="0.9" />
            <path d="M52 55 C 65 70 80 85 70 95 C 60 100 55 80 52 55 Z" fill="url(#wingGradient)" stroke="#234E41" strokeWidth="2" opacity="0.9" />
            <circle cx="75" cy="55" r="3" fill="#fff" opacity="0.6"/>
            <circle cx="67" cy="85" r="2" fill="#fff" opacity="0.6"/>
          </g>
        </g>
        
        <defs>
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7D08A" />
            <stop offset="50%" stopColor="#F9A03F" />
            <stop offset="100%" stopColor="#234E41" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedButterfly;
