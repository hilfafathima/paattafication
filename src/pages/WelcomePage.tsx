import React from 'react';
import SpecimenMascot from '../components/Common/SpecimenMascot';
import DepartmentStamp from '../components/Common/DepartmentStamp';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface WelcomePageProps {
  onBegin: () => void;
  onOpenDisclaimer: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onBegin, onOpenDisclaimer }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      
      {/* HUD Glass Landing Card */}
      <div className="hud-card p-8 sm:p-12 border border-[#06B6D4]/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] text-center relative overflow-hidden">
        
        {/* Background Watermark */}
        <div className="confidential-watermark font-body">CJP TRIBUTE</div>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-8 pb-4 border-b border-[#334155] font-body text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF2E4D] rounded-full animate-ping"></span>
            <span className="font-bold text-[#FF2E4D] tracking-wider">SPECIAL TRIBUTE ASSESSMENT</span>
          </div>
          <div className="text-slate-300 font-medium">
            DEPT OF COCKROACHES · CJP PROTEST EDITION
          </div>
        </div>

        {/* Brand Display */}
        <div className="my-8">
          <div className="flex justify-center mb-4 relative">
            <div className="absolute inset-0 bg-[#06B6D4]/20 rounded-full blur-xl"></div>
            <SpecimenMascot className="w-28 h-28 relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
          </div>

          <h1 className="font-malayalam text-5xl sm:text-7xl text-[#00F0FF] tracking-wide mb-2 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            പാറ്റഫിക്കേഷൻ
          </h1>

          <div className="font-body text-2xl sm:text-3xl font-extrabold tracking-widest text-slate-100 uppercase mt-1">
            PAATTAFICATION
          </div>

          <div className="font-body text-xs sm:text-sm text-[#06B6D4] font-semibold tracking-wider uppercase mt-2">
            DEPARTMENT OF UNNECESSARY BIOLOGY
          </div>
        </div>

        {/* Dedicated Message Card */}
        <div className="my-10 max-w-2xl mx-auto bg-[#0F172A] border border-[#06B6D4]/40 p-8 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.1)] text-center font-body">
          <h2 className="text-xl sm:text-2xl font-bold text-[#00FF88] leading-relaxed mb-4">
            "jobless??... dont worry its not your mistake... but there must be possibility for you to have cockroach genes in you.."
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Inspired by the CJP (Cockroach Janata Party) protest, we welcome everyone to check their biological compatibility index.
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBegin}
            className="w-full sm:w-auto px-10 py-5 bg-[#06B6D4] hover:bg-[#00F0FF] text-[#090D16] font-body font-bold text-base sm:text-lg rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-3 group transform hover:-translate-y-0.5"
          >
            <span>lets go for a medical test</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={onOpenDisclaimer}
            className="font-body text-xs sm:text-sm text-[#06B6D4] hover:text-[#00F0FF] hover:underline inline-flex items-center gap-1.5 font-medium"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Read Research Disclaimer & Privacy Policy</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-4 border-t border-dashed border-[#334155] font-body text-xs text-slate-400">
          FORM PTF-01 · CJP PROTEST TRIBUTE · DEPARTMENT OF COCKROACHES
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
