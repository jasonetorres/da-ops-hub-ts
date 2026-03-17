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
  Resource,
  CommunityQuestion,
} from '../types/domain';

// ─── Champions CRM ───────────────────────────────────────────────────────────
// Real creator targets identified during 30-day community audit (March 2026)
export const SEED_CHAMPIONS: Champion[] = [
  {
    id: '1',
    name: 'Theo (t3.gg)',
    handle: '@t3dotgg',
    platform: 'Twitter/X',
    audience: 'TypeScript/React developers (250K+ followers, 300K+ YouTube)',
    contentType: 'Opinionated deep-dives, live streams, hot takes',
    status: 'Identified',
    tags: ['TypeScript', 'React', 'T3 Stack', 'tRPC', 'Influential'],
    notes:
      'Highly influential in TypeScript community. Has criticized WebStorm/JetBrains historically. Winning him over = high signal event. Approach: peer conversation, not pitch. His audience skews VS Code → Cursor.',
    lastContact: '',
  },
  {
    id: '2',
    name: 'Fireship (Jeff Delaney)',
    handle: '@Fireship_dev',
    platform: 'YouTube',
    audience: '2.8M YouTube subscribers, strong Twitter following',
    contentType: '100-second explainers, dev news, trend pieces',
    status: 'Identified',
    tags: ['Web dev', 'Firebase', 'Trends', 'AI', 'Viral content'],
    notes:
      'Creates "X in 100 seconds" style content. WebStorm feature vid could reach millions. Has covered Cursor, Zed — needs WebStorm angle. Content angle: "WebStorm in 100 Seconds" or AI guardrails piece.',
    lastContact: '',
  },
  {
    id: '3',
    name: 'Jack Herrington',
    handle: '@jherr',
    platform: 'YouTube',
    audience: '120K YouTube subscribers, active Twitter/X',
    contentType: 'TypeScript, React, Module Federation deep-dives',
    status: 'Identified',
    tags: ['TypeScript', 'React', 'Module Federation', 'Advanced', 'Architecture'],
    notes:
      'Module Federation and Microfrontend expert. Highly technical audience. WebStorm monorepo + Module Federation is a perfect content collab angle. Authentic, not hype-driven.',
    lastContact: '',
  },
  {
    id: '4',
    name: 'James Quick',
    handle: '@jamesqquick',
    platform: 'YouTube',
    audience: '300K+ YouTube subscribers, active on Twitter/X',
    contentType: 'Web dev tutorials, tools, beginner-friendly',
    status: 'Contacted',
    tags: ['Web dev', 'JavaScript', 'Beginner-friendly', 'Tutorials'],
    notes:
      'Very community-oriented creator. Lower barrier to collaboration vs Theo/Fireship. Good candidate for first outreach. Focus: WebStorm for modern JS devs, productivity angle.',
    lastContact: '2026-03-15',
  },
  {
    id: '5',
    name: 'Paul Everitt',
    handle: '@paulweveritt',
    platform: 'Twitter/X',
    audience: 'JetBrains DA (Python/PyCharm, JS). Internal ally.',
    contentType: 'Tech talks, thought leadership, advocacy',
    status: 'Champion',
    tags: ['JetBrains', 'Internal', 'DA', 'Python', 'JavaScript', 'Mentor'],
    notes:
      'Senior DA colleague at JetBrains. 1:1 scheduled March 17. Deep community credibility, qualitative source on advocacy playbook. Key internal champion and mentor for Web JS/TS advocacy strategy.',
    lastContact: '2026-03-17',
  },
];

// ─── Content Pipeline ─────────────────────────────────────────────────────────
export const SEED_CONTENT: Content[] = [
  {
    id: '1',
    title: 'WebStorm for TypeScript Developers in 2026',
    type: 'Blog Post',
    pillar: 'TypeScript-First',
    status: 'Drafting',
    dueDate: '2026-03-28',
    notes: 'First published piece. Authentic peer-to-peer voice. Focus on real IDE intelligence advantages.',
  },
  {
    id: '2',
    title: 'Amsterdam WebConf — WebStorm Live Session',
    type: 'Video',
    pillar: 'Productivity ROI',
    status: 'Scheduled',
    dueDate: '2026-03-27',
    notes: 'Recording with Helen + Jan-Niklas at Amsterdam. Fly Mar 27 (UA4480). Hotel: Qbic WTC.',
  },
  {
    id: '3',
    title: 'How WebStorm catches what AI assistants miss',
    type: 'Blog Post',
    pillar: 'AI + Guardrails',
    status: 'Idea',
    dueDate: '2026-04-05',
    notes: 'Static analysis catches type errors and framework anti-patterns that Cursor lets through. Respond to Vlad\'s AI priority ask.',
  },
  {
    id: '4',
    title: 'Playwright Testing in WebStorm — Complete Setup Guide',
    type: 'Guide',
    pillar: 'Productivity ROI',
    status: 'Idea',
    dueDate: '2026-04-12',
    notes: 'WEB-3401957 has 177 votes — high community demand. Playwright is exploding. First content piece tied directly to YouTrack signal.',
  },
  {
    id: '5',
    title: 'Community Insights Report v1 — March 2026',
    type: 'Blog Post',
    pillar: 'Productivity ROI',
    status: 'Drafting',
    dueDate: '2026-04-16',
    notes: 'Day 30 deliverable. State of the WebStorm Community memo v1.0. Internal first, then publish externally.',
  },
];

