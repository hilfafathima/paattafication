import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, SubjectRegistration, BehavioralAnswer } from '../../types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SpecimenMascot from '../Common/SpecimenMascot';
import { Radio, ArrowRight, ShieldCheck } from 'lucide-react';

interface ChatInterfaceProps {
  subject: SubjectRegistration;
  onComplete: (answers: BehavioralAnswer[]) => void;
}

const QUESTIONS = [
  {
    id: 'q1',
    question: "Scenario 1: It is 1:45 AM before an impending deadline. What is your operational state?",
    options: [
      { text: "Sleeping peacefully during standard human hours", weight: 5 },
      { text: "Experiencing elevated stress while reviewing materials", weight: 45 },
      { text: "Operating at peak focus with late-night caffeine/food support", weight: 95 },
      { text: "Inactive / Accepting inevitable outcome", weight: 75 }
    ]
  },
  {
    id: 'q2',
    question: "Scenario 2: Ambient lighting is suddenly activated in a dark room. What is your immediate reaction?",
    options: [
      { text: "Blink normally and adapt to the light level", weight: 10 },
      { text: "Experience discomfort and seek shaded areas", weight: 95 },
      { text: "Express verbal dissatisfaction at the disruption", weight: 50 },
      { text: "Remain motionless until environment stabilizes", weight: 80 }
    ]
  },
  {
    id: 'q3',
    question: "Scenario 3: What is your primary nutritional source during high-stress working periods?",
    options: [
      { text: "Balanced home-cooked nutritional meal", weight: 5 },
      { text: "Instant noodles and caffeinated beverages", weight: 90 },
      { text: "Assorted refrigerator leftovers from earlier in the week", weight: 85 },
      { text: "Irregular snack consumption driven by academic stress", weight: 60 }
    ]
  },
  {
    id: 'q4',
    question: "Scenario 4: An unexpected obstacle disrupts your daily routine. How do you adapt?",
    options: [
      { text: "Formulate a systematic resolution strategy", weight: 15 },
      { text: "Navigate around the issue with minimal disruption to yourself", weight: 95 },
      { text: "Delay action until the situation naturally resolves", weight: 85 },
      { text: "Lower operational expectations to handle the disturbance", weight: 70 }
    ]
  },
  {
    id: 'q5',
    question: "Scenario 5: How would you evaluate your environmental resilience under challenging conditions?",
    options: [
      { text: "Low resilience — I require optimal comfort and predictability", weight: 10 },
      { text: "High resilience — Able to function despite minimal sleep and high workload", weight: 95 },
      { text: "Maximum resilience — Functionally adaptable to extreme environments", weight: 100 },
      { text: "Moderate resilience with periodic recovery requirements", weight: 55 }
    ]
  }
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ subject, onComplete }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState<BehavioralAnswer[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      const welcomeMsg: ChatMessage = {
        id: 'welcome-1',
        sender: 'department',
        text: `TELEMETRY SESSION STARTED.\nSubject: "${subject.name}" (${subject.employmentStatus})\nRecorded Parameters: Mass ${subject.massKg} kg · Height ${subject.heightCm} cm.\n\nBeginning behavioral evaluation protocol...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMsg]);
      setIsTyping(false);
      
      sendQuestion(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sendQuestion = (index: number) => {
    if (index >= QUESTIONS.length) {
      finishChat();
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      const q = QUESTIONS[index];
      const qMsg: ChatMessage = {
        id: `q-msg-${index}`,
        sender: 'department',
        text: q.question,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, qMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleOptionSelect = (optionText: string, weight: number) => {
    const currentQ = QUESTIONS[currentQIndex];
    
    const userMsg: ChatMessage = {
      id: `user-msg-${currentQIndex}`,
      sender: 'user',
      text: optionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    
    const newAnswer: BehavioralAnswer = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      selectedOptionText: optionText,
      optionValue: weight
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    setIsTyping(true);
    setTimeout(() => {
      let reactionText = "";
      if (weight >= 90) {
        reactionText = `Observation logged: High compatibility rating registered (${weight}% correlation). Highly adaptable profile detected.`;
      } else if (weight >= 60) {
        reactionText = `Observation logged: Moderate compatibility vector registered (${weight}% correlation).`;
      } else {
        reactionText = `Observation logged: Standard baseline behavior observed (${weight}% correlation).`;
      }

      const reactionMsg: ChatMessage = {
        id: `react-msg-${currentQIndex}`,
        sender: 'department',
        text: reactionText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        equation: currentQIndex === 1 ? {
          title: "Light Avoidance Velocity",
          formula: "v_{escape} = \\sqrt{2gh_{shadow}}",
          calculation: "v = \\sqrt{2 \\cdot 9.81 \\cdot 1.5}",
          result: "5.42 m/s (Reflex Action)"
        } : undefined
      };

      setMessages((prev) => [...prev, reactionMsg]);
      setIsTyping(false);

      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      if (nextIdx < QUESTIONS.length) {
        sendQuestion(nextIdx);
      } else {
        setTimeout(() => {
          onComplete(updatedAnswers);
        }, 1200);
      }
    }, 900);
  };

  const finishChat = () => {
    setIsTyping(true);
    setTimeout(() => {
      const finalMsg: ChatMessage = {
        id: 'final-chat-msg',
        sender: 'department',
        text: "TELEMETRY PROTOCOL COMPLETED. Processing neural analysis matrix...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, finalMsg]);
      setIsTyping(false);

      setTimeout(() => {
        onComplete(answers);
      }, 1000);
    }, 800);
  };

  const currentQ = currentQIndex < QUESTIONS.length ? QUESTIONS[currentQIndex] : null;

  return (
    <div className="chat-container rounded-xl overflow-hidden max-w-3xl mx-auto border border-[#06B6D4]/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col h-[700px]">
      
      {/* Header Bar */}
      <div className="bg-[#0F172A] border-b border-[#334155] p-3.5 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SpecimenMascot className="w-8 h-8 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
          <div>
            <div className="font-body text-sm font-bold text-[#00F0FF]">
              D.U.B. TELEMETRY OFFICER
            </div>
            <div className="text-xs text-[#10B981] font-body flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
              LIVE TELEMETRY SESSION ACTIVE
            </div>
          </div>
        </div>

        <div className="font-body text-xs sm:text-sm font-medium text-slate-200 bg-[#1E293B] border border-[#334155] px-3 py-1.5 rounded-lg">
          QUESTION {Math.min(currentQIndex + 1, 5)} OF 5
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0B0F19]/90 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Options Panel */}
      <div className="p-4 sm:p-5 bg-[#0F172A] border-t border-[#334155]">
        {currentQ && !isTyping ? (
          <div className="space-y-3 animate-fade-in">
            <div className="text-xs sm:text-sm font-body text-[#06B6D4] font-semibold flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#00FF88] animate-pulse" />
              <span>SELECT YOUR RESPONSE:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt.text, opt.weight)}
                  className="p-3.5 bg-[#1E293B] hover:bg-[#06B6D4]/20 text-slate-100 hover:text-[#00F0FF] font-body text-xs sm:text-sm text-left rounded-xl border border-[#334155] hover:border-[#06B6D4] transition-all shadow-sm flex items-start justify-between group transform hover:-translate-y-0.5"
                >
                  <span className="leading-snug pr-2">{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00F0FF] group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center font-body text-xs sm:text-sm text-slate-300 py-3 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981] animate-pulse" />
            <span>PROCESSING TELEMETRY RESPONSE...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
