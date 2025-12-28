"use client";

import { useState, useEffect } from "react";
import { Phrase, StudyProgress, ReviewQuality, UserStats } from "@/types";

const STORAGE_KEY = "hermes-notes-progress";
const STATS_KEY = "hermes-notes-stats";

// SM-2 Algorithm (simplified spaced repetition)
function calculateNextReview(
  quality: ReviewQuality,
  currentProgress: StudyProgress
): StudyProgress {
  const { interval, easeFactor, repetitions } = currentProgress;

  let newInterval = interval;
  let newEaseFactor = easeFactor;
  let newRepetitions = repetitions;

  // Map quality to numeric value (0-5 scale)
  const qualityMap: Record<ReviewQuality, number> = {
    again: 0,
    hard: 3,
    good: 4,
    easy: 5,
  };

  const q = qualityMap[quality];

  // Calculate new ease factor
  newEaseFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  );

  // Calculate new interval
  if (q < 3) {
    // Failed - reset
    newInterval = 1;
    newRepetitions = 0;
  } else {
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEaseFactor);
    }
    newRepetitions = repetitions + 1;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    ...currentProgress,
    interval: newInterval,
    easeFactor: newEaseFactor,
    repetitions: newRepetitions,
    nextReview: nextReviewDate.toISOString(),
    lastReviewed: new Date().toISOString(),
  };
}

export function useSpacedRepetition(phrases: Phrase[]) {
  const [progress, setProgress] = useState<Record<number, StudyProgress>>({});
  const [stats, setStats] = useState<UserStats>({
    totalReviews: 0,
    streak: 0,
    lastStudyDate: null,
    phrasesLearned: 0,
    categoriesProgress: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      const savedStats = localStorage.getItem(STATS_KEY);

      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }

      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }

      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  // Save stats to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }
  }, [stats, isLoaded]);

  // Initialize progress for a phrase if it doesn't exist
  const getOrCreateProgress = (phraseId: number): StudyProgress => {
    if (progress[phraseId]) {
      return progress[phraseId];
    }

    return {
      phraseId,
      nextReview: null,
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
      lastReviewed: null,
    };
  };

  // Get phrases that are due for review
  const getDueForReview = (
    categoryFilter?: string,
    levelFilter?: "B1" | "B2"
  ): Phrase[] => {
    const now = new Date();

    return phrases.filter((phrase) => {
      // Apply filters
      if (categoryFilter && phrase.category !== categoryFilter) return false;
      if (levelFilter && phrase.level !== levelFilter) return false;

      const phraseProgress = progress[phrase.id];

      // New phrases (never reviewed)
      if (!phraseProgress || phraseProgress.nextReview === null) return true;

      // Due for review
      const nextReview = new Date(phraseProgress.nextReview);
      return nextReview <= now;
    });
  };

  // Record a review
  const recordReview = (
    phraseId: number,
    quality: ReviewQuality,
    category: string
  ) => {
    const currentProgress = getOrCreateProgress(phraseId);
    const newProgress = calculateNextReview(quality, currentProgress);

    setProgress((prev) => ({
      ...prev,
      [phraseId]: newProgress,
    }));

    // Update stats
    setStats((prev: UserStats) => {
      const today = new Date().toISOString().split("T")[0];
      const lastStudy = prev.lastStudyDate
        ? prev.lastStudyDate.split("T")[0]
        : null;

      // Calculate streak
      let newStreak = prev.streak;
      if (lastStudy === today) {
        newStreak = prev.streak; // Same day, keep streak
      } else if (lastStudy) {
        const lastDate = new Date(lastStudy);
        const todayDate = new Date(today);
        const diffDays = Math.floor(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          newStreak = prev.streak + 1; // Consecutive day
        } else {
          newStreak = 1; // Streak broken
        }
      } else {
        newStreak = 1; // First study
      }

      // Update category progress
      const categoryProgress = { ...prev.categoriesProgress };
      categoryProgress[category] = (categoryProgress[category] || 0) + 1;

      return {
        totalReviews: prev.totalReviews + 1,
        streak: newStreak,
        lastStudyDate: new Date().toISOString(),
        phrasesLearned:
          quality !== "again" && newProgress.repetitions === 1
            ? prev.phrasesLearned + 1
            : prev.phrasesLearned,
        categoriesProgress: categoryProgress,
      };
    });
  };

  // Reset all progress (for testing)
  const resetProgress = () => {
    setProgress({});
    setStats({
      totalReviews: 0,
      streak: 0,
      lastStudyDate: null,
      phrasesLearned: 0,
      categoriesProgress: {},
    });
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STATS_KEY);
    }
  };

  return {
    progress,
    stats,
    isLoaded,
    getDueForReview,
    recordReview,
    resetProgress,
    getOrCreateProgress,
  };
}