// ─── Community Signals ────────────────────────────────────────────────────────
// 9 real signals from YouTrack WEB project + community research (March 2026)
export const SEED_SIGNALS: Signal[] = [
  {
    id: '1',
    source: 'YouTrack',
    title: 'WEB-535720: Display XHR in JavaScript debug console (211 votes)',
    url: 'https://youtrack.jetbrains.com/issue/WEB-535720',
    sentiment: 'Negative',
    category: 'Debugging',
    priority: 'High',
    reportedToProduct: false,
    notes: '#1 most-voted open WebStorm issue. 86 comments. Engaged commenter pool = strong JBCC candidate pool.',
    date: '2026-03-15',
  },
  {
    id: '2',
    source: 'YouTrack',
    title: 'WEB-3401957: Support Microsoft Playwright Test Runner (177 votes)',
    url: 'https://youtrack.jetbrains.com/issue/WEB-3401957',
    sentiment: 'Negative',
    category: 'Testing',
    priority: 'High',
    reportedToProduct: false,
    notes: '#2 most-voted open issue. Playwright adoption is exploding — high-signal content opportunity. Guide would directly address this.',
    date: '2026-03-15',
  },
  {
    id: '3',
    source: 'YouTrack',
    title: 'WEB-3506564: [Meta] High CPU on TypeScript resolve/types evaluation (119 votes)',
    url: 'https://youtrack.jetbrains.com/issue/WEB-3506564',
    sentiment: 'Negative',
    category: 'Performance',
    priority: 'High',
    reportedToProduct: false,
    notes: 'Primary evidence for performance stigma. 100 comments. Ask Craig Walker for status Wed Mar 18.',
    date: '2026-03-15',
  },
  {
    id: '4',
    source: 'YouTrack',
    title: 'WEB-4559039: Figma for WebStorm integration (113 votes)',
    url: 'https://youtrack.jetbrains.com/issue/WEB-4559039',
    sentiment: 'Neutral',
    category: 'Integrations',
    priority: 'Medium',
    reportedToProduct: false,
    notes: 'Design-to-code workflow is a differentiator story. 49 comments. Strong signal for product team.',
    date: '2026-03-15',
  },
  {
    id: '5',
    source: 'YouTrack',
    title: 'WEB-5388653: [Umbrella] Slow completion in WebStorm (67 votes)',
    url: 'https://youtrack.jetbrains.com/issue/WEB-5388653',
    sentiment: 'Negative',
    category: 'Performance',
    priority: 'High',
    reportedToProduct: false,
    notes: 'Slow completion umbrella issue. Pairs with WEB-3506564. Both need product team status. Performance stigma cluster.',
    date: '2026-03-15',
  },
  {
    id: '6',
    source: 'YouTrack',
    title: 'WEB-7167058: Interface/type params not colored in remote environment (28 votes)',
    url: 'https://youtrack.jetbrains.com/issue/WEB-7167058',
    sentiment: 'Negative',
    category: 'Remote Development',
    priority: 'High',
    reportedToProduct: false,
    notes: 'Part of Remoting friction cluster. Include in Remoting brief for Vlad Minaev.',
    date: '2026-03-15',
  },
  {
    id: '7',
    source: 'YouTrack',
    title: 'WEB-622542: Support remote external tools for File Watchers (21 votes)',
    url: 'https://youtrack.jetbrains.com/issue/WEB-622542',
    sentiment: 'Negative',
    category: 'Remote Development',
    priority: 'High',
    reportedToProduct: false,
    notes: 'File Watchers broken in remote. Common Discord complaint. Part of Remoting brief.',
    date: '2026-03-15',
  },
  {
    id: '8',
    source: 'YouTrack',
    title: 'WEB-3695797: Remote Docker node_modules not detected (18 votes)',
    url: 'https://youtrack.jetbrains.com/issue/WEB-3695797',
    sentiment: 'Negative',
    category: 'Remote Development',
    priority: 'High',
    reportedToProduct: false,
    notes: 'Docker + remote dev is a pro workflow blocker. Include in Remoting brief for product team.',
    date: '2026-03-15',
  },
  {
    id: '9',
    source: 'Reddit',
    title: 'Reddit r/webdev: WebStorm vs Cursor debate thread — "WebStorm is too slow"',
    url: 'https://reddit.com/r/webdev',
    sentiment: 'Negative',
    category: 'Competitive',
    priority: 'High',
    reportedToProduct: false,
    notes: 'Defensive fan behavior documented. Recurring "too slow" objection. Needs counter-narrative content. Track with flair once approved.',
    date: '2026-03-10',
  },
];

