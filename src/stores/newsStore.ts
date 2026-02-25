import { create } from 'zustand';
import type { NewsArticle } from '../types/ui';

interface NewsStore {
  articles: NewsArticle[];
  setArticles: (articles: NewsArticle[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;

  lastFetched: number;
  setLastFetched: (time: number) => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
  articles: [],
  setArticles: (articles) => set({ articles }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  error: null,
  setError: (error) => set({ error }),

  lastFetched: 0,
  setLastFetched: (time) => set({ lastFetched: time }),
}));
