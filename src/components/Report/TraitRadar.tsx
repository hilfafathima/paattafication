import React from 'react';
import { TraitScores } from '../../types';
import { Activity } from 'lucide-react';

interface TraitBarsProps {
  traits: TraitScores;
}

export const TraitRadar: React.FC<TraitBarsProps> = ({ traits }) => {
  const traitList = [
    { label: 'Environmental Adaptability', value: traits.adaptability, color: '#06B6D4' },
    { label: 'Night Activity Ratio (Late Shift Peak)', value: traits.nightActivity, color: '#FF2E4D' },
    { label: 'Deadline Stress Resistance Vector', value: traits.deadlineResistance, color: '#F59E0B' },
    { label: 'Nutritional / Survival Adaptability', value: traits.survivalInstinct, color: '#10B981' },
    { label: 'Resource Opportunism Index', value: traits.foodOpportunism, color: '#00F0FF' },
    { label: 'Environmental Resilience', value: traits.environmentalResilience, color: '#FF2E4D' }
  ];

  return (
    <div className="hud-card bg-[#0F172A]/90 border border-[#06B6D4]/40 p-6 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] font-body">
      <div className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 border-b border-[#334155] pb-2.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[#00F0FF]">
          <Activity className="w-4 h-4 text-[#00FF88]" />
          BIOMETRIC TRAIT PROFILE (0-100%)
        </span>
        <span className="text-xs text-slate-400 font-medium">REAL-TIME TELEMETRY</span>
      </div>

      <div className="space-y-4">
        {traitList.map((t, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs sm:text-sm mb-1.5 font-medium">
              <span className="text-slate-200">{t.label}</span>
              <span className="font-bold" style={{ color: t.color }}>{t.value}%</span>
            </div>
            <div className="w-full bg-[#1E293B] h-3 rounded-full overflow-hidden border border-[#334155]">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                style={{ width: `${t.value}%`, backgroundColor: t.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraitRadar;
