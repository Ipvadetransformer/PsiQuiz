
export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  xpReward: number;
  content: string;
  icon: string;
}

export interface UserStats {
  xp: number;
  level: number;
  completedModules: string[];
  badges: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}
