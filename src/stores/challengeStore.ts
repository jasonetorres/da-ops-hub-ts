import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChallengeProgress } from '../types/domain';

interface ChallengeStore {
  // Progress
  completedChallenges: ChallengeProgress[];
  addChallengeProgress: (progress: ChallengeProgress) => void;
  setCompletedChallenge: (challengeId: string) => void;

  // Streak
  streak: {
    current: number;
    best: number;
    lastCompletedDate: string;
    totalChallengesCompleted: number;
  };
  updateStreak: (count: number, lastDate: string) => void;

  // Current challenge state
  currentChallengeCode: string;
  setCurrentChallengeCode: (code: string) => void;

  // Check if challenge is completed today
  isChallengeCompletedToday: (challengeId: number) => boolean;
  getTodaysChallengeId: () => number;
}

export const useChallengeStore = create<ChallengeStore>()(
  persist(
    (set, get) => ({
      // Progress
      completedChallenges: [],
      addChallengeProgress: (progress) =>
        set((state) => ({
          completedChallenges: [...state.completedChallenges, progress],
        })),
      setCompletedChallenge: (challengeId: string) =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const newProgress: ChallengeProgress = {
            challengeId,
            completedDate: today,
            solutionCode: '',
          };
          return {
            completedChallenges: [...state.completedChallenges, newProgress],
          };
        }),

      // Streak
      streak: {
        current: 0,
        best: 0,
        lastCompletedDate: new Date().toISOString().split('T')[0],
        totalChallengesCompleted: 0,
      },
      updateStreak: (count, lastDate) =>
        set((state) => ({
          streak: {
            current: count,
            best: Math.max(state.streak.best, count),
            lastCompletedDate: lastDate,
            totalChallengesCompleted: get().completedChallenges.length,
          },
        })),

      // Current challenge code
      currentChallengeCode: '',
      setCurrentChallengeCode: (code) => set({ currentChallengeCode: code }),

      isChallengeCompletedToday: (challengeId: number) => {
        const today = new Date().toISOString().split('T')[0];
        return get().completedChallenges.some(
          (p) => p.challengeId === challengeId.toString() && p.completedDate === today
        );
      },

      // Get today's challenge ID based on day of year (deterministic rotation)
      getTodaysChallengeId: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const dayOfYear = Math.floor(diff / (24 * 60 * 60 * 1000));
        return (dayOfYear % 100) + 1; // 100 challenges rotate
      },
    }),
    {
      name: 'da-ops-hub-challenge',
    }
  )
);
