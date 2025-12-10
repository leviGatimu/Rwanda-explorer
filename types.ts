export interface Lesson {
  id: string;
  title: string;
  category: 'History' | 'Values' | 'Civics';
  duration: string;
  description: string;
  sections: LessonSection[];
}

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Markdown-like text
  image?: string;
  timelineEvents?: TimelineEvent[];
  videoUrl?: string; // URL for embedded video or placeholder
  mapUrl?: string; // URL for map visualization
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export type QuestionType = 'MCQ' | 'TRUE_FALSE' | 'FILL_BLANK';

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // For MCQ
  correctAnswer: string | number; // Index for MCQ, string for Fill-blank/TF
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  questions: QuizQuestion[];
}

export interface UserProgress {
  badges: string[];
  points: number;
  completedLessons: string[];
  streak: number;
  lastLogin: string; // ISO Date string
  quizScores: Record<string, number>; // Category ID -> High Score
}

export enum Tab {
  HOME = 'HOME',
  LEARN = 'LEARN',
  QUIZ = 'QUIZ',
  AI_TUTOR = 'AI_TUTOR'
}