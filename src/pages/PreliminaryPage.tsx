import React from 'react';
import { SubjectRegistration, BehavioralAnswer } from '../types';
import SpecimenMascot from '../components/Common/SpecimenMascot';
import DepartmentStamp from '../components/Common/DepartmentStamp';
import CompatibilityGauge from '../components/Report/CompatibilityGauge';
import { ArrowRight, AlertTriangle, Cpu, Ruler, Weight, Zap } from 'lucide-react';
import { calculateGravity, calculateVerticalOccupancy } from '../lib/calculations/gravity';
import { calculateTraitsAndCCI } from '../lib/calculations/cci';

interface PreliminaryPageProps {
  subject: SubjectRegistration;
  answers: BehavioralAnswer[];
  onRunFullAnalysis: () => void;
}

export const PreliminaryPage: React.FC<PreliminaryPageProps> = ({
  subject,
  answers,
  onRunFullAnalysis
}) => {
  const { cciScore, concernLevel } = calculateTraitsAndCCI(subject, answers);
  const physics = calculateGravity(subject.massKg);
  const vertical = calculateVerticalOccupancy(subject.heightCm);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="hud-card p-6 sm:p-10 border border-[#06B6D4]/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
        <div className="confidential-watermark">DIAGNOSTIC</div>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#334155] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <SpecimenMascot className="w-10 h-10 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
            <div>
              <h2 className="font-body text-xl sm:text-2xl font-bold text-[#00F0FF]">
                PRELIMINARY DIAGNOSTIC SUMMARY
              </h2>
              <div className="font-body text-xs sm:text-sm text-slate-300">
                TELEMETRY EVALUATION · PTF-PRE-05
              </div>
            </div>
          </div>
          <DepartmentStamp text="PRELIMINARY" variant="gold" className="text-xs" />
        </div>

        <div className="bg-[#0F172A] border border-[#334155] p-4 rounded-xl font-body text-xs sm:text-sm text-center text-slate-200 mb-6 leading-relaxed">
          Initial telemetry analysis has been logged. Run full multi-variable analysis engine to finalize compatibility score and species taxonomy classification.
        </div>

        {/* Real Compatibility Score Gauge */}
        <div className="my-6">
          <CompatibilityGauge
            score={cciScore}
            label="PRELIMINARY COCKROACH COMPATIBILITY SCORE"
            concernLevel={concernLevel}
          />
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 font-body text-xs sm:text-sm">
          {/* Physical Physics Card */}
          <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155] space-y-3.5">
            <div className="font-bold text-sm sm:text-base text-[#00F0FF] border-b border-[#334155] pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00FF88]" />
              <span>GRAVITATIONAL & SPATIAL TELEMETRY</span>
            </div>
            
            <div className="flex justify-between items-center text-slate-200">
              <span className="flex items-center gap-1.5">
                <Weight className="w-4 h-4 text-[#06B6D4]" />
                Gravitational Force ($F = m \cdot g$):
              </span>
              <span className="font-bold text-[#FF2E4D]">{physics.gravitationalForceN} N</span>
            </div>

            <div className="flex justify-between items-center text-slate-200">
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#06B6D4]" />
                Vertical Occupancy Ratio ($H / 170$):
              </span>
              <span className="font-bold text-[#00FF88]">{vertical.occupancyRatio}</span>
            </div>

            <div className="p-3.5 bg-[#1E293B] rounded-lg border border-[#334155] text-slate-300 text-xs sm:text-sm leading-relaxed">
              {physics.interpretation}
            </div>
          </div>

          {/* Behavioral Profile Card */}
          <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155] space-y-3.5">
            <div className="font-bold text-sm sm:text-base text-[#00F0FF] border-b border-[#334155] pb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <span>BEHAVIORAL PROFILE HIGHLIGHTS</span>
            </div>

            <div className="space-y-2 text-slate-200 text-xs sm:text-sm">
              <div>• Questions Completed: <strong className="text-slate-100">{answers.length} / 5</strong></div>
              <div>• Real Compatibility Index: <strong className="text-[#FF2E4D]">{cciScore}%</strong></div>
              <div>• Status Assessment: <strong className="text-[#F59E0B]">{subject.employmentStatus || subject.status || 'Unemployed'}</strong></div>
            </div>

            <div className="p-3.5 bg-[#1E293B] rounded-lg border border-[#334155] text-slate-300 text-xs sm:text-sm leading-relaxed">
              Subject demonstrates strong adaptability patterns and nocturnal activity indicators under evaluation conditions.
            </div>
          </div>
        </div>

        {/* Alert Box */}
        <div className="my-6 bg-[#0F172A] border border-[#F59E0B]/40 p-5 rounded-xl font-body text-xs sm:text-sm text-slate-200 flex items-start gap-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 text-[#F59E0B] mt-0.5" />
          <div>
            <div className="font-bold text-sm sm:text-base text-[#F59E0B] mb-1">ANALYSIS STAGE READY</div>
            <div className="text-slate-300 leading-relaxed">
              Click below to execute the full quantum calculation engines to compute your final Cockroach Compatibility Index (CCI™), taxonomic nomenclature, and senior specialist verdict.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onRunFullAnalysis}
            className="px-9 py-4 bg-[#06B6D4] hover:bg-[#00F0FF] text-[#090D16] font-body font-bold text-sm sm:text-base rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-3 group transform hover:-translate-y-0.5"
          >
            <span>EXECUTE FULL ANALYSIS ENGINES</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreliminaryPage;
