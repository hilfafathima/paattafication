import React from 'react';
import { Cpu } from 'lucide-react';

interface EquationProps {
  title: string;
  formula: string;
  calculation: string;
  result: string;
}

export const EquationDisplay: React.FC<EquationProps> = ({
  title,
  formula,
  calculation,
  result
}) => {
  return (
    <div className="equation-box my-3 text-xs sm:text-sm font-body animate-fade-in border-l-4 border-l-[#00F0FF] bg-[#090D16]/90 border border-[#334155] rounded-r-xl p-4 shadow-inner">
      <div className="flex items-center gap-2 text-[#00F0FF] font-bold mb-2 border-b border-[#334155] pb-1.5">
        <Cpu className="w-4 h-4 text-[#00FF88]" />
        <span>TELEMETRY METRIC: {title}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <div>
          <span className="text-slate-300 font-medium">Formula: </span>
          <code className="font-typewriter font-bold text-[#00FF88] text-xs sm:text-sm">{formula}</code>
        </div>
        <div>
          <span className="text-slate-300 font-medium">Substituted Values: </span>
          <span className="text-slate-100">{calculation}</span>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-dashed border-[#334155] flex items-center justify-between">
        <span className="font-bold text-[#FF2E4D]">COMPUTED VALUE:</span>
        <span className="px-2.5 py-1 bg-[#FF2E4D]/20 border border-[#FF2E4D]/50 text-[#FF2E4D] font-bold rounded-md text-xs sm:text-sm shadow-[0_0_8px_rgba(255,46,77,0.3)]">
          {result}
        </span>
      </div>
    </div>
  );
};

export default EquationDisplay;
