import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Challenge {
  id: number;
  name: string;
}

interface ChallengeStore {
  challengeId: number;
  challengeList: Challenge[];
  setChallengeId: (id: number) => void;
  setChallengeList: (list: Challenge[]) => void;
  reset: () => void;
}

const initialState = {
  challengeId: 0,
  challengeList: [],
};

const useChallengeStore = create(
  persist<ChallengeStore>(
    (set) => ({
      ...initialState,

      setChallengeId: (id: number) => set({ challengeId: id }),
      setChallengeList: (list: Challenge[]) => set({ challengeList: list }),

      // 초기화 함수
      reset: () => set(initialState),
    }),
    {
      name: "challenge-store",
    }
  )
);

export default useChallengeStore;
