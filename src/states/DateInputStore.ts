import { create } from "zustand";

interface DateInputStore {
  activeInputId: number;
  setActiveInputId: (id: number) => void;
}

const useDateInputStore = create<DateInputStore>((set) => ({
  activeInputId: 0,
  setActiveInputId: (id: number) => set({ activeInputId: id }),
}));

export default useDateInputStore;
