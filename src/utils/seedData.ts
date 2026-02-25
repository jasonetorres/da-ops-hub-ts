import type {
  Champion,
  Content,
  Signal,
  Milestone,
  Intel,
  Challenge,
  Tutorial,
  StrategicPillar,
  ContentPillar,
  WeeklyTask,
  OKR,
  StrategicDocument,
} from '../types/domain';

// Seed Champions
export const SEED_CHAMPIONS: Champion[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    handle: '@sarahcodes',
    platform: 'Twitter/X',
    audience: 'Frontend developers (25K followers)',
    contentType: 'Tutorial videos',
    status: 'Champion',
    tags: ['React', 'TypeScript', 'Frontend'],
    notes: 'Advocates for modern dev tooling, active in TypeScript community',
    lastContact: '2026-02-20',
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    handle: 'alex_dev_blog',
    platform: 'Dev.to',
    audience: 'Full-stack developers (15K followers)',
    contentType: 'Blog posts',
    status: 'Engaged',
    tags: ['TypeScript', 'Backend', 'DevOps'],
    notes: 'Strong influence in Monorepo space, growing audience',
    lastContact: '2026-02-18',
  },
];

// Seed Content
export const SEED_CONTENT: Content[] = [
  {
    id: '1',
    title: 'TypeScript Tips for WebStorm Users',
    type: 'Blog Post',
    pillar: 'TypeScript-First',
    status: 'Drafting',
    dueDate: '2026-03-15',
    notes: 'Focus on type guards and advanced generics',
  },
  {
    id: '2',
    title: 'Monorepo Management with Turborepo',
    type: 'Video',
    pillar: 'Monorepo Mastery',
    status: 'Review',
    dueDate: '2026-03-10',
    notes: 'Collaboration with engineering team',
  },
];

// Seed Signals
export const SEED_SIGNALS: Signal[] = [
  {
    id: '1',
    source: 'Reddit',
    title: 'Discussion: Best IDE for TypeScript in 2026',
    url: 'https://reddit.com/r/typescript',
    sentiment: 'Positive',
    category: 'IDE comparison',
    priority: 'High',
    reportedToProduct: false,
    notes: 'WebStorm mentioned multiple times positively',
    date: '2026-02-23',
  },
];

// Seed Milestones
export const SEED_MILESTONES: Milestone[] = [
  // 30-Day
  { id: '1', phase: '30-day', title: 'Build champion network', status: 'In Progress', dueDay: 10, description: 'Identify and contact 10 key developers' },
  { id: '2', phase: '30-day', title: 'Content pipeline setup', status: 'Completed', dueDay: 15, description: 'Establish publishing cadence' },
  { id: '3', phase: '30-day', title: 'First published piece', status: 'In Progress', dueDay: 25, description: 'Blog post or video launch' },
  // 60-Day
  { id: '4', phase: '60-day', title: 'Community engagement', status: 'Not Started', dueDay: 35, description: 'Engage in 5+ community discussions' },
  { id: '5', phase: '60-day', title: 'Expand content library', status: 'Not Started', dueDay: 50, description: 'Publish 3 more pieces' },
  // 90-Day
  { id: '6', phase: '90-day', title: 'Thought leadership', status: 'Not Started', dueDay: 70, description: 'Speaking opportunity or major publication' },
];

