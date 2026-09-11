import React, { useEffect, useState } from 'react';
import { CockroachAnalysisResult } from '../types';
import SpecimenMascot from '../components/Common/SpecimenMascot';
import DepartmentStamp from '../components/Common/DepartmentStamp';
import CompatibilityGauge from '../components/Report/CompatibilityGauge';
import TaxonomyCard from '../components/Report/TaxonomyCard';
import TraitRadar from '../components/Report/TraitRadar';
import EquationDisplay from '../components/Chat/EquationDisplay';
import { generatePDFReport } from '../lib/pdf/pdfBuilder';
import confetti from 'canvas-confetti';
import { Download, Copy, RotateCcw, Check, Sparkles, AlertCircle, FileText, Share2, ShieldCheck, Dna } from 'lucide-react';

interface ReportPageProps {
  result: CockroachAnalysisResult;
  onRestart: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({ result, onRestart }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#00FF88', '#FF2E4D', '#F59E0B']
      });
    } catch (e) {
      // Ignore if confetti fails
    }
  }, []);

  const handleDownloadPDF = () => {
    generatePDFReport(result);
  };

  const handleCopySummary = () => {
    const summaryText = `🪳 PAATTAFICATION RESEARCH DOSSIER #${result.reportNumber} 🪳\nDepartment of Unnecessary Biology\n\nSubject: ${result.subject.name}\nCockroach Compatibility Index: ${result.cciScore}%\nConcern Level: ${result.concernLevel}\nTaxonomic Classification: ${result.taxonomy.fullName} ("${result.taxonomy.commonName}")\n\nFinal Verdict: ${result.finalVerdict}\n\nAssess your compatibility at Paattafication!`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      
      {/* Top Action Bar */}
      <div className="hud-card flex flex-wrap items-center justify-between gap-4 bg-[#0F172A]/95 p-4 sm:p-5 rounded-xl border border-[#06B6D4]/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-body">
        <div>
          <div className="text-xs sm:text-sm text-slate-300 flex items-center gap-2 font-medium">
            <FileText className="w-4 h-4 text-[#06B6D4]" />
            <span>RESEARCH DOSSIER NUMBER</span>
          </div>
          <div className="font-bold text-[#00F0FF] text-base sm:text-lg">#{result.reportNumber}</div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="px-4.5 py-2.5 bg-[#06B6D4] hover:bg-[#00F0FF] text-[#090D16] text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PDF DOSSIER</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="px-4.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] text-[#00FF88] border border-[#10B981]/50 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-[#00FF88]" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'SUMMARY COPIED!' : 'SHARE SUMMARY'}</span>
          </button>

          <button
            onClick={onRestart}
            className="px-4.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all border border-[#334155]"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>NEW EVALUATION</span>
          </button>
        </div>
      </div>

      {/* Main Sealed Dossier */}
      <div className="hud-card p-6 sm:p-12 border border-[#06B6D4]/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative">
        
        {/* Background Watermark */}
        <div className="confidential-watermark">OFFICIAL DOSSIER</div>

        {/* Branding Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-[#334155] pb-6 mb-8 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <SpecimenMascot className="w-16 h-16 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <div>
              <h1 className="font-malayalam text-3xl sm:text-4xl text-[#00F0FF] tracking-wide drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                പാറ്റഫിക്കേഷൻ
              </h1>
              <div className="font-body text-base font-bold text-slate-100 uppercase tracking-widest mt-1">
                PAATTAFICATION
              </div>
              <div className="font-body text-xs sm:text-sm text-[#06B6D4] uppercase tracking-wider font-semibold mt-0.5">
                DEPARTMENT OF UNNECESSARY BIOLOGY · RESEARCH DIVISION
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5 font-body">
            <DepartmentStamp text="FINAL VERDICT" variant="red" subtext="CLASSIFIED" />
            <div className="text-xs text-slate-300 mt-1 font-medium">
              DATE: {new Date(result.timestamp).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Centerpiece Gauge & Taxonomy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 items-center">
          <CompatibilityGauge
            score={result.cciScore}
            concernLevel={result.concernLevel}
          />
          <TaxonomyCard taxonomy={result.taxonomy} />
        </div>

        {/* Section 1: Gravitational & Spatial Telemetry */}
        <div className="my-8 font-body">
          <div className="text-sm sm:text-base font-bold text-[#00F0FF] border-b border-[#334155] pb-2.5 flex items-center justify-between mb-4">
            <span>SECTION I: GRAVITATIONAL & VERTICAL TELEMETRY</span>
            <span className="text-xs text-slate-400 font-medium">$F = m \cdot g$ & Spatial Index</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0F172A] p-4.5 rounded-xl border border-[#334155]">
            <div className="p-3.5 bg-[#1E293B] rounded-lg border border-[#334155]">
              <span className="text-xs text-slate-400 block mb-0.5">Subject Mass:</span>
              <span className="text-sm sm:text-base font-bold text-slate-100">{result.subject.massKg} kg</span>
            </div>

            <div className="p-3.5 bg-[#1E293B] rounded-lg border border-[#334155]">
              <span className="text-xs text-slate-400 block mb-0.5">Gravitational Force:</span>
              <span className="text-sm sm:text-base font-bold text-[#FF2E4D]">{result.physics.gravitationalForceN} N</span>
            </div>

            <div className="p-3.5 bg-[#1E293B] rounded-lg border border-[#334155]">
              <span className="text-xs text-slate-400 block mb-0.5">Vertical Occupancy Ratio:</span>
              <span className="text-sm sm:text-base font-bold text-[#00FF88]">{result.verticalOccupancy.occupancyRatio}</span>
            </div>
          </div>

          <div className="mt-3">
            <EquationDisplay
              title="Physics & Spatial Ratio Analysis"
              formula={result.physics.formula}
              calculation={`Mass ${result.subject.massKg}kg × 9.81 m/s² = ${result.physics.gravitationalForceN}N`}
              result={result.physics.interpretation}
            />
          </div>
        </div>

        {/* Section 2: Trait Profile */}
        <div className="my-8">
          <div className="font-body text-sm sm:text-base font-bold text-[#00F0FF] border-b border-[#334155] pb-2.5 mb-4">
            SECTION II: BEHAVIORAL TRAIT MATRIX
          </div>
          <TraitRadar traits={result.traits} />
        </div>

        {/* Section 3: Simulated Gene Metric */}
        {(() => {
          const geneObj = typeof result.simulatedGeneCompatibility === 'object' && result.simulatedGeneCompatibility !== null
            ? result.simulatedGeneCompatibility
            : {
                percentage: result.cciScore,
                label: 'SIMULATED COCKROACH GENE COMPATIBILITY™',
                disclaimer: 'IMPORTANT DISCLAIMER: This metric is an entertainment estimate generated by the Department of Unnecessary Biology. It does NOT represent actual DNA, genetics, mutation, or health indicators.',
                comedyNote: 'Calculated using behavioral adaptability parameters.'
              };
          return (
            <div className="my-8 bg-[#0F172A] border border-[#06B6D4]/40 p-6 rounded-xl font-body shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <div className="flex items-center justify-between border-b border-[#334155] pb-3 mb-3">
                <div className="flex items-center gap-2.5 text-[#00FF88] font-bold text-sm sm:text-base">
                  <Dna className="w-5 h-5 text-[#00F0FF]" />
                  <span>{geneObj.label || 'SIMULATED GENE COMPATIBILITY METRIC'}</span>
                </div>
                <span className="font-bold text-xl text-[#00F0FF]">{geneObj.percentage}%</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {geneObj.comedyNote || geneObj.disclaimer}
              </p>

              <div className="p-3.5 bg-[#1E293B] rounded-xl border border-[#334155] text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <span>{geneObj.disclaimer}</span>
              </div>
            </div>
          );
        })()}

        {/* Section 4: Specialist Observations */}
        <div className="my-8 font-body">
          <div className="text-sm sm:text-base font-bold text-[#00F0FF] border-b border-[#334155] pb-2.5 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00FF88]" />
            <span>SECTION IV: SENIOR RESEARCH SPECIALIST OBSERVATIONS</span>
          </div>

          <div className="bg-[#0F172A] p-6 rounded-xl border border-[#334155] text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-body space-y-4 shadow-inner">
            {result.departmentalObservations}
          </div>
        </div>

        {/* Section 5: Official Verdict Card */}
        <div className="my-8 bg-[#0F172A] border border-[#FF2E4D]/40 p-6 sm:p-8 rounded-xl font-body text-sm relative shadow-[0_0_25px_rgba(255,46,77,0.15)]">
          <DepartmentStamp text="OFFICIAL VERDICT" variant="red" className="absolute top-5 right-5 text-xs" />

          <div className="font-bold text-base sm:text-lg text-[#FF2E4D] mb-1 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FF2E4D]" />
            <span>FINAL EVALUATION VERDICT</span>
          </div>

          <div className="font-body text-sm sm:text-base text-[#00FF88] font-semibold mb-4 italic">
            "being jobless is not a mistake...dept of coakroaches are proud to welcome you"
          </div>

          <p className="text-base sm:text-lg text-slate-100 leading-relaxed mb-4 font-bold">
            "{result.finalVerdict}"
          </p>

          <div className="p-4 bg-[#1E293B] rounded-xl border border-[#06B6D4]/30 font-bold text-center text-[#00F0FF] text-sm sm:text-base tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            SUBJECT CLASSIFICATION: HIGH ENVIRONMENTAL & RESILIENCE CORRELATION
          </div>

          <div className="text-center text-xs text-slate-400 mt-3.5 font-medium">
            Department of Unnecessary Biology · All Findings Fictional & Satirical
          </div>
        </div>

        {/* Stamps Row */}
        <div className="my-8 flex flex-wrap items-center justify-around gap-4 pt-4 border-t border-dashed border-[#334155]">
          <DepartmentStamp text="D.U.B. APPROVED" variant="blue" subtext="KERALA BUREAU" />
          <DepartmentStamp text="FORM PTF-01" variant="red" subtext="FINAL REVISION" />
          <DepartmentStamp text="VERIFIED SATIRE" variant="gold" subtext="UNCLASSIFIED" />
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 pt-4 border-t border-[#334155] font-body text-xs text-slate-400 text-center leading-relaxed font-medium">
          THIS DOSSIER IS GENERATED FOR SATIRICAL PURPOSES ONLY. NO ACTUAL HUMAN WAS HARMED OR TRANSFORMED. ALL RIGHTS RESERVED · DEPARTMENT OF UNNECESSARY BIOLOGY 2026.
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
