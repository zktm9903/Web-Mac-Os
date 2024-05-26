import { create } from 'zustand';

interface Zindex {
  zIndex: number;
  increaseZindex: () => void;
}

export const useZindexStore = create<Zindex>((set) => ({
  zIndex: 0,
  increaseZindex: () => set((state) => ({ zIndex: state.zIndex + 1 })),
}));