// ─── 30·60·90 Milestones ──────────────────────────────────────────────────────
// Aligned with Jan's official onboarding doc + Jason's game plan
export const SEED_MILESTONES: Milestone[] = [
  // 30-Day Phase
  {
    id: '1',
    phase: '30-day',
    title: 'Complete full internal onboarding',
    status: 'In Progress',
    dueDay: 14,
    description: 'Meet all key stakeholders (Helen, Vlad, Craig, Kristina, Paul). Join all Slack channels. Set up WebStorm, YouTrack, HiBob, Hector bot.',
  },
  {
    id: '2',
    phase: '30-day',
    title: 'State of the WebStorm Community memo v0.2',
    status: 'Completed',
    dueDay: 7,
    description: 'Community intelligence memo with YouTrack evidence, competitive landscape, and champion longlist draft. Done Mar 17.',
  },
  {
    id: '3',
    phase: '30-day',
    title: 'Amsterdam trip + WebConf content recording',
    status: 'Not Started',
    dueDay: 17,
    description: 'Fly Mar 27 (UA4480). Team dinner Mar 26. Record content with Helen + Jan-Niklas. Hotel: Qbic WTC Amsterdam.',
  },
  {
    id: '4',
    phase: '30-day',
    title: 'Day 30 deliverables submitted',
    status: 'Not Started',
    dueDay: 30,
    description: '1) State of the WebStorm Community memo v1.0  2) Competitive Content Gap Analysis  3) Champion Longlist (20 devs mapped)',
  },
  // 60-Day Phase
  {
    id: '5',
    phase: '60-day',
    title: 'First blog post published',
    status: 'Not Started',
    dueDay: 45,
    description: 'Technical deep-dive on WebStorm. Peer-to-peer tone. Show up as a developer who uses it daily, not a spokesperson.',
  },
  {
    id: '6',
    phase: '60-day',
    title: 'Champion outreach — 5 initial conversations',
    status: 'Not Started',
    dueDay: 50,
    description: 'Genuine conversations with Theo, Fireship, Jack Herrington, James Quick, Paul Everitt. Not pitches — peer discovery.',
  },
  {
    id: '7',
    phase: '60-day',
    title: 'JBCC Web/JS/TS DA role understood + road-mapped',
    status: 'Not Started',
    dueDay: 55,
    description: 'Deep-dive into JBCC program. Learn structure, existing contributors, and Web DA responsibilities. Prepare to take ownership.',
  },
  // 90-Day Phase
  {
    id: '8',
    phase: '90-day',
    title: 'First conference/meetup talk delivered',
    status: 'Not Started',
    dueDay: 70,
    description: 'WebStorm represented at developer conference or major meetup. Talk abstract submitted by Day 30.',
  },
  {
    id: '9',
    phase: '90-day',
    title: 'Formally active as Web/JS/TS DA in JBCC',
    status: 'Not Started',
    dueDay: 80,
    description: 'Fully operational as Web DA. 5+ community contributors engaged. First JBCC Web content published or facilitated.',
  },
  {
    id: '10',
    phase: '90-day',
    title: 'Synthesize learnings + propose Year 1 OKRs',
    status: 'Not Started',
    dueDay: 90,
    description: 'What worked, what didn\'t. Strategic recommendations for next 90 days. Full-year advocacy roadmap proposal.',
  },
];

// ─── Competitive Intel ────────────────────────────────────────────────────────
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
      'Offline AI capabilities (Ollama support)',
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
      'Developer advocate partnership program',
    ],
  },
  {
    id: '4',
    competitor: 'JetBrains Ecosystem',
    strengths: [
      'Purpose-built IDEs for each language',
      'Superior code intelligence',
      'Advanced refactoring tools',
      'Enterprise deployment options',
      'Unified licensing across products',
      'Professional support',
      'Database and DevOps tools',
      'Offline functionality',
      'Security and compliance features',
    ],
    weaknesses: [
      'Higher cost (~$250/year)',
      'Resource heavy (RAM usage)',
      'Slower startup time',
      'Steeper learning curve',
      'Can feel bloated for simple projects',
      'Less hip than VS Code in startups',
      'Performance stigma — YouTrack has 119-vote CPU issue (WEB-3506564)',
      'Remoting friction (5 tracked issues)',
    ],
    opportunities: [
      'AI integration with Junie in WebStorm',
      'Fix performance stigma with data/content',
      'Free tier for open source',
      'Improved startup performance',
      'Cloud IDE (JetBrains Space)',
      'Team/Enterprise features',
      'Remoting: fix issues = major differentiator story',
    ],
  },
  {
    id: '5',
    competitor: 'Windsurf',
    strengths: [
      'AI-native editor from Codeium',
      'Fast AI completion (Codeium model)',
      'Free tier available',
      'Flows: autonomous coding sessions',
      'Growing adoption in 2025–2026',
      'Direct Cursor competitor — split the market',
    ],
    weaknesses: [
      'Very new product (stability risk)',
      'No real IDE depth — lightweight editor',
      'Limited debugging and profiling tools',
      'No refactoring engine',
      'Unknown long-term sustainability',
      'Smaller community than Cursor',
      'AI-only value prop — no IDE intelligence',
    ],
    opportunities: [
      'Position WebStorm as proven vs experimental',
      'Highlight IDE intelligence Windsurf lacks',
      'Enterprise stability and support angle',
      'TypeScript-first vs generic AI editor',
      'WebStorm+Junie outperforms on complex refactoring',
    ],
  },
];

// ─── Daily Challenges ─────────────────────────────────────────────────────────
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

