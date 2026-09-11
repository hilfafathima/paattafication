import React, { useEffect, useState } from 'react';
import SpecimenMascot from '../Common/SpecimenMascot';
import DepartmentStamp from '../Common/DepartmentStamp';
import { Cpu, CheckCircle2, Zap } from 'lucide-react';

interface ProcessingProps {
  onComplete: () => void;
}

const PIPELINE_STAGES = [
  "Initializing Quantum Biometric Scanner...",
  "Calculating Gravitational Vector Force (F = m × 9.81 N)...",
  "Computing Spatial Occupancy Index (Height / 170 cm)...",
  "Evaluating Behavioral Telemetry & Productivity Cycles...",
  "Running Metabolic & Environmental Adaptability Matrix...",
  "Analyzing Deadline Stress Resistance Coefficient...",
  "Computing Cockroach Compatibility Index (CCI™)...",
  "Querying AI Observation Engine for Assessment Verdict...",
  "Constructing Binomial Taxonomic Classification...",
  "Generating Final Sealed Research Dossier...",
  "Finalizing Classification & Preparing Printout..."
];

export const ScientificPipeline: React.FC<ProcessingProps> = ({ onComplete }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const totalStages = PIPELINE_STAGES.length;
    const intervalTime = 320;

    const timer = setInterval(() => {
      setCurrentStageIdx((prev) => {
        const next = prev + 1;
        if (next >= totalStages) {
          clearInterval(timer);
          setProgress(100);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
        setProgress(Math.round(((next + 1) / totalStages) * 100));
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="hud-card max-w-2xl mx-auto p-8 sm:p-10 border border-[#06B6D4]/40 shadow-[0_0_40px_rgba(6,182,212,0.2)] text-center animate-fade-in my-8">
      <div className="confidential-watermark">PROCESSING</div>

      <div className="flex justify-center mb-4 relative">
        <div className="absolute inset-0 bg-[#06B6D4]/20 rounded-full blur-xl animate-pulse"></div>
        <SpecimenMascot className="w-20 h-20 animate-bounce relative z-10 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
      </div>

      <div className="flex justify-center mb-3">
        <DepartmentStamp text="QUANTUM ENGINE ACTIVE" variant="blue" className="text-xs" />
      </div>

      <h2 className="font-body text-2xl sm:text-3xl font-bold text-[#00F0FF] mb-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
        EXECUTING COMPATIBILITY ANALYSIS
      </h2>
      
      <p className="font-body text-sm sm:text-base text-slate-300 mb-6">
        Calculating Neural & Physical Telemetry Matrix
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-[#0F172A] h-5 rounded-full border border-[#334155] overflow-hidden mb-4 p-1 relative shadow-inner">
        <div
          className="bg-gradient-to-r from-[#06B6D4] via-[#10B981] to-[#00FF88] h-full rounded-full transition-all duration-300 ease-out relative shadow-[0_0_15px_rgba(0,255,136,0.6)]"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm font-body text-slate-300 mb-5 px-1 font-medium">
        <span className="flex items-center gap-2 text-[#00F0FF]">
          <Zap className="w-4 h-4 animate-spin" />
          SYSTEM LOAD: 98.4%
        </span>
        <span className="font-bold text-[#00FF88]">{progress}% COMPLETE</span>
      </div>

      {/* Stage Description */}
      <div className="bg-[#0F172A]/90 border border-[#334155] p-5 rounded-xl min-h-[80px] flex items-center justify-center">
        <div className="font-body text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-3">
          <Cpu className="w-5 h-5 text-[#06B6D4] animate-pulse flex-shrink-0" />
          <span>{PIPELINE_STAGES[currentStageIdx]}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-dashed border-[#334155] font-body text-xs sm:text-sm text-slate-400 flex items-center justify-center gap-2 font-medium">
        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
        D.U.B. HIGH-PERFORMANCE COMPUTING CLUSTER · KERALA
      </div>
    </div>
  );
};

export default ScientificPipeline;
