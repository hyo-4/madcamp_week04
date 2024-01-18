import create from "zustand";

// Define the store using Zustand
interface CountStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Create the store
export const useCountStore = create<CountStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
