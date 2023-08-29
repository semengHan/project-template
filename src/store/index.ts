import { create } from "zustand";

interface BearState {
  bears: number;
  increase: () => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

export { useBearStore };