// Seed Intel - Comprehensive Competitive Battlecards
export const SEED_INTEL: Intel[] = [
  {
    id: '1',
    competitor: 'VS Code',
    strengths: [
      'Dominant market share (70%+ adoption)',
      'Massive extension ecosystem (50K+ extensions)',
      'Free and lightweight (fast startup)',
      'Excellent git integration',
      'Strong debugging capabilities',
      'Cross-platform consistency',
      'Huge community support and tutorials',
      'VSCode Insiders early feature access',
    ],
    weaknesses: [
      'Weak refactoring tools for complex projects',
      'Inferior code intelligence vs IDEs',
      'Poor performance on massive codebases',
      'Limited built-in DB tools',
      'No integrated terminal profiling',
      'Requires extensive configuration',
      'IntelliSense slower with large projects',
      'No native project structure visualization',
    ],
    opportunities: [
      'Enterprise features (security, compliance)',
      'Full IDE capabilities for large teams',
      'Superior TypeScript support',
      'Purpose-built monorepo tools',
      'Advanced refactoring engine',
      'Native profiling and debugging',
      'Team collaboration features',
      'First-class DevOps integrations',
    ],
  },
  {
    id: '2',
    competitor: 'Cursor',
    strengths: [
      'AI-first architecture built in',
      'Smooth, modern UX',
      'Fast code generation with Claude AI',
      'Cmd+K for quick edits',
      'Chat interface for coding questions',
      'PR integration',
      'Growing developer adoption (hype cycle)',
      'Good for rapid prototyping',
    ],
    weaknesses: [
      'Closed source (privacy concerns)',
      'Expensive subscription ($20/month)',
      'Limited free tier',
      'No offline functionality',
      'Vendor lock-in risk',
      'Small ecosystem compared to VS Code',
      'AI-focused, less IDE features',
      'Limited enterprise support',
      'Overkill for many dev workflows',
      'Privacy questions with AI data usage',
    ],
    opportunities: [
      'Open source alternative positioning',
      'Enterprise AI features with data privacy',
      'Integrated AI + professional IDE tools',
      'Better code intelligence than AI-only editors',
      'Team collaboration + AI assistant',
      'Privacy-first approach vs Cursor',
      'Offline AI capabilities',
      'Superior refactoring with AI assistance',
    ],
  },
  {
    id: '3',
    competitor: 'Zed',
    strengths: [
      'Blazingly fast performance',
      'Built in Rust (memory safe)',
      'Collaborative editing built-in',
      'Modern, clean UI',
      'Fast code navigation',
      'Terminal integration',
      'Language server support',
      'GPU-accelerated rendering',
    ],
    weaknesses: [
      'Very young project (adoption risk)',
      'Small extension ecosystem',
      'Limited language support',
      'Missing features (debugging, profiling)',
      'Smaller community than VS Code',
      'No AI integration yet',
      'Limited enterprise features',
      'Unknown long-term viability',
      'MacOS/Linux only (no Windows)',
      'Steep learning curve for VS Code users',
    ],
    opportunities: [
      'Production-ready IDE with speed',
      'AI + collaborative editing combo',
      'Enterprise features with performance',
      'Windows support expansion',
      'Plugin ecosystem development',
      'Advanced debugging and profiling',
      'Superior team coding experience',
      'Performance-first positioning',
      'Developer advocate partnership program',
    ],
  },
  {
    id: '4',
    competitor: 'JetBrains Ecosystem',
    strengths: [
      'Purpose-built IDEs for each language',
      'Superior code intelligence (IntelliSense)',
      'Advanced refactoring tools',
      'Enterprise deployment options',
      'Unified licensing across products',
      'Professional support',
      'Database and DevOps tools',
      'Offline functionality',
      'Security and compliance features',
      'Largest enterprise market share',
    ],
    weaknesses: [
      'Higher cost (~$250/year)',
      'Resource heavy (RAM usage)',
      'Slower startup time',
      'Steeper learning curve',
      'Can feel bloated for simple projects',
      'Less hip than VS Code in startups',
      'Larger disk footprint',
      'Takes time to configure',
    ],
    opportunities: [
      'AI integration in WebStorm',
      'Lightweight IDE variant for VS Code users',
      'Free tier for open source',
      'Improved startup performance',
      'Cloud IDE (JetBrains Space)',
      'Better collaboration tools',
      'Mobile code review capabilities',
      'Team/Enterprise features',
    ],
  },
];

// Sample Challenges (First 10) - Rest would be loaded from external file or generated
export const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Sum Array',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Sum all numbers in an array.',
    starter: 'function sum(arr) {\n  // Your code here\n}',
    solution: 'function sum(arr) {\n  return arr.reduce((a, b) => a + b, 0);\n}',
    hint: 'Use reduce() to accumulate values',
    tests: [
      { label: 'sum([1,2,3])', fn: 'sum([1,2,3])', expected: 6 },
      { label: 'sum([])', fn: 'sum([])', expected: 0 },
    ],
  },
  {
    id: 2,
    title: 'Reverse String',
    difficulty: 'Easy',
    category: 'Strings',
    description: 'Reverse a string.',
    starter: 'function reverse(str) {\n  // Your code here\n}',
    solution: 'function reverse(str) {\n  return str.split(\'\').reverse().join(\'\');\n}',
    hint: 'Split, reverse, and join',
    tests: [
      { label: 'reverse("hello")', fn: 'reverse("hello")', expected: 'olleh' },
    ],
  },
  {
    id: 3,
    title: 'Find Maximum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Find the maximum value in an array.',
    starter: 'function findMax(arr) {\n  // Your code here\n}',
    solution: 'function findMax(arr) {\n  return Math.max(...arr);\n}',
    hint: 'Use Math.max with spread operator',
    tests: [
      { label: 'findMax([1,5,3,9,2])', fn: 'findMax([1,5,3,9,2])', expected: 9 },
    ],
  },
];

