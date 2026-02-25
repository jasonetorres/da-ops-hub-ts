// Challenge & Tutorial Types
export interface Test {
  label: string;
  fn: string; // JavaScript code as string to execute
  expected: any;
}

export interface Challenge {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  starter: string;
  solution: string;
  hint: string;
  tests: Test[];
}

export interface Tutorial {
  concept: string;
  why: string;
  apis: string[];
  example: string;
}

// Champions/CRM Types
export type ChampionStatus = 'Identified' | 'Contacted' | 'Engaged' | 'Champion';

export interface Champion {
  id: string;
  name: string;
  handle: string;
  platform: 'Twitter/X' | 'Reddit' | 'YouTube' | 'GitHub' | 'LinkedIn' | 'Discord' | 'Dev.to';
  audience: string;
  contentType: string;
  status: ChampionStatus;
  tags: string[];
  notes: string;
  lastContact: string;
}

// Content Pipeline Types
export type ContentStatus = 'Idea' | 'Drafting' | 'Review' | 'Scheduled' | 'Published';
export type ContentType = 'Blog Post' | 'Video' | 'Tweet' | 'Talk' | 'Podcast' | 'Guide';

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  pillar: string;
  status: ContentStatus;
  dueDate: string;
  notes: string;
}

// Community Signals Types
export type SignalSource = 'Reddit' | 'Twitter/X' | 'GitHub' | 'YouTrack' | 'Stack Overflow' | 'Discord' | 'Blog Comment';
export type SignalPriority = 'Low' | 'Medium' | 'High';
export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export interface Signal {
  id: string;
  source: SignalSource;
  title: string;
  url: string;
  sentiment: Sentiment;
  category: string;
  priority: SignalPriority;
  reportedToProduct: boolean;
  notes: string;
  date: string;
}

// Milestone/Tracker Types
export type MilestoneStatus = 'Not Started' | 'In Progress' | 'Completed';
export type Phase = '30-day' | '60-day' | '90-day';

export interface Milestone {
  id: string;
  phase: Phase;
  title: string;
  status: MilestoneStatus;
  dueDay: number;
  description: string;
}

// Competitive Intelligence Types
export interface Intel {
  id: string;
  competitor: 'VS Code' | 'Cursor' | 'Zed' | 'JetBrains Ecosystem' | 'Neovim' | 'Windsurf';
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
}

// Challenge Progress/Streak Types
export interface ChallengeProgress {
  challengeId: string;
  completedDate: string; // ISO date string
  solutionCode: string;
}

export interface TestResult {
  label: string;
  passed: boolean;
  expected: any;
  actual: any;
}

export interface ChallengeStreak {
  count: number;
  lastCompletedDate: string; // ISO date string
  totalChallengesCompleted: number;
}

// Strategic Planning Types
// ========================

// Strategic Pillars (3 core pillars: Authenticity, Data-Informed, Bridge Builder)
export interface StrategicPillar {
  id: string;
  name: string; // "Authenticity Over Polish", "Data-Informed Advocacy", "Bridge Builder"
  description: string;
  phase: Phase; // '30-day', '60-day', '90-day'
  keyTenets: string[]; // Core beliefs/principles
  relatedOKRs: string[]; // Foreign keys to OKR IDs
  weight: number; // 0-100, priority weighting
  color: string; // For visualization
}

// Content Strategy Pillars (4 pillars: Productivity ROI, AI+Guardrails, Monorepo, TypeScript)
export interface ContentIdea {
  id: string;
  title: string;
  description: string;
  week: number; // 1-4 for 30-day, 5-8 for 60-day, 9-12 for 90-day
  dueDate: string;
  linkedContent?: string; // Foreign key to Content ID
}

export interface ContentPillar {
  id: string;
  name: string; // "Productivity ROI", "AI + Guardrails", "Monorepo Mastery", "TypeScript-First"
  description: string;
  phaseIdeas: Record<Phase, ContentIdea[]>; // Content ideas organized by phase
  targetAudience: string[];
  contentTypes: ContentType[];
  successMetrics: string[];
}

// Weekly Task Breakdown (36 total: 12 weeks × 3 tracks)
export interface WeeklyTask {
  id: string;
  title: string;
  description: string;
  phase: Phase; // '30-day', '60-day', '90-day'
  week: number; // 1-4, 5-8, 9-12
  track: 'Content' | 'Community' | 'Product Bridge';
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate: string;
  linkedContent: string[]; // Foreign keys to Content IDs - auto-sync targets
  linkedChampions: string[]; // Foreign keys to Champion IDs
  linkedSignals: string[]; // Foreign keys to Signal IDs
  notes: string;
}

// OKRs & Key Results
export interface KeyResult {
  id: string;
  description: string;
  target: number;
  current: number;
  unit: string; // 'reach', 'engagement', '%', 'articles', 'champions', 'days', etc.
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface OKR {
  id: string;
  title: string; // Objective
  description: string;
  keyResults: KeyResult[];
  phase: Phase;
  linkedPillars: string[]; // Foreign keys to StrategicPillar IDs
  status: 'Draft' | 'Active' | 'Paused' | 'Completed';
  owner: string; // Champion name or ID
  successMetric: string;
}

// Strategic Documents
export interface StrategicDocument {
  id: string;
  title: string;
  type: 'Plan' | 'Background' | 'Narrative' | 'Framework';
  content: string; // Markdown content
  phase: Phase | 'Overview';
  tags: string[];
  createdDate: string;
  lastUpdated: string;
}