// ─── Tutorials ────────────────────────────────────────────────────────────────
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
      'Use WebStorm as primary Web/JS/TS IDE from Day 1 — genuinely, not performatively',
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
      'JBCC (JetBrains Community Contributor) program gives Web/JS/TS community voices direct access to product feedback',
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
          dueDate: '2026-04-04',
        },
        {
          id: 'ci-1-2',
          title: 'Debugging async React with WebStorm',
          description: 'Tutorial: breakpoints, step-through debugging, async/await inspection',
          week: 4,
          dueDate: '2026-04-11',
        },
      ],
      '60-day': [
        {
          id: 'ci-1-3',
          title: 'Refactoring a 50-file React app in 4 seconds',
          description: 'Video demo: safe refactoring at scale, rename across imports, type-aware changes',
          week: 6,
          dueDate: '2026-04-25',
        },
        {
          id: 'ci-1-4',
          title: 'REST Client as Postman replacement',
          description: 'Guide: built-in HTTP client, request history, environment variables',
          week: 7,
          dueDate: '2026-05-02',
        },
      ],
      '90-day': [
        {
          id: 'ci-1-5',
          title: 'WebStorm ROI calculator: hours saved this quarter',
          description: 'Interactive tool: estimate productivity gains based on team size and workflow',
          week: 10,
          dueDate: '2026-05-23',
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
          dueDate: '2026-04-04',
        },
      ],
      '60-day': [
        {
          id: 'ci-2-2',
          title: 'Cursor vs. WebStorm+Junie: a real-world test',
          description: 'Article: same task in both IDEs, comparison of code quality, safety, refactoring speed',
          week: 6,
          dueDate: '2026-04-25',
        },
        {
          id: 'ci-2-3',
          title: 'Setting up local AI models (Ollama) with WebStorm',
          description: 'Tutorial: privacy-first AI coding, keep your code local, enterprise-safe',
          week: 7,
          dueDate: '2026-05-02',
        },
      ],
      '90-day': [
        {
          id: 'ci-2-4',
          title: 'The future of AI in IDEs: guardrails > speed',
          description: 'Thought piece: why IDE+AI is more powerful than AI-native editors',
          week: 11,
          dueDate: '2026-05-30',
        },
      ],
    },
    targetAudience: ['Enterprise teams', 'Security-conscious developers', 'AI enthusiasts', 'DevSecOps teams'],
    contentTypes: ['Blog Post', 'Video', 'Guide'],
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
          dueDate: '2026-04-18',
        },
        {
          id: 'ci-3-2',
          title: 'Cross-package debugging in monorepos',
          description: 'Tutorial: debug across 50+ packages without context switching',
          week: 7,
          dueDate: '2026-05-02',
        },
      ],
      '90-day': [
        {
          id: 'ci-3-3',
          title: 'Turborepo + WebStorm workflows',
          description: 'Advanced guide: build graph visualization, dependency management',
          week: 10,
          dueDate: '2026-05-23',
        },
      ],
    },
    targetAudience: ['Enterprise teams', 'Monorepo maintainers', 'Full-stack teams', 'Large code bases'],
    contentTypes: ['Blog Post', 'Video', 'Guide'],
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
          dueDate: '2026-03-28',
        },
      ],
      '60-day': [
        {
          id: 'ci-4-2',
          title: 'Types make your AI assistant smarter',
          description: 'Article: how TypeScript helps Cursor, Junie, GitHub Copilot generate better code',
          week: 6,
          dueDate: '2026-04-25',
        },
        {
          id: 'ci-4-3',
          title: 'React + TypeScript deep-dive',
          description: 'Tutorial: component props, hooks, generics, WebStorm IntelliSense advantages',
          week: 8,
          dueDate: '2026-05-09',
        },
      ],
      '90-day': [
        {
          id: 'ci-4-4',
          title: 'Node.js + TypeScript best practices',
          description: 'Guide: monorepo setup, type-safe APIs, WebStorm debugging',
          week: 9,
          dueDate: '2026-05-16',
        },
      ],
    },
    targetAudience: ['TypeScript adopters', 'React developers', 'Node.js teams', 'Type-safe advocates'],
    contentTypes: ['Blog Post', 'Video', 'Guide'],
    successMetrics: ['5K reach', 'High time-on-page', 'Community shares'],
  },
];

