// Web/JS/TS DA Role Constants
export const PILLARS = [
  'Productivity ROI',
  'AI + Guardrails',
  'Monorepo Mastery',
  'TypeScript-First',
];

export const PLATFORMS = [
  'Twitter/X',
  'Reddit',
  'YouTube',
  'GitHub',
  'LinkedIn',
  'Discord',
  'Dev.to',
];

export const SIGNAL_SOURCES = [
  'Reddit',
  'Twitter/X',
  'GitHub',
  'YouTrack',
  'Stack Overflow',
  'Discord',
  'Blog Comment',
];

export const COMPETITORS = [
  'VS Code',
  'Cursor',
  'Zed',
  'Windsurf',
  'Neovim',
];

// Colors (JetBrains Theme)
export const COLORS = {
  bg: '#0D1117',
  text: '#E8EDF3',
  blue: '#087CFA',
  green: '#21D789',
  pink: '#FC318C',
  orange: '#FC801D',
};

export const STATUS_COLORS = {
  champion: {
    'Identified': '#FC801D',
    'Contacted': '#087CFA',
    'Engaged': '#21D789',
    'Champion': '#FC318C',
  },
  content: {
    'Idea': '#87CEEB',
    'Drafting': '#FFB6C1',
    'Review': '#FFA500',
    'Scheduled': '#90EE90',
    'Published': '#00CED1',
  },
  signal: {
    'Low': '#008000',
    'Medium': '#FF8C00',
    'High': '#DC143C',
  },
  milestone: {
    'Not Started': '#888888',
    'In Progress': '#FFD700',
    'Completed': '#00AA00',
  },
};

// Navigation Items
export const NAV_ITEMS = [
  // Core Views
  { id: 'overview', icon: '📊', label: 'Overview' },
  { id: 'champions', icon: '🏆', label: 'Champions CRM' },
  { id: 'content', icon: '📝', label: 'Content Pipeline' },
  { id: 'signals', icon: '📡', label: 'Community Signals' },
  { id: 'qa', icon: '❓', label: 'Community Q&A' },
  { id: 'tracker', icon: '🎯', label: '30·60·90 Tracker' },
  { id: 'intel', icon: '⚔️', label: 'Competitive Intel' },
  { id: 'news', icon: '📰', label: 'Dev News' },
  { id: 'challenge', icon: '💡', label: 'Daily Challenge' },
  // Strategic Planning Views
  { id: 'framework', icon: '🎯', label: 'Strategic Framework' },
  { id: 'content-strategy', icon: '📚', label: 'Content Strategy' },
  { id: 'weekly-tasks', icon: '📋', label: 'Weekly Tasks' },
  { id: 'okrs', icon: '🎪', label: 'OKRs' },
  { id: 'documents', icon: '📄', label: 'Documents' },
  { id: 'progress', icon: '📈', label: 'Progress Dashboard' },
  { id: 'tools-resources', icon: '🔗', label: 'Tools & Resources' },
];

// News Sources
export const NEWS_SOURCES = [
  { id: 'hn', label: 'Hacker News', icon: '🔶', color: '#FC801D', bg: 'rgba(252,128,29,0.14)' },
  { id: 'devto', label: 'Dev.to', icon: '🟣', color: '#7B5EA7', bg: 'rgba(123,94,167,0.14)' },
  { id: 'lobsters', label: 'Lobsters', icon: '🦞', color: '#FC318C', bg: 'rgba(252,49,140,0.12)' },
  { id: 'r_prog', label: 'r/programming', icon: '🟠', color: '#FF6314', bg: 'rgba(255,99,20,0.12)' },
  { id: 'r_js', label: 'r/javascript', icon: '🟡', color: '#e8c84a', bg: 'rgba(232,200,74,0.11)' },
  { id: 'r_webdev', label: 'r/webdev', icon: '🌐', color: '#087CFA', bg: 'rgba(8,124,250,0.13)' },
];

// Phase Configuration
export const PHASES = [
  { id: '30-day', label: '30-Day', startDay: 1, endDay: 30 },
  { id: '60-day', label: '60-Day', startDay: 31, endDay: 60 },
  { id: '90-day', label: '90-Day', startDay: 61, endDay: 90 },
];
