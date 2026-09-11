import React from 'react';
import ScientificPipeline from '../components/Processing/ScientificPipeline';

interface FullAnalysisPageProps {
  onComplete: () => void;
}

export const FullAnalysisPage: React.FC<FullAnalysisPageProps> = ({ onComplete }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <ScientificPipeline onComplete={onComplete} />
    </div>
  );
};

export default FullAnalysisPage;

