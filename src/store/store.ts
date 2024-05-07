import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  finalScore: number | null;
  activeQuestionId: number | null;
  setActiveQuestionId: (id: number | null) => void;
  setFinalScore: (score: number) => void;
  resetGame: () => void;
}

export const useStore = create<State>()(
  devtools((set) => ({
    finalScore: null,
    activeQuestionId: null,
    setActiveQuestionId: (id) => set(() => ({ activeQuestionId: id })),
    setFinalScore: (score) => set(() => ({ finalScore: score })),
    resetGame: () => set({ finalScore: null, activeQuestionId: null }),
  })),
);
