import { create } from "zustand";

interface AuthStore {
  isReissuing: boolean;
  setIsReissuing: (value: boolean) => void;
  reissuePromise: Promise<any> | null;
  setReissuePromise: (promise: Promise<any> | null) => void;
  isLoggedOut: boolean;
  setIsLoggedOut: (value: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isReissuing: false,
  setIsReissuing: (value) => set({ isReissuing: value }),
  reissuePromise: null,
  setReissuePromise: (promise) => set({ reissuePromise: promise }),
  isLoggedOut: false,
  setIsLoggedOut: (value) => set({ isLoggedOut: value }),
}));

export default useAuthStore;
