import { create } from "zustand";

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

const useChallengeStore = create<ChallengeStore>((set) => ({
  challengeId: 0, // 기본값 설정
  challengeList: [], // 기본값 설정

  setChallengeId: (id: number) => set({ challengeId: id }),
  setChallengeList: (list: Challenge[]) => set({ challengeList: list }),
}));

export default useChallengeStore;
