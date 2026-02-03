// ====================
// PREMIUM ANIMATED TECNOT LOGO
// Exact logo design with subtle, elegant animations
// ====================

import React from 'react'

function PremiumLogo({ className = "h-24" }) {
  return (
    <div className={`${className} flex flex-col items-center justify-center py-4 px-6`}>
      {/* Subtle background glow effect */}
      <div className="relative">
        {/* Glow layer */}
        <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-tecnot-primary to-tecnot-accent animate-pulse-slow"></div>
        
        {/* Main Logo SVG */}
        <svg 
          viewBox="0 0 400 120" 
          className="relative z-10 w-full h-full drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Define gradient - exact colors from your logo */}
          <defs>
            {/* Main gradient for text */}
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#5CBDAD', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4A9B8E', stopOpacity: 1 }} />
            </linearGradient>

            {/* Subtle shine effect */}
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: 'rgba(255,255,255,0.3)', stopOpacity: 1 }}>
                <animate 
                  attributeName="offset" 
                  values="0; 1" 
                  dur="3s" 
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 0 }} />
            </linearGradient>

            {/* Very subtle glow filter */}
            <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main Text "Tecnot." - Exact styling from your logo */}
          <text
            x="200"
            y="70"
            fontSize="72"
            fontFamily="'Playfair Display', 'Georgia', serif"
            fontStyle="italic"
            fontWeight="500"
            fill="url(#logoGradient)"
            textAnchor="middle"
            letterSpacing="-2"
            filter="url(#subtleGlow)"
            className="logo-text"
          >
            Tecnot
            
            {/* Smooth fade in */}
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="1.2s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
            />

            {/* Very subtle breathing effect */}
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1 1; 1.005 1.005; 1 1"
              dur="4s"
              additive="sum"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </text>

          {/* The period/dot - Premium subtle pulse */}
          <circle
            cx="338"
            cy="65"
            r="6"
            fill="url(#logoGradient)"
            filter="url(#subtleGlow)"
          >
            {/* Elegant pulse */}
            <animate
              attributeName="opacity"
              values="1; 0.7; 1"
              dur="3s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </circle>

          {/* Shine overlay (very subtle) */}
          <rect
            x="0"
            y="0"
            width="400"
            height="120"
            fill="url(#shineGradient)"
            opacity="0.4"
            pointerEvents="none"
          />
        </svg>
      </div>

      {/* Subtitle */}
      <p 
        className="text-[10px] text-gray-500 mt-3 tracking-[0.2em] uppercase font-light"
        style={{
          animation: 'fadeInUp 1.5s ease-out 0.5s both'
        }}
      >
        AI Clinical Scribe
      </p>

      {/* Custom keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo-text {
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  )
}

export default PremiumLogo