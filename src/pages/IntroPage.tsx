import React from 'react';
import DepartmentStamp from '../components/Common/DepartmentStamp';
import SpecimenMascot from '../components/Common/SpecimenMascot';
import { ArrowRight, History, HelpCircle } from 'lucide-react';

interface IntroPageProps {
  onProceed: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onProceed }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="hud-card p-6 sm:p-10 border border-[#06B6D4]/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
        
        <div className="confidential-watermark">PREMISE</div>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#334155] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <SpecimenMascot className="w-10 h-10 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
            <div>
              <h2 className="font-body text-xl sm:text-2xl font-bold text-[#00F0FF]">
                RESEARCH PREMISE & BACKGROUND
              </h2>
              <div className="font-body text-xs sm:text-sm text-slate-300">
                CLASSIFIED RESEARCH DOSSIER · PTF-DOC-02
              </div>
            </div>
          </div>
          <DepartmentStamp text="FORM PTF-02" variant="blue" className="text-xs" />
        </div>

        {/* Premise Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 font-body text-sm leading-relaxed text-slate-200">
          <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
            <div className="font-bold text-base text-[#FF2E4D] mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#FF2E4D]" />
              <span>THE INVERTED HYPOTHESIS</span>
            </div>
            <p className="mb-3 text-slate-300">
              Traditional entomology focuses on observing insect species from a standard human perspective.
            </p>
            <p className="font-semibold text-[#00FF88]">
              Our methodology reverses this protocol to examine human behavior under high-stress environmental conditions.
            </p>
          </div>

          <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155]">
            <div className="font-bold text-base text-[#06B6D4] mb-2">
              THE CORE ASSESSMENT QUESTION
            </div>
            <p className="mb-3 text-slate-300">
              Rather than analyzing generic species traits, we investigate:
            </p>
            <p className="font-semibold text-[#FF2E4D] italic">
              "To what degree does human lifestyle adaptability mirror insect survival resilience?"
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="my-8 bg-[#0F172A] p-6 sm:p-8 rounded-xl border border-[#334155] font-body">
          <div className="flex items-center gap-2 text-base font-bold text-[#00F0FF] mb-5">
            <History className="w-5 h-5 text-[#00FF88]" />
            <span>RESEARCH DEVELOPMENT TIMELINE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="bg-[#1E293B] p-4 rounded-xl border border-[#334155]">
              <div className="font-bold text-[#06B6D4] text-base">2019</div>
              <div className="font-semibold my-1 text-slate-100">Initial Observation</div>
              <div className="text-xs text-slate-300">Early observations of student nutritional patterns under exam conditions.</div>
            </div>

            <div className="bg-[#1E293B] p-4 rounded-xl border border-[#334155]">
              <div className="font-bold text-[#06B6D4] text-base">2022</div>
              <div className="font-semibold my-1 text-slate-100">Telemetry Mapping</div>
              <div className="text-xs text-slate-300">Detection of late-night productivity spikes and stress resistance cycles.</div>
            </div>

            <div className="bg-[#1E293B] p-4 rounded-xl border border-[#334155]">
              <div className="font-bold text-[#06B6D4] text-base">2024</div>
              <div className="font-semibold my-1 text-slate-100">Department Bureau</div>
              <div className="text-xs text-slate-300">Formally authorized research division established in Kerala.</div>
            </div>

            <div className="bg-[#1E293B] p-4 rounded-xl border border-[#06B6D4] border-l-4 border-l-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <div className="font-bold text-[#00F0FF] text-base">2026</div>
              <div className="font-semibold my-1 text-[#00FF88]">Subject Selected</div>
              <div className="text-xs text-slate-200">Registration initialized for digital biometric assessment.</div>
            </div>
          </div>
        </div>

        <div className="text-center font-body text-xs sm:text-sm text-slate-300 my-6">
          Please proceed to register your subject parameters to begin the evaluation session.
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onProceed}
            className="px-9 py-4 bg-[#06B6D4] hover:bg-[#00F0FF] text-[#090D16] font-body font-bold text-sm sm:text-base rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-3 group"
          >
            <span>PROCEED TO REGISTRATION</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
