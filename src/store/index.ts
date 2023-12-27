import { create } from "zustand";

interface BearState {
  bears: number;
  menus: any[];
  increase: (step: number) => void;
  setMenus: (data: any[]) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  menus: [],
  setMenus: (data) => set(() => ({ menus: data })),
  increase: (step) => set((state) => ({ bears: state.bears + step })),
}));

export { useBearStore };
