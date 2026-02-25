import { create } from 'zustand';

interface AppStore {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  championsFilter: string;
  setChampionsFilter: (filter: string) => void;
  contentFilter: string;
  setContentFilter: (filter: string) => void;
  signalsFilter: string;
  setSignalsFilter: (filter: string) => void;
  newsSource: string;
  setNewsSource: (source: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentTab: 'overview',
  setCurrentTab: (tab) => set({ currentTab: tab }),
  championsFilter: 'all',
  setChampionsFilter: (filter) => set({ championsFilter: filter }),
  contentFilter: 'all',
  setContentFilter: (filter) => set({ contentFilter: filter }),
  signalsFilter: 'all',
  setSignalsFilter: (filter) => set({ signalsFilter: filter }),
  newsSource: 'hackernews',
  setNewsSource: (source) => set({ newsSource: source }),
}));
