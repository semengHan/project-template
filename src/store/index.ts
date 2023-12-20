import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (step: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  increase: (step) => set((state) => ({ bears: state.bears + step })),
}));

export { useBearStore };
