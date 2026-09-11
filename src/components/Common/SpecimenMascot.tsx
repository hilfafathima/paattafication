import React from 'react';

interface SpecimenMascotProps {
  className?: string;
}

export const SpecimenMascot: React.FC<SpecimenMascotProps> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Holographic Ring */}
      <circle cx="50" cy="50" r="46" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <circle cx="50" cy="50" r="42" stroke="#10B981" strokeWidth="1" opacity="0.4" />

      {/* Cockroach Antennae */}
      <path d="M42 32 Q25 15 15 20" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M58 32 Q75 15 85 20" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />

      {/* Head */}
      <ellipse cx="50" cy="38" rx="9" ry="7" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />

      {/* Glowing Cyber Eyes / Glasses */}
      <rect x="42" y="34" width="7" height="6" rx="1.5" fill="#090D16" stroke="#00F0FF" strokeWidth="1" />
      <rect x="51" y="34" width="7" height="6" rx="1.5" fill="#090D16" stroke="#00F0FF" strokeWidth="1" />
      <line x1="49" y1="37" x2="51" y2="37" stroke="#00F0FF" strokeWidth="1" />

      {/* Body / Shell Segments */}
      <path d="M38 45 Q50 42 62 45 Q66 60 60 76 Q50 82 40 76 Q34 60 38 45 Z" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
      
      {/* Segment Lines */}
      <path d="M39 52 Q50 50 61 52" stroke="#334155" strokeWidth="1" />
      <path d="M38 60 Q50 57 62 60" stroke="#334155" strokeWidth="1" />
      <path d="M40 68 Q50 65 60 68" stroke="#334155" strokeWidth="1" />

      {/* Cybernetic Lab Coat */}
      <path d="M36 48 L28 72 L42 74 L42 50 Z" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.2" />
      <path d="M64 48 L72 72 L58 74 L58 50 Z" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.2" />

      {/* Glowing Neon Tie */}
      <path d="M49 46 L51 46 L52 58 L50 62 L48 58 Z" fill="#FF2E4D" />

      {/* Clipboard */}
      <rect x="62" y="55" width="16" height="22" rx="2" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
      <rect x="65" y="58" width="10" height="16" fill="#090D16" />
      <line x1="67" y1="62" x2="72" y2="62" stroke="#00F0FF" strokeWidth="1" />
      <line x1="67" y1="66" x2="73" y2="66" stroke="#10B981" strokeWidth="1" />
      <line x1="67" y1="70" x2="71" y2="70" stroke="#FF2E4D" strokeWidth="1" />
    </svg>
  );
};

export default SpecimenMascot;
