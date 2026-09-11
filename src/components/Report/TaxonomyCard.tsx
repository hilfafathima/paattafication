import React from 'react';
import { FictionalTaxonomy } from '../../types';
import SpecimenMascot from '../Common/SpecimenMascot';
import DepartmentStamp from '../Common/DepartmentStamp';
import { Dna } from 'lucide-react';

interface TaxonomyCardProps {
  taxonomy: FictionalTaxonomy;
}

export const TaxonomyCard: React.FC<TaxonomyCardProps> = ({ taxonomy }) => {
  return (
    <div className="hud-card bg-[#0F172A]/90 border border-[#06B6D4]/40 p-6 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] font-body relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#334155] pb-3.5 mb-4">
        <div className="flex items-center gap-3">
          <SpecimenMascot className="w-8 h-8 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
          <div>
            <div className="text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <Dna className="w-4 h-4 text-[#00FF88]" />
              SPECIES TAXONOMY CLASSIFICATION
            </div>
            <div className="text-base font-bold text-[#00F0FF]">{taxonomy.family}</div>
          </div>
        </div>
        <DepartmentStamp text="TAXA RECORD" variant="gold" className="text-xs py-1 px-2.5" />
      </div>

      <div className="space-y-3.5 text-sm">
        <div>
          <span className="text-slate-300 block mb-1 font-medium">Binomial Latin Classification:</span>
          <span className="text-lg sm:text-xl font-bold text-[#00FF88] italic block">
            {taxonomy.fullName}
          </span>
        </div>

        <div>
          <span className="text-slate-300 block mb-1 font-medium">Common Vernacular Designation:</span>
          <span className="text-base font-bold text-[#FF2E4D] block">
            "{taxonomy.commonName}"
          </span>
        </div>

        <div className="bg-[#1E293B] p-3.5 rounded-lg border border-[#334155] text-sm">
          <span className="font-semibold text-[#06B6D4] block mb-1">Identified Natural Habitat:</span>
          <span className="text-slate-200">{taxonomy.habitat}</span>
        </div>
      </div>
    </div>
  );
};

export default TaxonomyCard;