// Sample Tutorials
export const SAMPLE_TUTORIALS: Record<number, Tutorial> = {
  1: {
    concept: 'Array.reduce accumulates values into a single result by applying a function iteratively.',
    why: 'Essential for aggregations, totals, transformations - common in data processing.',
    apis: ['arr.reduce((acc, val) => ...)', 'reduce(callback, initialValue)'],
    example: '[1,2,3].reduce((sum, n) => sum + n, 0) // 6',
  },
  2: {
    concept: 'String methods: split() breaks string into array, reverse() flips order, join() recombines.',
    why: 'Core string manipulation patterns used across all applications.',
    apis: ['str.split()', 'arr.reverse()', 'arr.join()'],
    example: '"hello".split("").reverse().join("") // "olleh"',
  },
  3: {
    concept: 'Math.max() finds largest number. Spread operator (...) unpacks array as arguments.',
    why: 'Common for comparing values, finding extremes in datasets.',
    apis: ['Math.max(...arr)', 'spread operator'],
    example: 'Math.max(1, 5, 3, 9, 2) // 9',
  },
};

// ==========================================
// STRATEGIC PLANNING SEED DATA
// ==========================================

// Strategic Framework: 3 Core Pillars
export const SEED_STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    id: 'sp-1',
    name: 'Authenticity Over Polish',
    description: 'Developers detect BS instantly. Show up as a peer, not a spokesperson.',
    phase: '30-day',
    keyTenets: [
      'Use WebStorm as primary IDE from Day 1 — genuinely, not performatively',
      'Share real findings in community: "here\'s what I discovered"',
      'Acknowledge rough edges honestly — developers respect candor',
      'Represent JetBrains like a great engineer: genuinely enthusiastic, honest about limitations',
      'Every piece of content must pass the "would I write this if I weren\'t being paid?" test',
    ],
    relatedOKRs: ['okr-1', 'okr-2', 'okr-3'],
    weight: 35,
    color: '#087CFA',
  },
  {
    id: 'sp-2',
    name: 'Data-Informed Advocacy',
    description: 'Every content decision and product feedback backed by evidence from real developer conversations.',
    phase: '30-day',
    keyTenets: [
      'Community sentiment is primary research — Reddit, YouTrack, Discord are gold',
      '47 Reddit comments + 12 YouTrack upvotes > 1 intuition',
      'Weekly synthesis of community sentiment, delivered internally and externally',
      'Content ideas come from what developers are actually asking about, not what I think they should care about',
      'Product feedback submission must include evidence: reproduction steps, frequency data, developer context',
    ],
    relatedOKRs: ['okr-4', 'okr-5'],
    weight: 30,
    color: '#FC801D',
  },
  {
    id: 'sp-3',
    name: 'Bridge Builder (Both Directions)',
    description: 'Translate product to developers and developers to product. Make the feedback loop work.',
    phase: '30-day',
    keyTenets: [
      'Product team needs to hear developer frustrations + reproduction steps + context, not just complaints',
      'Developers need to understand what\'s coming and why — roadmap context builds buy-in',
      'Champion program creates 10 community voices with direct access to product feedback',
      'Weekly sync with product managers ensures I\'m not creating content about ancient features',
      'Structured feedback submission (not just Slack messages) makes impact measurable',
    ],
    relatedOKRs: ['okr-5', 'okr-6'],
    weight: 35,
    color: '#FC318C',
  },
];

