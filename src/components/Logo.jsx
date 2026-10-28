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
        <linearGradient id="corvanaVGrad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="55%" stopColor="#6366F1"/>
          <stop offset="100%" stopColor="#7A5CF0"/>
        </linearGradient>
      </defs>
      <path 
        d="M6 7L16 25L26 7" 
        stroke="url(#corvanaVGrad)" 
        strokeWidth="4.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle cx="16" cy="14" r="2.2" fill="#60A5FA" />
    </svg>
  );
}
