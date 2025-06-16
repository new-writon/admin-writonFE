import { create } from "zustand";

interface AuthStore {
  isTokenHandled: boolean;
  setIsTokenHandled: (value: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isTokenHandled: false,
  setIsTokenHandled: (value) => set({ isTokenHandled: value }),
}));

export default useAuthStore;