// Content Strategy: 4 Content Pillars
export const SEED_CONTENT_PILLARS: ContentPillar[] = [
  {
    id: 'cp-1',
    name: 'Productivity ROI',
    description: '"WebStorm pays for itself in the first week of serious use."',
    phaseIdeas: {
      '30-day': [
        {
          id: 'ci-1-1',
          title: '5 WebStorm features that would have saved me 3 hours last sprint',
          description: 'Blog post: real examples of refactoring, debugging, AI assistant saving time',
          week: 3,
          dueDate: '2026-03-08',
        },
        {
          id: 'ci-1-2',
          title: 'Debugging async React with WebStorm',
          description: 'Tutorial: breakpoints, step-through debugging, async/await inspection',
          week: 4,
          dueDate: '2026-03-15',
        },
      ],
      '60-day': [
        {
          id: 'ci-1-3',
          title: 'Refactoring a 50-file React app in 4 seconds',
          description: 'Video demo: safe refactoring at scale, rename across imports, type-aware changes',
          week: 6,
          dueDate: '2026-03-29',
        },
        {
          id: 'ci-1-4',
          title: 'REST Client as Postman replacement',
          description: 'Guide: built-in HTTP client, request history, environment variables',
          week: 7,
          dueDate: '2026-04-05',
        },
      ],
      '90-day': [
        {
          id: 'ci-1-5',
          title: 'WebStorm ROI calculator: hours saved this quarter',
          description: 'Interactive tool: estimate productivity gains based on team size and workflow',
          week: 10,
          dueDate: '2026-04-26',
        },
      ],
    },
    targetAudience: ['React developers', 'TypeScript users', 'Node.js teams', 'Full-stack developers'],
    contentTypes: ['Blog Post', 'Video', 'Tweet', 'Guide'],
    successMetrics: ['2K reach', '15% engagement rate', '10+ shares in dev communities'],
  },
  {
    id: 'cp-2',
    name: 'AI + IDE Guardrails',
    description: '"AI coding is only as good as its guardrails. WebStorm provides the guardrails."',
    phaseIdeas: {
      '30-day': [
        {
          id: 'ci-2-1',
          title: 'How WebStorm catches what AI assistants miss',
          description: 'Blog: static analysis catches type errors, undefined variables, framework anti-patterns that Cursor lets through',
          week: 3,
          dueDate: '2026-03-08',
        },
      ],
      '60-day': [
        {
          id: 'ci-2-2',
          title: 'Cursor vs. WebStorm+Junie: a real-world test',
          description: 'Article: same task in both IDEs, comparison of code quality, safety, refactoring speed',
          week: 6,
          dueDate: '2026-03-29',
        },
        {
          id: 'ci-2-3',
          title: 'Setting up local AI models (Ollama) with WebStorm',
          description: 'Tutorial: privacy-first AI coding, keep your code local, enterprise-safe',
          week: 7,
          dueDate: '2026-04-05',
        },
      ],
      '90-day': [
        {
          id: 'ci-2-4',
          title: 'The future of AI in IDEs: guardrails > speed',
          description: 'Thought piece: why IDE+AI is more powerful than AI-native editors',
          week: 11,
          dueDate: '2026-05-03',
        },
      ],
    },
    targetAudience: ['Enterprise teams', 'Security-conscious developers', 'AI enthusiasts', 'DevSecOps teams'],
    contentTypes: ['Blog Post', 'Video', 'Comparison', 'Guide'],
    successMetrics: ['Enterprise audience reach', '20% engagement', 'Product team enthusiasm'],
  },
  {
    id: 'cp-3',
    name: 'Monorepo Mastery',
    description: '"The IDE built for how real enterprise teams ship JavaScript."',
    phaseIdeas: {
      '30-day': [],
      '60-day': [
        {
          id: 'ci-3-1',
          title: 'Nx + WebStorm: setup guide for teams',
          description: 'Step-by-step: path aliases, workspace support, navigation across packages',
          week: 5,
          dueDate: '2026-03-22',
        },
        {
          id: 'ci-3-2',
          title: 'Cross-package debugging in monorepos',
          description: 'Tutorial: debug across 50+ packages without context switching',
          week: 7,
          dueDate: '2026-04-05',
        },
      ],
      '90-day': [
        {
          id: 'ci-3-3',
          title: 'Turborepo + WebStorm workflows',
          description: 'Advanced guide: build graph visualization, dependency management',
          week: 10,
          dueDate: '2026-04-26',
        },
      ],
    },
    targetAudience: ['Enterprise teams', 'Monorepo maintainers', 'Full-stack teams', 'Large code bases'],
    contentTypes: ['Blog Post', 'Video', 'Guide', 'Case Study'],
    successMetrics: ['100+ GitHub stars on repo', 'Used in 50+ monorepos', 'Team adoption metrics'],
  },
  {
    id: 'cp-4',
    name: 'TypeScript-First Development',
    description: '"TypeScript adoption is rising because of AI. WebStorm was built for TypeScript."',
    phaseIdeas: {
      '30-day': [
        {
          id: 'ci-4-1',
          title: 'TypeScript migration guide: from JS to TS',
          description: 'Blog: step-by-step, WebStorm features that make migration easy',
          week: 2,
          dueDate: '2026-03-01',
        },
      ],
      '60-day': [
        {
          id: 'ci-4-2',
          title: 'Types make your AI assistant smarter',
          description: 'Article: how TypeScript helps Cursor, Junie, GitHub Copilot generate better code',
          week: 6,
          dueDate: '2026-03-29',
        },
        {
          id: 'ci-4-3',
          title: 'React + TypeScript deep-dive',
          description: 'Tutorial: component props, hooks, generics, WebStorm IntelliSense advantages',
          week: 8,
          dueDate: '2026-04-12',
        },
      ],
      '90-day': [
        {
          id: 'ci-4-4',
          title: 'Node.js + TypeScript best practices',
          description: 'Guide: monorepo setup, type-safe APIs, WebStorm debugging',
          week: 9,
          dueDate: '2026-04-19',
        },
      ],
    },
    targetAudience: ['TypeScript adopters', 'React developers', 'Node.js teams', 'Type-safe advocates'],
    contentTypes: ['Blog Post', 'Video', 'Guide', 'Deep-Dive'],
    successMetrics: ['5K reach', 'High time-on-page', 'Community shares'],
  },
];

