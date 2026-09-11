import React from 'react';

interface DepartmentStampProps {
  text: string;
  variant?: 'red' | 'blue' | 'gold';
  subtext?: string;
  className?: string;
  rotation?: number;
}

export const DepartmentStamp: React.FC<DepartmentStampProps> = ({
  text,
  variant = 'red',
  subtext,
  className = '',
  rotation = 0
}) => {
  const variantClass = variant === 'blue' ? 'cyan' : variant === 'gold' ? 'amber' : 'red';

  return (
    <div
      className={`holo-badge ${variantClass} ${className} inline-flex flex-col items-center select-none`}
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
    >
      <span className="font-body tracking-wider text-xs sm:text-sm font-semibold">{text}</span>
      {subtext && (
        <span className="text-[11px] font-normal tracking-wide border-t border-current/30 mt-0.5 pt-0.5 opacity-90">
          {subtext}
        </span>
      )}
    </div>
  );
};

export default DepartmentStamp;
