import React from 'react';

export default function Logo({ size = 28, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="GraceNet Logo"
    >
      <defs>
        <linearGradient id="gnLogoGrad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="45%" stopColor="#6D28D9"/>
          <stop offset="85%" stopColor="#8B5CF6"/>
          <stop offset="100%" stopColor="#F43F5E"/>
        </linearGradient>
        <linearGradient id="gnSparkGrad" x1="16" y1="6" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047"/>
          <stop offset="100%" stopColor="#F43F5E"/>
        </linearGradient>
      </defs>
      {/* Precision Geometric GraceNet G-Wing */}
      <path 
        d="M26 9.5C24.2 6 20.4 4 16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28C22.63 28 27.2 23.2 27.8 17.5H16.5" 
        stroke="url(#gnLogoGrad)" 
        strokeWidth="3.8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Radiant Catalyst Spark in the center */}
      <circle cx="21" cy="11.5" r="2.2" fill="url(#gnSparkGrad)" />
      <path 
        d="M21 7.5V9.5M21 13.5V15.5M17 11.5H19M23 11.5H25" 
        stroke="url(#gnSparkGrad)" 
        strokeWidth="1.4" 
        strokeLinecap="round"
      />
    </svg>
  );
}
