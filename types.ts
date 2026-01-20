
export type StepType = 
  | 'intro' 
  | 'single-select' 
  | 'multi-select' 
  | 'info' 
  | 'inputs' 
  | 'graph-preview'
  | 'loading' 
  | 'sales'
  | 'analysis-success' // New: For Success/BMI/Age screen
  | 'benefits-list';   // New: For "Improvements" screen

export interface Option {
  label: string;
  value: string;
}

export interface QuizStep {
  id: number;
  type: StepType;
  title?: string;
  subtitle?: string; // For extra description text
  image?: string;
  options?: Option[];
  buttonText?: string;
  testimonial?: {
    text: string;
    author: string;
    image?: string;
  };
}

export interface UserData {
  gender: string;
  ageRange: string;
  reasons: string[];
  knowsWhy: string;
  weightCauses: string[];
  struggleDuration: string;
  physicalDiffs: string[];
  lifeImpact: string[];
  badHabits: string[];
  cravings: string[];
  activityLevel: string;
  desiredFeelings: string[];
  height: number;
  currentWeight: number;
  targetWeight: number;
  postWeightAction: string[];
  timeDedication: string;
}
