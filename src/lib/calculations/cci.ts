import { SubjectRegistration, BehavioralAnswer, TraitScores } from '../../types';

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function calculateTraitsAndCCI(
  subject: SubjectRegistration,
  answers: BehavioralAnswer[]
): { traits: TraitScores; cciScore: number; concernLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' } {
  const statusVal = subject.employmentStatus || subject.status || 'Unemployed';

  // Status weight adjustments
  let statusBonus = 15;
  switch (statusVal) {
    case 'Unemployed': statusBonus = 26; break;
    case 'Professionally Confused': statusBonus = 25; break;
    case 'Student': statusBonus = 22; break;
    case 'Job Hunting': statusBonus = 23; break;
    case 'Self-employed': statusBonus = 18; break;
    case 'Working': statusBonus = 14; break;
    default: statusBonus = 16;
  }

  // Answer values accumulator
  let totalAnswerVal = 0;
  // Each answer option has a weight between 5 and 100
  answers.forEach((ans) => {
    const val = ans.optionValue !== undefined ? ans.optionValue : ((ans as any).weight || 50);
    totalAnswerVal += val;
  });

  const maxPossible = Math.max(answers.length * 100, 100);
  const answerRatio = Math.min(1.0, Math.max(0.0, totalAnswerVal / maxPossible));

  // Seed hash for uniqueness consistency per subject
  const nameStr = subject.name || 'Subject';
  const dobStr = subject.dob || '2000-01-01';
  const hashSeed = stringHash(`${nameStr.toLowerCase()}-${dobStr}-${statusVal}`);
  const hashMod = (hashSeed % 10);

  // Trait calculation (10% to 99%)
  const adaptability = Math.min(99, Math.max(10, Math.round(30 + statusBonus * 0.8 + answerRatio * 40 + (hashSeed % 7))));
  const nightActivity = Math.min(99, Math.max(10, Math.round(25 + answerRatio * 55 + (hashSeed % 9))));
  const deadlineResistance = Math.min(99, Math.max(10, Math.round(30 + statusBonus * 0.9 + answerRatio * 45)));
  const survivalInstinct = Math.min(99, Math.max(10, Math.round(35 + answerRatio * 50 + (hashSeed % 6))));
  const foodOpportunism = Math.min(99, Math.max(10, Math.round(20 + answerRatio * 60 + (hashSeed % 8))));
  const environmentalResilience = Math.min(99, Math.max(10, Math.round(35 + statusBonus * 0.7 + answerRatio * 40)));

  const traits: TraitScores = {
    adaptability,
    nightActivity,
    deadlineResistance,
    survivalInstinct,
    foodOpportunism,
    environmentalResilience
  };

  // Weighted CCI aggregate calculation
  const weightedSum = 
    adaptability * 0.20 +
    nightActivity * 0.20 +
    deadlineResistance * 0.20 +
    survivalInstinct * 0.15 +
    foodOpportunism * 0.12 +
    environmentalResilience * 0.13;

  let cciScore = Number((weightedSum).toFixed(1));
  if (cciScore > 99.9) cciScore = 99.9;
  if (cciScore < 12.5) cciScore = 12.5;

  let concernLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'HIGH';
  if (cciScore < 40) concernLevel = 'LOW';
  else if (cciScore < 65) concernLevel = 'MODERATE';
  else if (cciScore < 85) concernLevel = 'HIGH';
  else concernLevel = 'CRITICAL';

  return {
    traits,
    cciScore,
    concernLevel
  };
}
