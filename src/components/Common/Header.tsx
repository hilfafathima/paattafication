import React from 'react';
import { AppStage } from '../../types';
import SpecimenMascot from './SpecimenMascot';

interface HeaderProps {
  currentStage: AppStage;
  onNavigate?: (stage: AppStage) => void;
}

const STAGE_STEPS: { stage: AppStage; label: string }[] = [
  { stage: 'welcome', label: '1. Overview' },
  { stage: 'intro', label: '2. Premise' },
  { stage: 'register', label: '3. Registration' },
  { stage: 'chat', label: '4. Telemetry' },
  { stage: 'preliminary', label: '5. Diagnostics' },
  { stage: 'full-analysis', label: '6. Analysis' },
  { stage: 'report', label: '7. Final Dossier' }
];

export const Header: React.FC<HeaderProps> = ({ currentStage, onNavigate }) => {
  const activeIndex = STAGE_STEPS.findIndex((s) => s.stage === currentStage);

  return (
    <header className="w-full bg-[#0F172A]/95 backdrop-blur-md border-b border-[#334155] py-4 px-4 sm:px-8 shadow-lg relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <SpecimenMascot className="w-12 h-12 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          <div>
            <h1 className="font-malayalam text-3xl sm:text-4xl text-[#00F0FF] leading-none tracking-wide drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              പാറ്റഫിക്കേഷൻ
            </h1>
            <div className="font-body text-sm text-slate-100 font-bold tracking-wider mt-1">
              PAATTAFICATION
            </div>
            <div className="font-body text-xs text-[#06B6D4] font-semibold tracking-wider uppercase">
              DEPARTMENT OF UNNECESSARY BIOLOGY · BIOMETRIC DIVISION
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex flex-col items-center md:items-end gap-1.5">
          <div className="holo-badge cyan text-xs py-1.5 px-3">
            FORM PTF-01 · REVISION 2026
          </div>
          <div className="font-body text-xs text-slate-300 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            NEURAL TELEMETRY LINKED
          </div>
        </div>
      </div>

      {/* Stage Tracker */}
      <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-[#334155]/60 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] text-xs sm:text-sm font-body">
          {STAGE_STEPS.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            
            return (
              <button
                key={step.stage}
                onClick={() => onNavigate && isCompleted && onNavigate(step.stage)}
                disabled={!isCompleted && !isCurrent}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  isCurrent
                    ? 'bg-[#06B6D4] text-[#090D16] font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                    : isCompleted
                    ? 'text-[#06B6D4] hover:bg-[#1E293B] cursor-pointer border border-[#06B6D4]/30'
                    : 'text-slate-500 cursor-not-allowed border border-transparent'
                }`}
              >
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
