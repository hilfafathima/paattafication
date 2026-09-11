import React from 'react';

interface GaugeProps {
  score: number;
  label?: string;
  concernLevel?: string;
}

export const CompatibilityGauge: React.FC<GaugeProps> = ({
  score,
  label = "COCKROACH COMPATIBILITY INDEX (CCI™)",
  concernLevel
}) => {
  const clampedScore = Math.min(100, Math.max(0, score));
  const rotationAngle = -90 + (clampedScore / 100) * 180;

  const getConcernBadgeVariant = (level?: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'red';
      case 'HIGH':
        return 'gold';
      case 'MODERATE':
        return 'blue';
      default:
        return 'blue';
    }
  };

  return (
    <div className="hud-card flex flex-col items-center justify-center p-6 sm:p-8 bg-[#0F172A]/95 border border-[#06B6D4]/40 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] text-center relative overflow-hidden">
      <div className="text-xs sm:text-sm font-body font-bold text-slate-300 tracking-wider uppercase mb-2">
        {label}
      </div>

      <div className="relative w-56 h-30 my-2">
        <svg viewBox="0 0 100 55" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FF2E4D" />
            </linearGradient>
            <filter id="glowArc">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="url(#gaugeGradientDark)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#glowArc)"
          />

          <line x1="12" y1="50" x2="16" y2="50" stroke="#00F0FF" strokeWidth="1" />
          <line x1="50" y1="12" x2="50" y2="16" stroke="#F59E0B" strokeWidth="1" />
          <line x1="88" y1="50" x2="84" y2="50" stroke="#FF2E4D" strokeWidth="1" />
        </svg>

        <div
          className="absolute bottom-1 left-1/2 w-1 h-20 bg-[#00F0FF] origin-bottom transition-transform duration-1000 ease-out shadow-[0_0_10px_rgba(0,240,255,0.8)]"
          style={{ transform: `translateX(-50%) rotate(${rotationAngle}deg)`, borderRadius: '2px' }}
        />

        <div className="absolute bottom-1 left-1/2 w-4 h-4 bg-[#FF2E4D] rounded-full -translate-x-1/2 translate-y-1/2 border-2 border-white shadow-[0_0_10px_rgba(255,46,77,0.8)]" />
      </div>

      <div className="font-body text-4xl sm:text-5xl font-black text-[#00F0FF] mt-3 tracking-tight drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
        {score}%
      </div>

      {concernLevel && (
        <div className="mt-3 flex items-center gap-2">
          <span className="font-body text-xs sm:text-sm text-slate-300 font-medium">ASSESSMENT LEVEL:</span>
          <span className={`holo-badge ${getConcernBadgeVariant(concernLevel)} py-1 px-3 text-xs sm:text-sm`}>
            {concernLevel} CONCERN
          </span>
        </div>
      )}
    </div>
  );
};

export default CompatibilityGauge;
