import { create } from 'zustand';
import { APPS } from '../apps/apps';

interface AppZindex {
  biggestZindex: number;
  appZindex: number[];
  updateAppZindex: (appName: string) => void;
}
const useAppZindexStore = create<AppZindex>((set) => ({
  biggestZindex: 3,
  appZindex: APPS.map(() => 0),
  updateAppZindex: (appName: string) => {
    set((state) => ({
      appZindex: [
        ...state.appZindex.map((_, idx) => {
          if (idx === APPS.findIndex((app) => app.name === appName))
            return state.biggestZindex;
          return _;
        }),
      ],
      biggestZindex: state.biggestZindex + 3,
    }));
  },
}));

export default useAppZindexStore;
