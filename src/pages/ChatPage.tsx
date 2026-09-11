import React from 'react';
import { SubjectRegistration, BehavioralAnswer } from '../types';
import ChatInterface from '../components/Chat/ChatInterface';
import { Activity } from 'lucide-react';

interface ChatPageProps {
  subject: SubjectRegistration;
  onComplete: (answers: BehavioralAnswer[]) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ subject, onComplete }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-in">
      <div className="text-center mb-4 font-typewriter">
        <h2 className="text-xl font-bold text-[#00F0FF] flex items-center justify-center gap-2">
          <Activity className="w-5 h-5 text-[#00FF88] animate-pulse" />
          <span>STAGE 4: NEURAL TELEMETRY INVESTIGATION</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Active Subject: <strong className="text-slate-100">{subject.name}</strong> ({subject.employmentStatus}) · Status: <span className="text-[#FF2E4D] font-bold">UNDER INVESTIGATION</span>
        </p>
      </div>

      <ChatInterface subject={subject} onComplete={onComplete} />
    </div>
  );
};

export default ChatPage;