// ─── Weekly Tasks ─────────────────────────────────────────────────────────────
export const SEED_WEEKLY_TASKS: WeeklyTask[] = [
  {
    id: 'task-1-1',
    title: 'Product deep-dive: All major WebStorm features',
    description: 'Work through refactoring, debugger, AI Assistant (Junie), monorepo support, HTTP client. Document pain points as potential content angles.',
    phase: '30-day',
    week: 1,
    track: 'Content',
    status: 'Completed',
    dueDate: '2026-03-14',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Use WebStorm as primary IDE from Day 1 — genuinely, not performatively.',
  },
  {
    id: 'task-1-2',
    title: 'Internal 1-on-1s: Helen, Vlad, Craig, Kristina, Paul',
    description: 'Meet all key stakeholders. Understand roadmap, positioning, past campaigns, team culture. Paul 1:1 scheduled March 17 (1pm EDT).',
    phase: '30-day',
    week: 1,
    track: 'Product Bridge',
    status: 'In Progress',
    dueDate: '2026-03-21',
    linkedContent: [],
    linkedChampions: ['5'],
    linkedSignals: [],
    notes: 'Craig Walker meeting Wed Mar 18, 2–3:30pm GMT+1. Come with: WEB-3506564 + WEB-5388653 status ask, 5 Remoting issue IDs, AI content timeline.',
  },
  {
    id: 'task-1-3',
    title: 'Join all Slack channels + set up Hector standup bot',
    description: 'Join: #advocates-only, #ask-the-advocates, #advocacy-coffee, #webstorm-internal, #webstorm-duties, #webstorm-product. Configure Hector: /hector standup adv add [update] [ticket]',
    phase: '30-day',
    week: 1,
    track: 'Community',
    status: 'In Progress',
    dueDate: '2026-03-14',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Slack approval in progress. #webstorm-duties and #webstorm-product are primary signal feeds.',
  },
  {
    id: 'task-1-4',
    title: 'Read internal strategy docs + advocacy playbook',
    description: 'Read The Advocate\'s Manifesto, WebStorm roadmap and strategy docs, past campaigns, positioning docs. Understand JetBrains as a business.',
    phase: '30-day',
    week: 1,
    track: 'Content',
    status: 'In Progress',
    dueDate: '2026-03-14',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Build context before creating content. Understanding JetBrains as a business is as important as understanding the product.',
  },
  {
    id: 'task-2-1',
    title: 'Community audit: Reddit + Twitter/X sentiment sweep',
    description: 'Search WebStorm mentions in r/webdev, r/javascript, r/typescript, r/reactjs over last 12 months. Track sentiment, objections, opportunities. Get Reddit employee flair.',
    phase: '30-day',
    week: 2,
    track: 'Community',
    status: 'In Progress',
    dueDate: '2026-03-21',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: ['9'],
    notes: 'Do not engage without Reddit employee flair. Map active threads first.',
  },
  {
    id: 'task-2-2',
    title: 'YouTrack deep-dive: 30 top WEB issues by votes',
    description: 'Document the top community pain points from YouTrack WEB project. Extract vote counts, comments, patterns. Build Remoting brief for Vlad.',
    phase: '30-day',
    week: 2,
    track: 'Product Bridge',
    status: 'Completed',
    dueDate: '2026-03-17',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: ['1', '2', '3', '4', '5', '6', '7', '8'],
    notes: '9 signals documented. WEB-535720 (#1, 211 votes), WEB-3401957 (#2, 177 votes), WEB-3506564 (performance, 119 votes).',
  },
  {
    id: 'task-2-3',
    title: 'Draft State of the WebStorm Community memo v0.2',
    description: 'Community intelligence memo with YouTrack evidence, competitive landscape analysis, Amsterdam calendar, champion longlist draft.',
    phase: '30-day',
    week: 2,
    track: 'Content',
    status: 'Completed',
    dueDate: '2026-03-17',
    linkedContent: ['5'],
    linkedChampions: [],
    linkedSignals: ['1', '2', '3', '5'],
    notes: 'Done March 17. v0.2 complete. v1.0 due April 16 (Day 30 deliverable).',
  },
  {
    id: 'task-3-1',
    title: 'Identify 20 influential developers + map their reach',
    description: 'Find the most influential WebStorm advocates on Reddit, Twitter/X, YouTube, Dev.to, Discord. Note audience size, content type, alignment with WebStorm story.',
    phase: '30-day',
    week: 3,
    track: 'Community',
    status: 'In Progress',
    dueDate: '2026-03-28',
    linkedContent: [],
    linkedChampions: ['1', '2', '3', '4', '5'],
    linkedSignals: [],
    notes: 'Started: Theo, Fireship, Jack Herrington, James Quick, Paul Everitt in CRM. Need 15 more.',
  },
  {
    id: 'task-3-2',
    title: 'Amsterdam trip — content recording + team dinner',
    description: 'Fly Mar 27 (UA4480). Hotel: Qbic WTC Amsterdam. Team dinner Mar 26, 9pm. Record content with Helen + Jan-Niklas.',
    phase: '30-day',
    week: 3,
    track: 'Content',
    status: 'Not Started',
    dueDate: '2026-03-28',
    linkedContent: ['2'],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Best unstructured intel opportunity of the 30-day window. Come with questions for Craig, Jan-Niklas.',
  },
  {
    id: 'task-3-3',
    title: 'Competitive analysis: Cursor, VS Code, Zed, Windsurf',
    description: 'Review what advocates are publishing for each competitor. Identify narrative gaps. Document developer objections. Produce Competitive Content Gap Analysis.',
    phase: '30-day',
    week: 3,
    track: 'Content',
    status: 'Not Started',
    dueDate: '2026-03-28',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: ['9'],
    notes: 'Day 30 deliverable: Competitive Content Gap Analysis.',
  },
  {
    id: 'task-4-1',
    title: 'Day 30 deliverables: finalize all three outputs',
    description: '1) State of the WebStorm Community memo v1.0. 2) Competitive Content Gap Analysis. 3) Champion Longlist (20 devs).',
    phase: '30-day',
    week: 4,
    track: 'Product Bridge',
    status: 'Not Started',
    dueDate: '2026-04-16',
    linkedContent: ['5'],
    linkedChampions: ['1', '2', '3', '4', '5'],
    linkedSignals: [],
    notes: 'Hard deadline: April 16. These are Jan-Niklas\'s formal Day 30 expectations.',
  },
  {
    id: 'task-4-2',
    title: 'Submit conference talk abstract',
    description: 'Target React Conf, VueConf, JSConf, or local JavaScript meetup.',
    phase: '30-day',
    week: 4,
    track: 'Community',
    status: 'Not Started',
    dueDate: '2026-04-16',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Conference deadlines typically 2-3 months out. Aim for summer/fall event.',
  },
  {
    id: 'task-5-1',
    title: 'Daily community presence: Reddit/Twitter/Discord',
    description: 'Spend 30 mins daily in dev communities. Engage authentically — answer questions, share insights.',
    phase: '60-day',
    week: 5,
    track: 'Community',
    status: 'Not Started',
    dueDate: '2026-04-18',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Build presence, not mentions.',
  },
  {
    id: 'task-5-2',
    title: 'Publish first blog post on blog.jetbrains.com',
    description: 'Technical deep-dive on WebStorm feature. Peer-to-peer tone.',
    phase: '60-day',
    week: 5,
    track: 'Content',
    status: 'Not Started',
    dueDate: '2026-04-18',
    linkedContent: ['1'],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'First piece sets the tone: technical, peer-to-peer, authentic.',
  },
  {
    id: 'task-6-1',
    title: 'Personal outreach to first 5 champion candidates',
    description: 'Genuine conversation with Theo, Fireship, Jack Herrington, James Quick, Paul Everitt.',
    phase: '60-day',
    week: 6,
    track: 'Community',
    status: 'Not Started',
    dueDate: '2026-04-25',
    linkedContent: [],
    linkedChampions: ['1', '2', '3', '4', '5'],
    linkedSignals: [],
    notes: 'Relationship building > recruitment. James Quick is lowest-friction first contact.',
  },
  {
    id: 'task-7-1',
    title: 'Deep-dive into JBCC program — map Web/JS/TS DA role',
    description: 'Learn JBCC inside-out: structure, current contributors, benefits. Meet existing JBCC team.',
    phase: '60-day',
    week: 7,
    track: 'Community',
    status: 'Not Started',
    dueDate: '2026-05-02',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'JBCC already exists — role is to become the Web DA for it, not build from scratch.',
  },
  {
    id: 'task-8-1',
    title: 'Attend/participate in 1 major dev event',
    description: 'Meetup, conference, online summit. Participate as attendee first.',
    phase: '60-day',
    week: 8,
    track: 'Community',
    status: 'Not Started',
    dueDate: '2026-05-09',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Immersion > broadcast.',
  },
  {
    id: 'task-9-1',
    title: 'Launch 3-part content series',
    description: 'Serialized content. Example: "WebStorm Mastery" or "AI + WebStorm for Real Teams".',
    phase: '90-day',
    week: 9,
    track: 'Content',
    status: 'Not Started',
    dueDate: '2026-05-16',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Series > individual pieces for building audience.',
  },
  {
    id: 'task-10-1',
    title: 'Deliver first conference/meetup talk',
    description: 'WebStorm represented at developer conference or major meetup.',
    phase: '90-day',
    week: 10,
    track: 'Community',
    status: 'Not Started',
    dueDate: '2026-05-23',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Credibility moment. Become the WebStorm voice.',
  },
  {
    id: 'task-10-2',
    title: 'Formally active as Web/JS/TS DA in JBCC',
    description: 'Fully operational as the Web DA. 5+ community contributors engaged.',
    phase: '90-day',
    week: 10,
    track: 'Community',
    status: 'Not Started',
    dueDate: '2026-05-23',
    linkedContent: [],
    linkedChampions: ['1', '2', '3', '4'],
    linkedSignals: [],
    notes: 'JBCC is the scalable foundation.',
  },
  {
    id: 'task-11-1',
    title: 'Publish community spotlight (developer interview)',
    description: 'Feature a champion or influential developer. Share their story, WebStorm usage, learnings.',
    phase: '90-day',
    week: 11,
    track: 'Content',
    status: 'Not Started',
    dueDate: '2026-05-30',
    linkedContent: [],
    linkedChampions: ['4'],
    linkedSignals: [],
    notes: 'James Quick is most likely first spotlight candidate.',
  },
  {
    id: 'task-12-1',
    title: 'Synthesize 90-day learnings + propose Year 1 OKRs',
    description: 'What worked, what didn\'t. Strategic recommendations for next 90 days.',
    phase: '90-day',
    week: 12,
    track: 'Product Bridge',
    status: 'Not Started',
    dueDate: '2026-06-06',
    linkedContent: [],
    linkedChampions: [],
    linkedSignals: [],
    notes: 'Set the foundation for year 1 success.',
  },
];

