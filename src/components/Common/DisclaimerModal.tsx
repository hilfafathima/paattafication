import React from 'react';
import { ShieldAlert, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090D16]/85 backdrop-blur-md animate-fade-in">
      <div className="hud-card max-w-lg w-full p-6 sm:p-8 relative border border-[#06B6D4]/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-[#00F0FF] transition-colors p-1.5 rounded-lg hover:bg-[#1E293B]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-[#00F0FF] mb-4">
          <ShieldAlert className="w-6 h-6" />
          <h3 className="font-body font-bold text-lg tracking-wide">RESEARCH DISCLAIMER & PRIVACY POLICY</h3>
        </div>

        <div className="font-body text-sm text-slate-200 space-y-3.5 leading-relaxed border-t border-b border-[#334155] py-4 my-3">
          <p>
            <strong className="text-[#06B6D4]">1. SATIRICAL NATURE:</strong> Paattafication is a fictional biological simulation created for humorous and entertainment purposes.
          </p>
          <p>
            <strong className="text-[#00FF88]">2. SCIENTIFIC CONTEXT:</strong> All mathematical formulas, physical assessments, and taxonomic classifications are satirical constructs and hold no medical accuracy.
          </p>
          <p>
            <strong className="text-[#FF2E4D]">3. SAFETY & WELL-BEING:</strong> The simulation involves no physical testing or physiological changes. All subjects remain 100% human.
          </p>
          <p>
            <strong className="text-[#F59E0B]">4. DATA PRIVACY:</strong> Your inputs remain strictly client-side within your browser session and are never transmitted to external databases.
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#06B6D4] hover:bg-[#00F0FF] text-[#090D16] font-body text-sm font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