// Weekly Tasks (36 total: 12 weeks × 3 tracks)
export const SEED_WEEKLY_TASKS: WeeklyTask[] = [
  // 30-Day Phase: Weeks 1-4
  {
    id: 'task-1-1',
    title: 'Product deep-dive: All major features',
    description: 'Work through refactoring, debugger, AI Assistant, monorepo support. Document pain points as potential content.',
    phase: '30-day',
    week: 1,
    track: 'Content',
    status: 'Completed',
    dueDate: '2026-02-07',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Focus on learning the product as a user, not as an advocate yet.',
  },
  {
    id: 'task-1-2',
    title: 'Internal relationship building (1-on-1s)',
    description: 'Meet with DevRel, product, engineering, marketing. Understand roadmap, positioning, gaps.',
    phase: '30-day',
    week: 1,
    track: 'Product Bridge',
    status: 'In Progress',
    dueDate: '2026-02-07',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Set up recurring syncs, especially with product team.',
  },
  {
    id: 'task-1-3',
    title: 'Document knowledge: internal strategy review',
    description: 'Read positioning docs, past campaigns, product roadmap, existing advocacy programs.',
    phase: '30-day',
    week: 1,
    track: 'Content',
    status: 'In Progress',
    dueDate: '2026-02-07',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Build context before creating content.',
  },
  {
    id: 'task-2-1',
    title: 'Community audit: Reddit + Twitter sentiment',
    description: 'Search WebStorm mentions in r/webdev, r/javascript, r/typescript, r/reactjs over last 12 months. Track sentiment, objections, opportunities.',
    phase: '30-day',
    week: 2,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-02-14',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Focus on finding the real developer voice, not marketing noise.',
  },
  {
    id: 'task-2-2',
    title: 'Competitive analysis: Cursor, VS Code, Zed',
    description: 'Review what advocates are publishing, identify narrative gaps, document developer objections.',
    phase: '30-day',
    week: 2,
    track: 'Content',
    status: 'Pending',
    dueDate: '2026-02-14',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Where can WebStorm own the narrative?',
  },
  {
    id: 'task-3-1',
    title: 'Identify 20 influential developers + map their reach',
    description: 'Find the most influential WebStorm advocates on Reddit, Twitter/X, YouTube, Dev.to, Discord. Note audience size, content type, alignment.',
    phase: '30-day',
    week: 3,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-02-21',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'This becomes the champion recruitment list.',
  },
  {
    id: 'task-3-2',
    title: 'Publish first blog post',
    description: 'Technical deep-dive on WebStorm feature (refactoring, debugging, AI, etc.). Show up as a developer who uses it daily.',
    phase: '30-day',
    week: 3,
    track: 'Content',
    status: 'Pending',
    dueDate: '2026-02-21',
    linkedContent: ['1'],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'First piece sets the tone: technical, peer-to-peer, authentic.',
  },
  {
    id: 'task-4-1',
    title: 'Produce first YouTube tutorial',
    description: 'Higher production value than blog. Optimized for search. Show WebStorm solving a real problem.',
    phase: '30-day',
    week: 4,
    track: 'Content',
    status: 'Pending',
    dueDate: '2026-02-28',
    linkedContent: ['2'],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Screen recording + voice over, good lighting, clear audio.',
  },
  {
    id: 'task-4-2',
    title: 'Submit conference talk abstract',
    description: 'Target React Conf, VueConf, JSConf, or local JavaScript meetup. Talk angle: something only a WebStorm power user could give.',
    phase: '30-day',
    week: 4,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-02-28',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Deadline: typically 2-3 months ahead of event.',
  },

  // 60-Day Phase: Weeks 5-8
  {
    id: 'task-5-1',
    title: 'Daily community presence: Reddit/Twitter/Discord',
    description: 'Spend 30 mins daily in dev communities. Engage authentically (not promoting). Answer questions, share insights.',
    phase: '60-day',
    week: 5,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-03-07',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Build presence, not mentions. Show up when it\'s hard, not just with news.',
  },
  {
    id: 'task-5-2',
    title: 'Deliver first community insights report',
    description: '3 developer pain points with Reddit/YouTrack evidence. Reproduction context. Frequency data.',
    phase: '60-day',
    week: 5,
    track: 'Product Bridge',
    status: 'Pending',
    dueDate: '2026-03-07',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: ['1'],
    notes: 'Make product feedback credible with data, not just intuition.',
  },
  {
    id: 'task-6-1',
    title: 'Personal outreach to first 5 champion candidates',
    description: 'Genuine conversation, not a pitch. Share what you\'re building. Ask for their input.',
    phase: '60-day',
    week: 6,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-03-14',
    linkedContent: [],
    linkedChampions: ['1', '2'],
    linkedSignals: [],
    notes: 'Relationship building > recruitment. Authenticity matters.',
  },
  {
    id: 'task-6-2',
    title: 'Publish content piece 2 (blog or video)',
    description: 'Second content from strategy pillars. Shows publishing cadence.',
    phase: '60-day',
    week: 6,
    track: 'Content',
    status: 'Pending',
    dueDate: '2026-03-14',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Maintain momentum. Establish weekly/bi-weekly rhythm.',
  },
  {
    id: 'task-7-1',
    title: 'Draft Champion Program proposal',
    description: 'Internal proposal: criteria, benefits, responsibilities, expected reach, budget. Ready for leadership review.',
    phase: '60-day',
    week: 7,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-03-21',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Foundation for scaling beyond individual advocates.',
  },
  {
    id: 'task-8-1',
    title: 'Attend/participate in 1 major dev event',
    description: 'Meetup, conference, online summit. Participate as attendee first, observe community.',
    phase: '60-day',
    week: 8,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-03-28',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Immersion > broadcast.',
  },

  // 90-Day Phase: Weeks 9-12
  {
    id: 'task-9-1',
    title: 'Launch 3-part content series',
    description: 'Serialized content that brings people back. Example: "WebStorm Mastery" or "AI + WebStorm for Real Teams".',
    phase: '90-day',
    week: 9,
    track: 'Content',
    status: 'Pending',
    dueDate: '2026-04-05',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Series > individual pieces for building audience.',
  },
  {
    id: 'task-10-1',
    title: 'Deliver first conference/meetup talk',
    description: 'WebStorm represented at developer conference or major meetup. Recording available for repurposing.',
    phase: '90-day',
    week: 10,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-04-12',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Credibility moment. Become the WebStorm voice.',
  },
  {
    id: 'task-10-2',
    title: 'Formally launch Champion Program',
    description: '5+ initial champions onboarded. Benefits delivered. First champion content published.',
    phase: '90-day',
    week: 10,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-04-12',
    linkedContent: [],
    linkedChampions: ['1', '2'],
    linkedSignals: [],
    notes: 'Foundation that scales beyond one DA.',
  },
  {
    id: 'task-11-1',
    title: 'Publish community spotlight (developer interview)',
    description: 'Feature a champion or influential developer. Share their story, WebStorm usage, learnings.',
    phase: '90-day',
    week: 11,
    track: 'Content',
    status: 'Pending',
    dueDate: '2026-04-19',
    linkedContent: [],
    linkedChampions: ['1'],
    linkedSignals: [],
    notes: 'Amplifies community voices, not just company message.',
  },
  {
    id: 'task-12-1',
    title: 'Synthesize 90-day learnings + propose OKRs',
    description: 'What worked, what didn\'t. Strategic recommendations for next 90 days. Full-year advocacy roadmap.',
    phase: '90-day',
    week: 12,
    track: 'Product Bridge',
    status: 'Pending',
    dueDate: '2026-04-26',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Set the foundation for year 1 success.',
  },
  {
    id: 'task-12-2',
    title: 'Establish partnerships with 2 framework communities',
    description: 'e.g., Reactiflux Discord, Vue Land. Become a trusted voice in framework-specific spaces.',
    phase: '90-day',
    week: 12,
    track: 'Community',
    status: 'Pending',
    dueDate: '2026-04-26',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Frame-specific advocacy > generic developer outreach.',
  },
];

