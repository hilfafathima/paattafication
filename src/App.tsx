import React, { useState } from 'react';
import Header from './components/Common/Header';
import DisclaimerModal from './components/Common/DisclaimerModal';
import { useInvestigationState } from './lib/store/useInvestigationStore';
import WelcomePage from './pages/WelcomePage';
import IntroPage from './pages/IntroPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import PreliminaryPage from './pages/PreliminaryPage';
import FullAnalysisPage from './pages/FullAnalysisPage';
import ReportPage from './pages/ReportPage';

export const App: React.FC = () => {
  const {
    stage,
    setStage,
    subject,
    updateSubject,
    answers,
    addAnswer,
    result,
    generateReport,
    resetInvestigation
  } = useInvestigationState();

  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const handleRegisterSubmit = (data: typeof subject) => {
    updateSubject(data);
    setStage('chat');
  };

  const handleChatComplete = (finalAnswers: typeof answers) => {
    finalAnswers.forEach((a) => addAnswer(a));
    setStage('preliminary');
  };

  const handleRunFullAnalysis = async () => {
    setStage('full-analysis');
    // Generate full report in background while dramatic pipeline animates
    await generateReport();
  };

  const handlePipelineFinished = () => {
    setStage('report');
  };

  return (
    <div className="min-h-screen flex flex-col font-body bg-[#0B0F19] text-slate-100 selection:bg-[#06B6D4] selection:text-[#090D16]">
      {/* Dark Command Header */}
      <Header currentStage={stage} onNavigate={setStage} />

      {/* Main Content View Container */}
      <main className="flex-1 pb-16">
        {stage === 'welcome' && (
          <WelcomePage
            onBegin={() => setStage('intro')}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          />
        )}

        {stage === 'intro' && (
          <IntroPage onProceed={() => setStage('register')} />
        )}

        {stage === 'register' && (
          <RegisterPage
            initialData={subject}
            onSubmit={handleRegisterSubmit}
          />
        )}

        {stage === 'chat' && (
          <ChatPage
            subject={subject}
            onComplete={handleChatComplete}
          />
        )}

        {stage === 'preliminary' && (
          <PreliminaryPage
            subject={subject}
            answers={answers}
            onRunFullAnalysis={handleRunFullAnalysis}
          />
        )}

        {stage === 'full-analysis' && (
          <FullAnalysisPage onComplete={handlePipelineFinished} />
        )}

        {stage === 'report' && result && (
          <ReportPage
            result={result}
            onRestart={resetInvestigation}
          />
        )}
      </main>

      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </div>
  );
};

export default App;
