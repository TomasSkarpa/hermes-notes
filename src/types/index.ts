export interface Phrase {
  id: number;
  english: string;
  meaning: string;
  example: string;
  level: "B1" | "B2" | "C1";
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface StudyProgress {
  phraseId: number;
  nextReview: string | null; // ISO date string
  interval: number; // days
  easeFactor: number;
  repetitions: number;
  lastReviewed: string | null; // ISO date string
}

export type ReviewQuality = "again" | "hard" | "good" | "easy";

export interface StudySession {
  startTime: string;
  phrasesReviewed: number;
  categoryFilter?: string;
  levelFilter?: "B1" | "B2" | "C1";
}

export interface UserStats {
  totalReviews: number;
  streak: number;
  lastStudyDate: string | null;
  phrasesLearned: number;
  categoriesProgress: Record<string, number>;
}
