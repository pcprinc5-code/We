export enum DiagnosisType {
  KNEE = 'KNEE',
  SHIN = 'SHIN',
  BOTH = 'BOTH'
}

export interface Option {
  id: string;
  text: string;
  pointsTo: DiagnosisType; // Which diagnosis this option leans towards
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface DiagnosisContent {
  title: string;
  description: string;
  technicalDetails: string[];
  recommendation: string;
}

export type AppStep = 'LANDING' | 'QUIZ' | 'ANALYZING' | 'RESULT';