// ─── OKRs ─────────────────────────────────────────────────────────────────────
export const SEED_OKRS: OKR[] = [
  {
    id: 'okr-1',
    title: 'Establish authentic content presence',
    description: 'Get WebStorm voice published, visible, and trusted in developer communities',
    keyResults: [
      { id: 'kr-1-1', description: 'Publish 2 blog posts on blog.jetbrains.com/webstorm (by Day 60)', target: 2, current: 0, unit: 'articles', status: 'Not Started' },
      { id: 'kr-1-2', description: 'Produce 1 YouTube tutorial (by Day 60)', target: 1, current: 0, unit: 'videos', status: 'Not Started' },
      { id: 'kr-1-3', description: 'Achieve 20% engagement increase on published content (by Day 90)', target: 20, current: 0, unit: '%', status: 'Not Started' },
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
      { id: 'kr-2-1', description: 'Submit 1 conference talk (by Day 60)', target: 1, current: 0, unit: 'talks', status: 'Not Started' },
      { id: 'kr-2-2', description: 'Deliver 1 talk at conference or major meetup (by Day 90)', target: 1, current: 0, unit: 'events', status: 'Not Started' },
      { id: 'kr-2-3', description: 'Daily presence in 3+ developer communities 5x/week', target: 5, current: 0, unit: 'days/week', status: 'Not Started' },
    ],
    phase: '60-day',
    linkedPillars: ['sp-3'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'WebStorm becomes known as part of the developer conversation',
  },
  {
    id: 'okr-3',
    title: 'Become Web/JS/TS DA in the JBCC Program',
    description: 'Learn, join, and take ownership of the Web/JS/TS segment of the JBCC program',
    keyResults: [
      { id: 'kr-3-1', description: 'Identify + map 20 influential Web/JS/TS developers (Champion Longlist, by Day 30)', target: 20, current: 5, unit: 'developers', status: 'In Progress' },
      { id: 'kr-3-2', description: 'Fully active as Web DA in JBCC with 5+ contributors engaged (by Day 90)', target: 5, current: 0, unit: 'contributors', status: 'Not Started' },
      { id: 'kr-3-3', description: 'First JBCC Web community content piece published or facilitated (by Day 90)', target: 1, current: 0, unit: 'pieces', status: 'Not Started' },
    ],
    phase: '90-day',
    linkedPillars: ['sp-3'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'JBCC Web/JS/TS community contributors become an extension of DA efforts',
  },
  {
    id: 'okr-4',
    title: 'Establish product feedback pipeline',
    description: 'Turn community signals into actionable product insights with evidence',
    keyResults: [
      { id: 'kr-4-1', description: 'Document 10 community signals with YouTrack/Reddit evidence (by Day 30)', target: 10, current: 9, unit: 'signals', status: 'In Progress' },
      { id: 'kr-4-2', description: 'Deliver monthly community insights report (starting Day 30)', target: 3, current: 0, unit: 'reports', status: 'Not Started' },
      { id: 'kr-4-3', description: 'Weekly sync with WebStorm product team established (Craig Walker)', target: 4, current: 0, unit: 'syncs', status: 'Not Started' },
    ],
    phase: '60-day',
    linkedPillars: ['sp-2'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'Product team shifts prioritization based on community signals with evidence',
  },
  {
    id: 'okr-5',
    title: 'Execute content calendar across 4 pillars',
    description: 'Operationalize content strategy with consistent output',
    keyResults: [
      { id: 'kr-5-1', description: 'Publish 1 piece from "Productivity ROI" pillar (by Day 90)', target: 1, current: 0, unit: 'pieces', status: 'Not Started' },
      { id: 'kr-5-2', description: 'Publish 1 piece from "AI + Guardrails" pillar (by Day 90)', target: 1, current: 0, unit: 'pieces', status: 'Not Started' },
      { id: 'kr-5-3', description: 'Establish bi-weekly publishing cadence (by Day 90)', target: 6, current: 0, unit: 'pieces', status: 'Not Started' },
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
    description: 'Own the "IDE + AI guardrails" narrative vs Cursor, Windsurf, Zed',
    keyResults: [
      { id: 'kr-6-1', description: 'Publish "AI + IDE guardrails" comparison content (by Day 90)', target: 2, current: 0, unit: 'pieces', status: 'Not Started' },
      { id: 'kr-6-2', description: 'Reach 10K+ developers with AI positioning content (by Day 90)', target: 10000, current: 0, unit: 'reach', status: 'Not Started' },
      { id: 'kr-6-3', description: '20%+ engagement on AI-related content', target: 20, current: 0, unit: '%', status: 'Not Started' },
    ],
    phase: '90-day',
    linkedPillars: ['sp-2'],
    status: 'Active',
    owner: 'Jason Torres',
    successMetric: 'Developers understand WebStorm\'s advantage vs. Cursor/Windsurf',
  },
];

// ─── Strategic Documents ──────────────────────────────────────────────────────
export const SEED_DOCUMENTS: StrategicDocument[] = [
  {
    id: 'doc-1',
    title: '30·60·90 Day Game Plan - Web/JS/TS Developer Advocate',
    type: 'Plan',
    content: `# 30·60·90 Day Game Plan

## The Premise
WebStorm is the most productive Web/JS/TS IDE ever built. My job, starting Day 1, is to make sure every JavaScript and TypeScript developer knows it — and to build the community, content, and programs that prove it.

## 30 Days: Listen, Learn & Land
**Week 1-2:** Internal Onboarding, Settling In & People
- Product deep-dive: Set WebStorm as primary Web/JS/TS IDE, work through every major feature
- Meet people in advocacy, the WebStorm team, and across the business
- Internal 1-on-1s with DevRel, product, engineering, marketing

**Week 3-4:** External Listening & Mapping
- Community audit: Reddit, Twitter, Stack Overflow, Discord, GitHub
- Competitive intelligence: Cursor, VS Code, Zed, Windsurf
- Identify 20 influential Web/JS/TS developers for JBCC outreach

## 60 Days: Build & Begin
- Publish first blog post and YouTube tutorial
- Personal outreach to 5 potential JBCC contributors
- Daily presence in developer communities

## 90 Days: Impact & Scale
- Launch 3-part content series
- Deliver first conference/meetup talk
- Formally active as Web/JS/TS DA in JBCC

## Success Metrics
- Content: 2/month blog posts, 1/month videos by Day 90
- Community: 30% ↑ Web/JS/TS mentions/shares
- Product Bridge: 10+ pain points documented, monthly reports`,
    phase: 'Overview',
    tags: ['strategy', 'framework', '30-60-90', 'plan'],
    createdDate: '2026-03-10',
    lastUpdated: '2026-03-17',
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

## 3. Bridge Builder (Both Directions)
Translate product to developers and developers to product.

- Product team hears developer frustrations with context and reproduction steps
- Developers understand what's coming and why
- JBCC: Web/JS/TS community voices with direct product feedback access`,
    phase: 'Overview',
    tags: ['strategy', 'framework', 'pillars'],
    createdDate: '2026-03-10',
    lastUpdated: '2026-03-17',
  },
  {
    id: 'doc-3',
    title: 'Content Strategy: Four Pillars Framework',
    type: 'Framework',
    content: `# Content Strategy: Four Pillars

Every piece of content maps to one of these four narrative pillars.

## 1. Productivity ROI
"WebStorm pays for itself in the first week of serious use."

## 2. AI + IDE Guardrails
"AI coding is only as good as its guardrails. WebStorm provides the guardrails."

## 3. Monorepo Mastery
"The IDE built for how real enterprise teams ship JavaScript."

## 4. TypeScript-First Development
"TypeScript adoption is rising because of AI. WebStorm is the IDE built for TypeScript."`,
    phase: 'Overview',
    tags: ['strategy', 'content', 'pillars'],
    createdDate: '2026-03-10',
    lastUpdated: '2026-03-17',
  },
];

// ─── Tools & Resources ────────────────────────────────────────────────────────
export const SEED_RESOURCES: Resource[] = [
  { id: 'res-1', title: 'JetBrains Remoting Research Questionnaire', url: 'https://docs.google.com/forms/d/e/1FAIpQLScyxmR-NyQ_5UxhFgkJRCjenTCdiJ9tg_rqlc-IXSwYoHQOmg/viewform?usp=publish-editor', dateAdded: '2026-03-10' },
  { id: 'res-2', title: 'WebStorm YouTrack — WEB Project Issues', url: 'https://youtrack.jetbrains.com/issues/WEB', dateAdded: '2026-03-15' },
  { id: 'res-3', title: 'WebStorm Guide — Tips & Tutorials', url: 'https://www.jetbrains.com/webstorm/guide/', dateAdded: '2026-03-15' },
  { id: 'res-4', title: 'HiBob — HR Platform (PTO, Goals)', url: 'https://app.hibob.com/home', dateAdded: '2026-03-10' },
  { id: 'res-5', title: 'JetBrains Discord Server', url: 'https://discord.gg/jetbrains', dateAdded: '2026-03-15' },
  { id: 'res-6', title: 'r/JetBrains — Subreddit (get employee flair)', url: 'https://www.reddit.com/r/Jetbrains/', dateAdded: '2026-03-15' },
  { id: 'res-7', title: 'WebStorm Blog', url: 'https://blog.jetbrains.com/webstorm/', dateAdded: '2026-03-10' },
];

// ─── Community Q&A ────────────────────────────────────────────────────────────
export const SEED_COMMUNITY_QUESTIONS: CommunityQuestion[] = [
  {
    id: 'qa-1',
    question: 'How is JetBrains dealing with the rise of Cursor?',
    source: 'Slack',
    sourceHandle: 'Chris Nowicki',
    category: 'Cursor Positioning',
    responseFramework: `**Acknowledge the real thing:**
Cursor has nailed one specific problem: token streaming latency. They've optimized inference to feel instant.

**Flip to WebStorm's angle:**
But here's what they're missing: IDE intelligence. Type-aware refactoring, deep project understanding, debugging. Cursor is a really good editor with great AI. WebStorm is an IDE that happens to have AI.

**Make it about choice:**
For TypeScript monorepos? WebStorm's cross-package navigation + refactoring beats Cursor. For prototyping fast? Cursor wins.`,
    tags: ['cursor', 'latency', 'ai', 'inference', 'ide-vs-editor'],
    dateAsked: '2026-03-04',
    upvotes: 5,
    reshares: 2,
    replies: 0,
    status: 'Answered',
    notes: 'Good foundation for competitive positioning content.',
  },
  {
    id: 'qa-2',
    question: 'Why is WebStorm slower than VS Code on startup?',
    source: 'Reddit',
    sourceHandle: 'r/webdev',
    category: 'Performance',
    responseFramework: `**Acknowledge the real constraint:**
VS Code starts faster because it's lighter weight — minimal features by default. WebStorm includes everything built-in: debugger, profiler, database tools, refactoring.

**Frame the tradeoff:**
Startup time vs runtime capability. You pay 5 seconds at startup to save 50 clicks during development.`,
    tags: ['performance', 'startup', 'tradeoff'],
    dateAsked: '2026-03-04',
    upvotes: 3,
    reshares: 1,
    replies: 2,
    status: 'Answered',
    notes: 'Frames as fundamental architecture choice, not a bug.',
  },
  {
    id: 'qa-3',
    question: 'Can I run local LLMs with WebStorm for privacy?',
    source: 'Discord',
    sourceHandle: 'Reactiflux',
    category: 'AI/Inference',
    responseFramework: `**Acknowledge the privacy concern:**
Yes. Running local models gives you full control—nothing leaves your machine.

**Position WebStorm:**
WebStorm's IDE intelligence (type checking, refactoring) runs locally by default. You can layer a local LLM on top for the best of both worlds.`,
    tags: ['privacy', 'local-llm', 'quantization', 'inference'],
    dateAsked: '2026-03-04',
    upvotes: 8,
    reshares: 3,
    replies: 1,
    status: 'Answered',
    notes: 'Enterprise privacy angle. Strong content opportunity here.',
  },
  {
    id: 'qa-4',
    question: 'Is WebStorm worth the $69/year price when VS Code is free?',
    source: 'Reddit',
    sourceHandle: 'r/javascript',
    category: 'Pricing',
    responseFramework: `**Reframe the math:**
$69/year = $1.33/week. If WebStorm saves you 1 hour/week (conservative), you're paying $1.33 per hour saved.

**What you get:**
Built-in debugger, profiler, refactoring, HTTP client, framework intelligence. In VS Code that's 20+ extensions, each a potential conflict.

**Honest take:**
If you write JavaScript occasionally, VS Code wins. If it's your craft, WebStorm pays back in time.`,
    tags: ['pricing', 'value', 'vs-code', 'roi'],
    dateAsked: '2026-03-10',
    upvotes: 12,
    reshares: 4,
    replies: 6,
    status: 'Answered',
    notes: 'High-engagement topic. Response needs to be honest, not defensive.',
  },
  {
    id: 'qa-5',
    question: 'How does WebStorm\'s AI (Junie) compare to GitHub Copilot?',
    source: 'Twitter/X',
    sourceHandle: '@devtools_watch',
    category: 'AI/Inference',
    responseFramework: `**Honest comparison:**
GitHub Copilot has wider adoption and more training data. Junie is newer but integrated directly into WebStorm's refactoring and code intelligence.

**The WebStorm advantage:**
When Junie suggests code, it has full IDE context: types, imports, call graph, project structure. Copilot in VS Code lacks deep framework intelligence.

**Bottom line:**
Copilot for breadth of completions. Junie in WebStorm for TypeScript/React projects where correctness matters.`,
    tags: ['ai', 'junie', 'copilot', 'comparison'],
    dateAsked: '2026-03-12',
    upvotes: 9,
    reshares: 5,
    replies: 3,
    status: 'Answered',
    notes: 'Get Vlad to confirm Junie roadmap details before publishing content on this.',
  },
];
