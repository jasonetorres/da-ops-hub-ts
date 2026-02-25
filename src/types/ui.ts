// Modal States
export interface ModalState {
  isOpen: boolean;
  mode: 'add' | 'edit';
  data?: any;
}

// Filter States
export interface ChampionFilters {
  status?: string;
  platform?: string;
  searchText?: string;
}

export interface ContentFilters {
  status?: string;
  type?: string;
  pillar?: string;
  searchText?: string;
}

export interface SignalFilters {
  priority?: string;
  source?: string;
  sentiment?: string;
  showReported?: boolean;
  searchText?: string;
}

export interface NewsFilters {
  source?: string;
}

// API Response Types
export interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  kids: number[];
  type: string;
}

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  author: {
    name: string;
    username: string;
  };
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
}

export interface LobstersStory {
  id: string;
  title: string;
  url: string;
  score: number;
  submitter: {
    username: string;
  };
  created_at: string;
  comment_count: number;
  tags: string[];
}

export interface RedditPost {
  id: string;
  title: string;
  url: string;
  score: number;
  author: string;
  created_utc: number;
  num_comments: number;
  subreddit: string;
  selftext: string;
  thumbnail: string;
}

export interface NewsArticle {
  id: string;
  source: 'HN' | 'DevTo' | 'Lobsters' | 'Reddit';
  title: string;
  url: string;
  description?: string;
  author?: string;
  timestamp: number;
  score: number;
  comments: number;
  tags?: string[];
  image?: string;
}
