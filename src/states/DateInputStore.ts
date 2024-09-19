import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DateInputStore {
  activeInputId: number;
  setActiveInputId: (id: number) => void;
}

const useDateInputStore = create(
  persist<DateInputStore>(
    (set) => ({
      activeInputId: 0,
      setActiveInputId: (id: number) => set({ activeInputId: id }),
    }),
    {
      name: "date-input-store",
    }
  )
);

export default useDateInputStore;
