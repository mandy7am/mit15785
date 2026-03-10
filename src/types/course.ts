export interface CourseEvaluation {
  professor: string;
  rating: number; // out of 7 (MIT scale)
  respondents: number;
  highlights: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  description: string;
  timeSlot?: string;
  day?: string;
  isRequired: boolean;
  category?: string;
  semester?: string;
  aiReason?: string;
  evaluation?: CourseEvaluation;
}

export interface CourseBundle {
  id: string;
  name: string;
  description: string;
  courses: Course[];
  matchScore: number;
  targetRole?: string;
}

export interface StudentProfile {
  program: string;
  graduationYear: string;
  careerGoals: string;
  interests: string[];
}

export type AppStep = 'welcome' | 'setup' | 'calendar' | 'explore';
