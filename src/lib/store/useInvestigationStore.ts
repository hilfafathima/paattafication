import { useState, useCallback } from 'react';
import { AppStage, SubjectRegistration, BehavioralAnswer, CockroachAnalysisResult, ChatMessage } from '../../types';
import { calculateGravity, calculateVerticalOccupancy } from '../calculations/gravity';
import { calculateBirthSeason } from '../calculations/season';
import { calculateTraitsAndCCI } from '../calculations/cci';
import { calculateGeneCompatibility } from '../calculations/geneCompatibility';
import { generateTaxonomy } from '../calculations/taxonomy';
import { fetchGeminiNarrative } from '../gemini/client';

export const DEFAULT_SUBJECT: SubjectRegistration = {
  name: '',
  heightCm: 0,
  massKg: 0,
  dob: '',
  gender: 'Female',
  employmentStatus: 'Unemployed',
  consented: true
};

export function useInvestigationState() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [subject, setSubject] = useState<SubjectRegistration>(DEFAULT_SUBJECT);
  const [answers, setAnswers] = useState<BehavioralAnswer[]>([]);
  const [result, setResult] = useState<CockroachAnalysisResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');

  const updateSubject = useCallback((updates: Partial<SubjectRegistration>) => {
    setSubject((prev) => ({ ...prev, ...updates }));
  }, []);

  const addAnswer = useCallback((answer: BehavioralAnswer) => {
    setAnswers((prev) => [...prev, answer]);
  }, []);

  const generateReport = useCallback(async (customSubject?: SubjectRegistration, customAnswers?: BehavioralAnswer[]) => {
    const activeSubject = customSubject || subject;
    const activeAnswers = customAnswers || answers;

    setIsAnalyzing(true);

    const physics = calculateGravity(activeSubject.massKg);
    const verticalOccupancy = calculateVerticalOccupancy(activeSubject.heightCm);
    const astronomy = calculateBirthSeason(activeSubject.dob);
    const { traits, cciScore, concernLevel } = calculateTraitsAndCCI(activeSubject, activeAnswers);
    const geneMetric = calculateGeneCompatibility(cciScore);
    const baseTaxonomy = generateTaxonomy(traits, activeSubject.employmentStatus, activeSubject.name);

    // Fetch Gemini or Fallback narrative & AI taxonomy
    const narrative = await fetchGeminiNarrative(
      activeSubject,
      physics,
      astronomy,
      traits,
      baseTaxonomy,
      cciScore,
      apiKey
    );

    const finalTaxonomy = narrative.taxonomy || baseTaxonomy;

    const reportNo = `PTF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const finalResult: CockroachAnalysisResult = {
      reportNumber: reportNo,
      timestamp,
      subject: activeSubject,
      physics,
      verticalOccupancy,
      astronomy,
      traits,
      cciScore,
      simulatedGeneCompatibility: geneMetric,
      taxonomy: finalTaxonomy,
      departmentalObservations: narrative.departmentalObservations,
      finalVerdict: narrative.finalVerdict,
      concernLevel
    };

    setResult(finalResult);
    setIsAnalyzing(false);
    return finalResult;
  }, [subject, answers, apiKey]);

  const resetInvestigation = useCallback(() => {
    setSubject(DEFAULT_SUBJECT);
    setAnswers([]);
    setResult(null);
    setChatMessages([]);
    setStage('welcome');
  }, []);

  return {
    stage,
    setStage,
    subject,
    updateSubject,
    answers,
    addAnswer,
    result,
    chatMessages,
    setChatMessages,
    isAnalyzing,
    generateReport,
    resetInvestigation,
    apiKey,
    setApiKey
  };
}
