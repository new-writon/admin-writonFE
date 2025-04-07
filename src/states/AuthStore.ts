import { create } from "zustand";

interface AuthStore {
  isReissuing: boolean;
  setIsReissuing: (value: boolean) => void;
  reissuePromise: Promise<any> | null;
  setReissuePromise: (promise: Promise<any> | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isReissuing: false,
  setIsReissuing: (value) => set({ isReissuing: value }),
  reissuePromise: null,
  setReissuePromise: (promise) => set({ reissuePromise: promise }),
}));

export default useAuthStore;