// OKRs (8 OKRs across 30/60/90 phases)
export const SEED_OKRS: OKR[] = [
  {
    id: 'okr-1',
    title: 'Establish authentic content presence',
    description: 'Get WebStorm voice published, visible, and trusted in developer communities',
    keyResults: [
      {
        id: 'kr-1-1',
        description: 'Publish 2 blog posts on blog.jetbrains.com/webstorm (by Day 60)',
        target: 2,
        current: 0,
        unit: 'articles',
        status: 'Not Started',
      },
      {
        id: 'kr-1-2',
        description: 'Produce 1 YouTube tutorial (by Day 60)',
        target: 1,
        current: 0,
        unit: 'videos',
        status: 'Not Started',
      },
      {
        id: 'kr-1-3',
        description: 'Achieve 20% engagement increase on published content (by Day 90)',
        target: 20,
        current: 0,
        unit: '%',
        status: 'Not Started',
      },
    ],
    phase: '60-day',
    linkedPillars: ['sp-1'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'Content published, tracked, and shifting community perception measurably',
  },
  {
    id: 'okr-2',
    title: 'Build developer community voice',
    description: 'Establish presence and credibility in developer communities',
    keyResults: [
      {
        id: 'kr-2-1',
        description: 'Submit 1 conference talk (by Day 60)',
        target: 1,
        current: 0,
        unit: 'talks',
        status: 'Not Started',
      },
      {
        id: 'kr-2-2',
        description: 'Deliver 1 talk at conference or major meetup (by Day 90)',
        target: 1,
        current: 0,
        unit: 'events',
        status: 'Not Started',
      },
      {
        id: 'kr-2-3',
        description: 'Daily presence in 3 developer communities (Reddit, Twitter, Discord)',
        target: 5,
        current: 0,
        unit: 'days/week',
        status: 'Not Started',
      },
    ],
    phase: '60-day',
    linkedPillars: ['sp-3'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'WebStorm becomes known as part of the developer conversation',
  },
  {
    id: 'okr-3',
    title: 'Launch Champion Program',
    description: 'Create scalable community advocate foundation',
    keyResults: [
      {
        id: 'kr-3-1',
        description: 'Identify + outreach to 20 influential developers (by Day 30)',
        target: 20,
        current: 0,
        unit: 'developers',
        status: 'Not Started',
      },
      {
        id: 'kr-3-2',
        description: 'Onboard 5+ champions with benefits (by Day 90)',
        target: 5,
        current: 0,
        unit: 'champions',
        status: 'Not Started',
      },
      {
        id: 'kr-3-3',
        description: 'First champion content published (by Day 90)',
        target: 1,
        current: 0,
        unit: 'pieces',
        status: 'Not Started',
      },
    ],
    phase: '90-day',
    linkedPillars: ['sp-3'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'Advocates become extensions of DA efforts',
  },
  {
    id: 'okr-4',
    title: 'Establish product feedback pipeline',
    description: 'Turn community signals into actionable product insights',
    keyResults: [
      {
        id: 'kr-4-1',
        description: 'Document 10 developer pain points with evidence (by Day 60)',
        target: 10,
        current: 0,
        unit: 'pain points',
        status: 'Not Started',
      },
      {
        id: 'kr-4-2',
        description: 'Deliver monthly community insights report (starting Day 30)',
        target: 3,
        current: 0,
        unit: 'reports',
        status: 'Not Started',
      },
      {
        id: 'kr-4-3',
        description: 'Weekly sync with product team established',
        target: 4,
        current: 0,
        unit: 'syncs',
        status: 'Not Started',
      },
    ],
    phase: '60-day',
    linkedPillars: ['sp-2'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'Product team shifts prioritization based on community signals',
  },
  {
    id: 'okr-5',
    title: 'Execute content calendar across 4 pillars',
    description: 'Operationalize content strategy with consistent output',
    keyResults: [
      {
        id: 'kr-5-1',
        description: 'Publish 1 piece from "Productivity ROI" pillar (by Day 90)',
        target: 1,
        current: 0,
        unit: 'pieces',
        status: 'Not Started',
      },
      {
        id: 'kr-5-2',
        description: 'Publish 1 piece from "AI + Guardrails" pillar (by Day 90)',
        target: 1,
        current: 0,
        unit: 'pieces',
        status: 'Not Started',
      },
      {
        id: 'kr-5-3',
        description: 'Establish bi-weekly publishing cadence',
        target: 6,
        current: 0,
        unit: 'pieces',
        status: 'Not Started',
      },
    ],
    phase: '90-day',
    linkedPillars: ['sp-1', 'sp-2'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'Content pillars become recognizable narratives in community',
  },
  {
    id: 'okr-6',
    title: 'Position WebStorm vs. AI-native editors',
    description: 'Own the "IDE + AI guardrails" narrative',
    keyResults: [
      {
        id: 'kr-6-1',
        description: 'Publish "AI + IDE guardrails" comparison content (by Day 90)',
        target: 2,
        current: 0,
        unit: 'pieces',
        status: 'Not Started',
      },
      {
        id: 'kr-6-2',
        description: 'Reach 10K+ developers with AI positioning (by Day 90)',
        target: 10000,
        current: 0,
        unit: 'reach',
        status: 'Not Started',
      },
      {
        id: 'kr-6-3',
        description: '20%+ engagement on AI-related content',
        target: 20,
        current: 0,
        unit: '%',
        status: 'Not Started',
      },
    ],
    phase: '90-day',
    linkedPillars: ['sp-2'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'Developers understand WebStorm\'s advantage vs. Cursor/Windsurf',
  },
];

// Strategic Documents
export const SEED_DOCUMENTS: StrategicDocument[] = [
  {
    id: 'doc-1',
    title: '30·60·90 Day Game Plan - WebStorm Developer Advocate',
    type: 'Plan',
    content: `# 30·60·90 Day Game Plan

## The Premise
WebStorm is the most productive JavaScript IDE ever built. My job, starting Day 1, is to make sure every JavaScript developer knows it — and to build the community, content, and programs that prove it.

## 30 Days: Listen, Learn & Land
**Week 1-2:** Internal Onboarding & Immersion
- Product deep-dive: Set WebStorm as primary IDE, work through every major feature
- Internal relationship building: 1-on-1s with DevRel, product, engineering, marketing
- Documentation & knowledge absorption: Read strategy docs, positioning, past campaigns

**Week 3-4:** External Listening & Mapping
- Community audit: Reddit, Twitter, Stack Overflow, Discord, GitHub
- Competitive intelligence: Cursor, VS Code, Zed positioning and narratives
- Identify 20 influential developers for champion recruitment

## 60 Days: Build & Begin
**Week 5-6:** Content & Community Launches
- Publish first blog post: Technical deep-dive, peer-to-peer tone
- Produce first YouTube tutorial: Higher production value, SEO optimized
- Personal outreach to 5 champion candidates: Genuine conversations, not pitches

**Week 7-8:** Active Community Presence
- Daily presence in developer communities: Reddit, Twitter, Discord
- Submit conference talk abstract
- Draft Champion Program proposal

## 90 Days: Impact & Scale
**Week 9-10:** Content Series & Speaking
- Launch 3-part content series: "WebStorm Mastery" or "AI + WebStorm for Real Teams"
- Deliver first conference/meetup talk
- Formally launch Champion Program (5+ champions)

**Week 11-12:** Strategic Planning & Partnerships
- Publish community spotlight (developer interview)
- Establish 2 framework community partnerships
- Synthesize learnings, propose OKRs for next 90 days

## Success Metrics
- Content: 2/month blog posts, 1/month videos by Day 90
- Community: 30% ↑ mentions/shares, 5 champions launched
- Product Bridge: 10+ pain points documented, monthly reports
- Overall: Measurable shift in community perception of WebStorm`,
    phase: 'Overview',
    tags: ['strategy', 'framework', '30-60-90', 'plan'],
    createdDate: '2026-02-01',
    lastUpdated: '2026-02-25',
  },
  {
    id: 'doc-2',
    title: 'Strategic Pillars: Authenticity, Data-Informed, Bridge Builder',
    type: 'Framework',
    content: `# Three Strategic Pillars

## 1. Authenticity Over Polish
Developers are the most marketing-resistant audience. Show up as a developer first.

- Use WebStorm as primary IDE from Day 1 — genuinely, not performatively
- Share real findings: "Here's what I discovered when I tried X"
- Acknowledge rough edges honestly
- Represent JetBrains like a great engineer: genuinely enthusiastic, honest about limitations

## 2. Data-Informed Advocacy
Every decision backed by evidence from real developer conversations.

- Community sentiment is primary research (Reddit, YouTrack, Discord)
- 47 Reddit comments + 12 YouTrack upvotes > 1 intuition
- Weekly synthesis of community signals
- Content ideas come from what developers ask about, not what I think they should care about

## 3. Bridge Builder (Both Directions)
Translate product to developers and developers to product.

- Product team hears developer frustrations with context and reproduction steps
- Developers understand what's coming and why
- Champion program: 10 community voices with direct product feedback access
- Weekly syncs with product managers
- Structured feedback submission (not Slack messages)`,
    phase: 'Overview',
    tags: ['strategy', 'framework', 'pillars'],
    createdDate: '2026-02-01',
    lastUpdated: '2026-02-25',
  },
  {
    id: 'doc-3',
    title: 'Content Strategy: Four Pillars Framework',
    type: 'Framework',
    content: `# Content Strategy: Four Pillars

Every piece of content maps to one of these four narrative pillars.

## 1. Productivity ROI
"WebStorm pays for itself in the first week of serious use."
- Content: Case studies, timed comparisons, productivity challenges, ROI calculator
- Goal: Quantify the value. Advanced refactoring, integrated debugger, deep framework intelligence = hours per week

## 2. AI + IDE Guardrails
"AI coding is only as good as its guardrails. WebStorm provides the guardrails."
- Content: Technical comparisons, local model setup guides, "things WebStorm caught" articles
- Goal: Position WebStorm+Junie as safer than Cursor for production code

## 3. Monorepo Mastery
"The IDE built for how real enterprise teams ship JavaScript."
- Content: Nx/Turborepo setup guides, cross-package debugging, monorepo refactoring walkthroughs
- Goal: Own the narrative for large-scale JS/TS projects

## 4. TypeScript-First Development
"TypeScript adoption is rising because of AI. WebStorm is the IDE built for TypeScript."
- Content: Migration guides, "types make AI smarter" explainers, framework-specific deep-dives
- Goal: Position WebStorm as TypeScript IDE of choice for AI-assisted development`,
    phase: 'Overview',
    tags: ['strategy', 'content', 'pillars'],
    createdDate: '2026-02-01',
    lastUpdated: '2026-02-25',
  },
];
