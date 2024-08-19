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
}

const useChallengeStore = create(
  persist<ChallengeStore>(
    (set) => ({
      challengeId: 0,
      challengeList: [],

      setChallengeId: (id: number) => set({ challengeId: id }),
      setChallengeList: (list: Challenge[]) => set({ challengeList: list }),
    }),
    {
      name: "challenge-store",
    }
  )
);

export default useChallengeStore;
