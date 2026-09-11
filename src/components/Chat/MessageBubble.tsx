import React from 'react';
import { ChatMessage } from '../../types';
import SpecimenMascot from '../Common/SpecimenMascot';
import EquationDisplay from './EquationDisplay';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isDept = message.sender === 'department';

  return (
    <div className={`flex gap-3 my-3 animate-fade-in ${isDept ? 'justify-start' : 'justify-end'}`}>
      {isDept && (
        <div className="flex-shrink-0 mt-1">
          <SpecimenMascot className="w-8 h-8 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[78%] ${
          isDept
            ? 'bg-[#1E293B] text-slate-100 border border-[#06B6D4]/40 rounded-r-xl rounded-bl-xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.3)] font-body'
            : 'bg-[#06B6D4]/20 text-[#00F0FF] border border-[#06B6D4] rounded-l-xl rounded-br-xl p-4 sm:p-5 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-body'
        }`}
      >
        <div
          className={`flex items-center justify-between text-xs font-body mb-2 pb-1.5 border-b ${
            isDept ? 'border-[#334155] text-slate-300' : 'border-[#06B6D4]/40 text-[#00F0FF]/90'
          }`}
        >
          <span className={`font-bold ${isDept ? 'text-[#00F0FF]' : 'text-[#00FF88]'}`}>
            {isDept ? 'D.U.B. OFFICER' : 'SUBJECT'}
          </span>
          <span>{message.timestamp}</span>
        </div>

        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-body">
          {message.text}
        </p>

        {message.equation && (
          <EquationDisplay
            title={message.equation.title}
            formula={message.equation.formula}
            calculation={message.equation.calculation}
            result={message.equation.result}
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
