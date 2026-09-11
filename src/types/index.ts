export type EmploymentStatus = 
  | 'Student'
  | 'Unemployed'
  | 'Job Hunting'
  | 'Working'
  | 'Self-employed'
  | 'Professionally Confused'
  | 'Other';

export interface SubjectRegistration {
  name: string;
  heightCm: number;
  massKg: number;
  dob: string; // YYYY-MM-DD
  gender: string;
  employmentStatus: EmploymentStatus;
  status?: EmploymentStatus; // Backward compatibility alias
  consented: boolean;
}

export interface TraitScores {
  adaptability: number;        // 0 - 100
  nightActivity: number;       // 0 - 100
  deadlineResistance: number;  // 0 - 100
  survivalInstinct: number;    // 0 - 100
  foodOpportunism: number;     // 0 - 100
  environmentalResilience: number; // 0 - 100
}

export interface FictionalTaxonomy {
  genus: string;            // e.g. "Periplaneta"
  species: string;          // e.g. "procrastinatus"
  fullName: string;         // e.g. "Periplaneta procrastinatus"
  commonName: string;       // e.g. "THE CAREER-RESISTANT COCKROACH"
  family: string;           // "Blattidae (Departmental Division)"
  habitat: string;          // e.g. "Sub-tropical College Dormitories & Midnight Kitchens"
}

export interface PhysicsAnalysis {
  massKg: number;
  gravitationalForceN: number;
  formula: string;
  interpretation: string;
}

export interface AstronomicalAnalysis {
  birthSeason: string;
  solarContext: string;
  interpretation: string;
}

export interface VerticalOccupancy {
  heightCm: number;
  referenceHeightCm: number;
  occupancyRatio: number;
  interpretation: string;
}

export interface GeneMetric {
  percentage: number;
  label: string;
  disclaimer: string;
  comedyNote: string;
}

export interface CockroachAnalysisResult {
  reportNumber: string;
  timestamp: string;
  subject: SubjectRegistration;
  physics: PhysicsAnalysis;
  verticalOccupancy: VerticalOccupancy;
  astronomy: AstronomicalAnalysis;
  traits: TraitScores;
  cciScore: number;                   // Cockroach Compatibility Index % (0-99.9)
  simulatedGeneCompatibility: GeneMetric; // Gene metric object
  taxonomy: FictionalTaxonomy;
  departmentalObservations: string;
  finalVerdict: string;
  concernLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
}

export interface BehavioralAnswer {
  questionId: string;
  questionText: string;
  selectedOptionText: string;
  optionValue: number;
}

export interface ChatMessage {
  id: string;
  sender: 'department' | 'user';
  text: string;
  timestamp: string;
  equation?: {
    title: string;
    formula: string;
    calculation: string;
    result: string;
  };
  options?: string[];
}

export type AppStage = 
  | 'welcome'
  | 'intro'
  | 'register'
  | 'chat'
  | 'preliminary'
  | 'full-analysis'
  | 'report';
