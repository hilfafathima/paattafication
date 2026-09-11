import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#1E293B] border border-[#06B6D4]/40 rounded-r-xl rounded-bl-xl w-fit max-w-[240px] my-2 animate-fade-in shadow-[0_0_12px_rgba(6,182,212,0.15)]">
      <span className="text-xs sm:text-sm font-body text-[#00F0FF] font-semibold">PROCESSING</span>
      <div className="flex gap-1.5 items-center">
        <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-2 h-2 bg-[#00FF88] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-2 h-2 bg-[#FF2E4D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
