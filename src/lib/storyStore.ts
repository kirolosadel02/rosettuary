import { create } from "zustand";

export const TOTAL_FRAMES = 226;

interface StoryState {
  progress: number;
  frame: number;
  setProgress: (progress: number) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  progress: 0,
  frame: 0,

  setProgress: (progress) =>
    set({
      progress,
      frame: Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * (TOTAL_FRAMES - 1))
      ),
    }),
}));