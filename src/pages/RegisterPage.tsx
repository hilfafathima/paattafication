import React, { useState } from 'react';
import { SubjectRegistration, EmploymentStatus } from '../types';
import DepartmentStamp from '../components/Common/DepartmentStamp';
import SpecimenMascot from '../components/Common/SpecimenMascot';
import { ArrowRight, AlertCircle, CheckSquare, Square, User, Calendar, Ruler, Weight, Briefcase } from 'lucide-react';

interface RegisterPageProps {
  initialData: SubjectRegistration;
  onSubmit: (data: SubjectRegistration) => void;
}

const EMPLOYMENT_OPTIONS: EmploymentStatus[] = [
  'Student',
  'Unemployed',
  'Job Hunting',
  'Working',
  'Self-employed',
  'Professionally Confused',
  'Other'
];

export const RegisterPage: React.FC<RegisterPageProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<SubjectRegistration>(initialData);
  const [hasConsented, setHasConsented] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof SubjectRegistration, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('Subject Designation/Name is required for registration.');
      return;
    }

    if (formData.heightCm <= 0 || formData.heightCm > 250) {
      setError('Please enter a valid height in centimeters (1 - 250).');
      return;
    }

    if (formData.massKg <= 0 || formData.massKg > 300) {
      setError('Please enter a valid mass in kilograms (1 - 300).');
      return;
    }

    if (!formData.dob) {
      setError('Date of birth is required for astronomical analysis.');
      return;
    }

    if (!hasConsented) {
      setError('You must acknowledge the research consent before proceeding.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="hud-card p-6 sm:p-10 border border-[#06B6D4]/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
        <div className="confidential-watermark">REGISTRATION</div>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#334155] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <SpecimenMascot className="w-10 h-10 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
            <div>
              <h2 className="font-body text-xl sm:text-2xl font-bold text-[#00F0FF]">
                SUBJECT REGISTRATION
              </h2>
              <div className="font-body text-xs sm:text-sm text-slate-300">
                FORM PTF-01 · BIOMETRIC DATA RECORDING
              </div>
            </div>
          </div>
          <DepartmentStamp text="FORM PTF-01" variant="blue" className="text-xs" />
        </div>

        <p className="font-body text-xs sm:text-sm text-slate-200 mb-6 bg-[#0F172A] p-4 rounded-xl border border-[#334155] leading-relaxed">
          Please provide accurate subject parameters. Physical metrics are utilized for calculating gravitational forces ($F = m \cdot g$) and vertical occupancy ratios.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-[#FF2E4D]/10 border border-[#FF2E4D] text-[#FF2E4D] rounded-xl font-body text-sm font-bold flex items-center gap-2.5 shadow-[0_0_15px_rgba(255,46,77,0.2)]">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 font-body text-sm">
          {/* Subject Name */}
          <div>
            <label className="block font-bold text-xs sm:text-sm mb-2 text-slate-200 flex items-center gap-2">
              <User className="w-4 h-4 text-[#06B6D4]" />
              <span>SUBJECT NAME / DESIGNATION:</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Hilfa"
              className="w-full p-3.5 bg-[#0F172A] border border-[#334155] rounded-xl focus:outline-none focus:border-[#00F0FF] text-base text-slate-100 placeholder-slate-500 shadow-inner transition-all"
            />
          </div>

          {/* Physical Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-bold text-xs sm:text-sm mb-2 text-slate-200 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#06B6D4]" />
                <span>HEIGHT (CM):</span>
              </label>
              <input
                type="number"
                value={formData.heightCm || ''}
                onChange={(e) => handleChange('heightCm', parseFloat(e.target.value) || 0)}
                placeholder="e.g. 153"
                className="w-full p-3.5 bg-[#0F172A] border border-[#334155] rounded-xl focus:outline-none focus:border-[#00F0FF] text-base text-slate-100 placeholder-slate-500 shadow-inner transition-all"
              />
              <span className="text-xs text-slate-400 mt-1.5 block">Used for vertical spatial ratio ($H / 170cm$)</span>
            </div>

            <div>
              <label className="block font-bold text-xs sm:text-sm mb-2 text-slate-200 flex items-center gap-2">
                <Weight className="w-4 h-4 text-[#06B6D4]" />
                <span>MASS (KG):</span>
              </label>
              <input
                type="number"
                value={formData.massKg || ''}
                onChange={(e) => handleChange('massKg', parseFloat(e.target.value) || 0)}
                placeholder="e.g. 48"
                className="w-full p-3.5 bg-[#0F172A] border border-[#334155] rounded-xl focus:outline-none focus:border-[#00F0FF] text-base text-slate-100 placeholder-slate-500 shadow-inner transition-all"
              />
              <span className="text-xs text-slate-400 mt-1.5 block">Used for gravitational force ($F = m \cdot g$)</span>
            </div>
          </div>

          {/* DOB & Gender Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-bold text-xs sm:text-sm mb-2 text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#06B6D4]" />
                <span>DATE OF BIRTH:</span>
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                className="w-full p-3.5 bg-[#0F172A] border border-[#334155] rounded-xl focus:outline-none focus:border-[#00F0FF] text-base text-slate-100 shadow-inner transition-all"
              />
            </div>

            <div>
              <label className="block font-bold text-xs sm:text-sm mb-2 text-slate-200">
                GENDER CLASSIFICATION:
              </label>
              <select
                value={formData.gender || 'Female'}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full p-3.5 bg-[#0F172A] border border-[#334155] rounded-xl focus:outline-none focus:border-[#00F0FF] text-base text-slate-100 shadow-inner transition-all"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Employment Status */}
          <div>
            <label className="block font-bold text-xs sm:text-sm mb-2 text-slate-200 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#06B6D4]" />
              <span>EMPLOYMENT / ACADEMIC STATUS:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2">
              {EMPLOYMENT_OPTIONS.map((status) => {
                const isSelected = formData.employmentStatus === status;
                return (
                  <button
                    type="button"
                    key={status}
                    onClick={() => handleChange('employmentStatus', status)}
                    className={`p-3 text-xs sm:text-sm rounded-xl border font-body transition-all duration-200 font-medium ${
                      isSelected
                        ? 'bg-[#06B6D4] text-[#090D16] border-[#00F0FF] font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : 'bg-[#0F172A] text-slate-200 border-[#334155] hover:bg-[#1E293B]'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consent Toggle */}
          <div className="pt-4 border-t border-[#334155]">
            <div
              onClick={() => setHasConsented(!hasConsented)}
              className="flex items-start gap-3.5 cursor-pointer bg-[#0F172A] p-4.5 rounded-xl border border-[#334155] hover:border-[#06B6D4]/50 transition-all"
            >
              {hasConsented ? (
                <CheckSquare className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              )}
              <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                I acknowledge that this session is a satirical simulation and consent to submitting my parameters for biological evaluation.
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-9 py-4 bg-[#06B6D4] hover:bg-[#00F0FF] text-[#090D16] font-body font-bold text-sm sm:text-base rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-3 group"
            >
              <span>BEGIN TELEMETRY SESSION</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
