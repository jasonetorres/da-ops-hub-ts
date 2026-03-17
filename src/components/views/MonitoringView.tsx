// ============================================================
// MonitoringView.tsx — DA Mission Control
// Onboarding checklist, Slack channels, key contacts,
// tracked YouTrack issues, signal sources, and calendar.
// Based on Jan's "Welcome to JetBrains Developer Advocacy" doc.
// ============================================================

import { useState } from 'react';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';

// ── Types ────────────────────────────────────────────────────
interface ChecklistItem {
  id: string;
  label: string;
  week: string;
  link?: string;
}

interface SlackChannel {
  name: string;
  purpose: string;
  type: 'signal' | 'internal' | 'social';
  link: string;
}

interface TrackedIssue {
  id: string;
  title: string;
  votes: number;
  comments: number;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  url: string;
  notes: string;
}

interface KeyContact {
  name: string;
  role: string;
  email?: string;
  slack?: string;
}

interface CalendarEvent {
  date: string;
  title: string;
  type: 'meeting' | 'travel' | 'deadline' | 'content';
  notes: string;
  done: boolean;
}

interface SignalSource {
  name: string;
  url: string;
  icon: string;
  status: 'active' | 'pending' | 'not-started';
  cadence: string;
  notes: string;
}

// ── Static Data ──────────────────────────────────────────────
const SLACK_CHANNELS: SlackChannel[] = [
  {
    name: '#advocates-only',
    purpose: 'Internal advocacy team. Updates, strategy coordination, initiative discussions.',
    type: 'internal',
    link: 'https://jetbrains.slack.com/archives/advocates-only',
  },
  {
    name: '#ask-the-advocates',
    purpose: 'Other JetBrains teams reaching out with questions or collaboration ideas. Keep an eye on this.',
    type: 'internal',
    link: 'https://jetbrains.slack.com/archives/ask-the-advocates',
  },
  {
    name: '#webstorm-internal',
    purpose: 'Cross-functional: product, engineering, marketing, and advocacy all in one channel.',
    type: 'signal',
    link: 'https://jetbrains.slack.com/archives/webstorm-internal',
  },
  {
    name: '#webstorm-duties',
    purpose: '⭐ Support requests and ongoing user pain points. This is your signal feed for what\'s actively frustrating developers.',
    type: 'signal',
    link: 'https://jetbrains.slack.com/archives/webstorm-duties',
  },
  {
    name: '#webstorm-product',
    purpose: '⭐ Roadmap updates, feature planning, release coordination. Your primary bridge-building channel.',
    type: 'signal',
    link: 'https://jetbrains.slack.com/archives/webstorm-product',
  },
  {
    name: '#advocacy-coffee',
    purpose: 'Informal hangout. Non-work chat, random links, general vibes.',
    type: 'social',
    link: 'https://jetbrains.slack.com/archives/advocacy-coffee',
  },
];

const TRACKED_ISSUES: TrackedIssue[] = [
  {
    id: 'WEB-3506564',
    title: '[Meta] High CPU usage on TypeScript resolve/types evaluation',
    votes: 119,
    comments: 100,
    category: 'Performance',
    priority: 'High',
    url: 'https://youtrack.jetbrains.com/issue/WEB-3506564',
    notes: 'Primary evidence for performance stigma. Get status from Craig on Wed Mar 18.',
  },
  {
    id: 'WEB-5388653',
    title: '[Umbrella] Slow completion in WebStorm',
    votes: 67,
    comments: 32,
    category: 'Performance',
    priority: 'High',
    url: 'https://youtrack.jetbrains.com/issue/WEB-5388653',
    notes: 'Slow completion umbrella. Pairs with WEB-3506564. Both need product team status.',
  },
  {
    id: 'WEB-3401957',
    title: 'Support Microsoft Playwright Test Runner',
    votes: 177,
    comments: 43,
    category: 'Feature Request',
    priority: 'High',
    url: 'https://youtrack.jetbrains.com/issue/WEB-3401957',
    notes: '#2 most-voted open issue. Playwright is exploding — high-signal content opportunity.',
  },
  {
    id: 'WEB-7167058',
    title: 'Interface/type params not colored in remote environment',
    votes: 28,
    comments: 6,
    category: 'Remote Development',
    priority: 'High',
    url: 'https://youtrack.jetbrains.com/issue/WEB-7167058',
    notes: 'Part of Remoting friction cluster. Include in Remoting brief for Vlad.',
  },
  {
    id: 'WEB-622542',
    title: 'Support remote external tools for File Watchers',
    votes: 21,
    comments: 5,
    category: 'Remote Development',
    priority: 'High',
    url: 'https://youtrack.jetbrains.com/issue/WEB-622542',
    notes: 'File Watchers broken in remote. Common Discord complaint.',
  },
  {
    id: 'WEB-3695797',
    title: 'Remote Docker node_modules not detected',
    votes: 18,
    comments: 6,
    category: 'Remote Development',
    priority: 'High',
    url: 'https://youtrack.jetbrains.com/issue/WEB-3695797',
    notes: 'Docker + remote dev is a pro workflow blocker. Include in Remoting brief.',
  },
  {
    id: 'WEB-535720',
    title: 'Display XHR in JavaScript debug console',
    votes: 211,
    comments: 86,
    category: 'Feature Request',
    priority: 'Medium',
    url: 'https://youtrack.jetbrains.com/issue/WEB-535720',
    notes: '#1 most-voted open issue. Engaged commenter pool = JBCC candidate pool.',
  },
  {
    id: 'WEB-4559039',
    title: 'Figma for WebStorm integration',
    votes: 113,
    comments: 49,
    category: 'Feature Request',
    priority: 'Medium',
    url: 'https://youtrack.jetbrains.com/issue/WEB-4559039',
    notes: 'Design-to-code workflow is a differentiator story. 113 votes, strong signal.',
  },
];

const KEY_CONTACTS: KeyContact[] = [
  { name: 'Helen Scott', role: 'Head of Advocacy', email: 'helen.scott@jetbrains.com', slack: '@helen.scott' },
  { name: 'Jan-Niklas Wortmann', role: 'DA — WebStorm (JS/TS)', email: 'jan-niklas.wortmann@jetbrains.com', slack: '@jan-niklas.wortmann' },
  { name: 'Vlad Minaev', role: 'WebStorm Team Lead', slack: '@vlad.minaev' },
  { name: 'Craig Walker', role: 'WebStorm Product Manager', email: 'craig.walker@jetbrains.com', slack: '@craig.walker' },
  { name: 'Kristina Pchelintseva', role: 'WebStorm Product Manager', email: 'kristina.pchelintseva@jetbrains.com' },
  { name: 'Paul Everitt', role: 'DA — JetBrains (Python/JS)', slack: '@paul.everitt' },
  { name: 'Alexandra (TBD)', role: 'WebStorm Product Marketing Manager', slack: 'Intro via Jan-Niklas pending' },
];

const SIGNAL_SOURCES: SignalSource[] = [
  {
    name: 'Twitter/X — WebStorm',
    url: 'https://twitter.com/search?q=WebStorm',
    icon: '🐦',
    status: 'active',
    cadence: '1–2x daily',
    notes: 'Vlad\'s top ask. Monitor: "WebStorm", "JetBrains IDE", "Cursor vs WebStorm", "TypeScript IDE".',
  },
  {
    name: 'Reddit — r/webdev',
    url: 'https://reddit.com/r/webdev',
    icon: '🔶',
    status: 'pending',
    cadence: 'Daily (post-flair)',
    notes: 'Do not engage without employee flair. Map active IDE threads first.',
  },
  {
    name: 'Reddit — r/JetBrains',
    url: 'https://reddit.com/r/Jetbrains',
    icon: '🔶',
    status: 'pending',
    cadence: 'Daily (post-flair)',
    notes: 'Core community space. Monitor before engaging.',
  },
  {
    name: 'Discord — JetBrains',
    url: 'https://discord.gg/jetbrains',
    icon: '💬',
    status: 'not-started',
    cadence: 'Weekly sweep',
    notes: 'Map active channels. #webstorm channel is the primary signal source.',
  },
  {
    name: 'YouTrack — WEB project',
    url: 'https://youtrack.jetbrains.com/issues/WEB',
    icon: '📋',
    status: 'active',
    cadence: 'Weekly — tracked issues above',
    notes: '8 issues being tracked. Add new signals to Signals tab.',
  },
  {
    name: '#webstorm-duties (Slack)',
    url: 'https://jetbrains.slack.com',
    icon: '💬',
    status: 'pending',
    cadence: 'Daily (once Slack approved)',
    notes: 'Ongoing support requests and user pain points. Primary internal signal feed.',
  },
  {
    name: 'BlueSky — WebStorm',
    url: 'https://bsky.app/search?q=WebStorm',
    icon: '🦋',
    status: 'not-started',
    cadence: 'Weekly',
    notes: 'Growing developer presence. Mentioned in Jan\'s onboarding doc. Set up monitoring.',
  },
  {
    name: 'YouTube — Comments',
    url: 'https://youtube.com',
    icon: '▶️',
    status: 'not-started',
    cadence: 'Weekly (James Quick, Theo, Fireship)',
    notes: 'Monitor IDE comparison video comments for signal. Defensive fan behavior documented here.',
  },
];

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    date: 'Mar 17',
    title: 'Paul Everitt 1:1 — 1pm EDT',
    type: 'meeting',
    notes: 'Senior DA colleague. Qualitative depth on community health, advocacy playbook.',
    done: false,
  },
  {
    date: 'Mar 18',
    title: 'Craig Walker meeting — 2–3:30pm GMT+1',
    type: 'meeting',
    notes: 'Come with: WEB-3506564 + WEB-5388653 status ask, 5 Remoting issue IDs, AI content timeline.',
    done: false,
  },
  {
    date: 'Mar 25',
    title: 'Community Memo v0.3 — post-Amsterdam update',
    type: 'deadline',
    notes: 'Incorporate Amsterdam signal. First social listening data. Craig meeting debrief.',
    done: false,
  },
  {
    date: 'Mar 26',
    title: 'WebStorm Team Dinner — 9pm Amsterdam',
    type: 'meeting',
    notes: 'Craig, Jan-Niklas, Varvara Zaikina, Victor Turansky, Kiril Panayotov, Dmitry Makhnev, Tomasz Blachut, Konstantin Ulitin. Best unstructured intel opportunity of the 30-day window.',
    done: false,
  },
  {
    date: 'Mar 27',
    title: 'Fly to Amsterdam — UA4480',
    type: 'travel',
    notes: 'Hotel: Qbic Hotel Amsterdam WTC (confirmed). Amsterdam content recording with Helen + Jan-Niklas.',
    done: false,
  },
  {
    date: 'Apr 16',
    title: 'Day 30 Deliverables due',
    type: 'deadline',
    notes: 'State of the WebStorm Community memo v1.0 + Competitive Content Gap Analysis + Champion Longlist (20 devs).',
    done: false,
  },
];

const USEFUL_LINKS = [
  { label: 'WebStorm YouTrack', url: 'https://youtrack.jetbrains.com/issues/WEB' },
  { label: 'WebStorm Blog', url: 'https://blog.jetbrains.com/webstorm/' },
  { label: 'WebStorm Guide (Tips)', url: 'https://www.jetbrains.com/webstorm/guide/' },
  { label: 'JetBrains Discord', url: 'https://discord.gg/jetbrains' },
  { label: 'r/JetBrains', url: 'https://www.reddit.com/r/Jetbrains/' },
  { label: 'HiBob (HR — PTO/Goals)', url: 'https://app.hibob.com/home' },
  { label: 'Hector Standup Bot', url: 'https://jetbrains.slack.com' },
];

// ── Colors ───────────────────────────────────────────────────
const C = {
  blue: '#087CFA',
  green: '#21D789',
  pink: '#FC318C',
  orange: '#FC801D',
  text: '#E8EDF3',
  muted: 'rgba(232,237,243,0.6)',
  faint: 'rgba(232,237,243,0.35)',
  cardBg: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.07)',
};

// ── Helpers ──────────────────────────────────────────────────
function StatusDot({ status }: { status: 'active' | 'pending' | 'not-started' }) {
  const color = status === 'active' ? C.green : status === 'pending' ? C.orange : '#555';
  const label = status === 'active' ? 'Active' : status === 'pending' ? 'Pending' : 'Not Started';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block' }} />
      {label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: 'High' | 'Medium' | 'Low' }) {
  const color = priority === 'High' ? C.pink : priority === 'Medium' ? C.orange : C.green;
  return (
    <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '10px', background: `${color}22`, color, fontWeight: 600 }}>
      {priority}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: 700, color: C.text, borderBottom: `1px solid ${C.border}`, paddingBottom: '8px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function MonitoringView() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('monitoring-checklist') || '{}');
    } catch {
      return {};
    }
  });
  const [doneEvents, setDoneEvents] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'checklist' | 'slack' | 'youtrack' | 'signals' | 'calendar' | 'contacts'>('checklist');

  const toggleCheck = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    try { localStorage.setItem('monitoring-checklist', JSON.stringify(updated)); } catch {}
  };

  const CHECKLIST_ITEMS: ChecklistItem[] = [
    // Week 1: Setup
    { id: 'cl-1', week: 'Week 1 — Setup & Access', label: 'Set up WebStorm as your primary IDE', link: 'https://www.jetbrains.com/webstorm/download/' },
    { id: 'cl-2', week: 'Week 1 — Setup & Access', label: 'Join Slack: #advocates-only, #ask-the-advocates, #advocacy-coffee' },
    { id: 'cl-3', week: 'Week 1 — Setup & Access', label: 'Join Slack: #webstorm-internal, #webstorm-duties, #webstorm-product' },
    { id: 'cl-4', week: 'Week 1 — Setup & Access', label: 'Get access to YouTrack — bookmark WebStorm board', link: 'https://youtrack.jetbrains.com/issues/WEB' },
    { id: 'cl-5', week: 'Week 1 — Setup & Access', label: 'Set up Hector standup: /hector standup adv add [update] [ticket]' },
    { id: 'cl-6', week: 'Week 1 — Setup & Access', label: 'Log into HiBob (HR platform — PTO, goals)', link: 'https://app.hibob.com/home' },
    { id: 'cl-7', week: 'Week 1 — Setup & Access', label: "Read The Advocate's Manifesto" },
    { id: 'cl-8', week: 'Week 1 — Setup & Access', label: 'Read WebStorm roadmap and strategy docs' },
    { id: 'cl-9', week: 'Week 1 — Setup & Access', label: 'Get Reddit JetBrains employee flair', link: 'https://www.reddit.com/r/Jetbrains/' },
    // Week 1-2: Internal Onboarding
    { id: 'cl-10', week: 'Weeks 1–2 — Internal Onboarding', label: 'Meet Helen Scott (Head of Advocacy)' },
    { id: 'cl-11', week: 'Weeks 1–2 — Internal Onboarding', label: 'Meet Vlad Minaev (WebStorm Team Lead)' },
    { id: 'cl-12', week: 'Weeks 1–2 — Internal Onboarding', label: 'Meet Craig Walker (WebStorm Product Manager) — Wed Mar 18' },
    { id: 'cl-13', week: 'Weeks 1–2 — Internal Onboarding', label: 'Meet Kristina Pchelintseva (WebStorm Product Manager)' },
    { id: 'cl-14', week: 'Weeks 1–2 — Internal Onboarding', label: 'Meet Web Head of Ecosystem (TBD)' },
    { id: 'cl-15', week: 'Weeks 1–2 — Internal Onboarding', label: 'Meet WebStorm Product Marketing Manager (intro via Jan-Niklas — Alexandra)' },
    { id: 'cl-16', week: 'Weeks 1–2 — Internal Onboarding', label: 'Attend demo, stand-up, and team calls' },
    { id: 'cl-17', week: 'Weeks 1–2 — Internal Onboarding', label: 'Review internal docs: positioning, past campaigns, strategy' },
    { id: 'cl-18', week: 'Weeks 1–2 — Internal Onboarding', label: 'Browse open YouTrack tickets — understand top community frustrations', link: 'https://youtrack.jetbrains.com/issues/WEB' },
    { id: 'cl-19', week: 'Weeks 1–2 — Internal Onboarding', label: 'Start planning first piece of content — aim for a quick win' },
    { id: 'cl-20', week: 'Weeks 1–2 — Internal Onboarding', label: 'Read DevEx org changes blog post (Space — Aleksey Stukalov)' },
    // Week 3-4: External Listening
    { id: 'cl-21', week: 'Weeks 3–4 — External Listening', label: 'Audit WebStorm content channels: blog, YouTube, social', link: 'https://blog.jetbrains.com/webstorm/' },
    { id: 'cl-22', week: 'Weeks 3–4 — External Listening', label: 'Deep dive: Reddit, Discord, Twitter/X, BlueSky, LinkedIn' },
    { id: 'cl-23', week: 'Weeks 3–4 — External Listening', label: 'Identify 20 most influential WebStorm community members (check with Marketing for baseline)' },
    { id: 'cl-24', week: 'Weeks 3–4 — External Listening', label: 'Competitive review: what Cursor, VS Code, and Zed advocates are publishing' },
    { id: 'cl-25', week: 'Weeks 3–4 — External Listening', label: 'Publish first piece of content — visible win internally and externally' },
    // Day 30 Deliverables
    { id: 'cl-26', week: 'Day 30 Deliverables', label: '✅ State of the WebStorm Community memo (in progress — v0.2 done)' },
    { id: 'cl-27', week: 'Day 30 Deliverables', label: 'Competitive Content Gap Analysis' },
    { id: 'cl-28', week: 'Day 30 Deliverables', label: 'Community Champion Longlist (20 devs mapped by platform, audience, alignment)' },
  ];

  const weeks = Array.from(new Set(CHECKLIST_ITEMS.map(i => i.week)));
  const completedCount = CHECKLIST_ITEMS.filter(i => checkedItems[i.id]).length;

  const channelTypeColor = (t: SlackChannel['type']) =>
    t === 'signal' ? C.orange : t === 'internal' ? C.blue : C.muted;

  const tabs = [
    { id: 'checklist', label: '☑️ Onboarding', count: `${completedCount}/${CHECKLIST_ITEMS.length}` },
    { id: 'slack', label: '💬 Slack Channels' },
    { id: 'youtrack', label: '📋 YouTrack' },
    { id: 'signals', label: '📡 Signal Sources' },
    { id: 'calendar', label: '📅 Calendar' },
    { id: 'contacts', label: '👤 Key Contacts' },
  ] as const;

  return (
    <div className="view">
      <SectionHeader
        icon="🛰️"
        title="DA Mission Control"
        subtitle="Onboarding checklist · Slack channels · YouTrack · Signal sources · Calendar · Contacts"
      />

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: `1px solid ${activeTab === tab.id ? C.blue : C.border}`,
              background: activeTab === tab.id ? `${C.blue}22` : 'transparent',
              color: activeTab === tab.id ? C.blue : C.muted,
              fontSize: '12px',
              fontWeight: activeTab === tab.id ? 700 : 400,
              cursor: 'pointer',
            }}
          >
            {tab.label}{'count' in tab ? ` (${tab.count})` : ''}
          </button>
        ))}
      </div>

      {/* ── Onboarding Checklist ─────────────────────────── */}
      {activeTab === 'checklist' && (
        <div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, background: C.border, borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
              <div style={{ background: C.green, height: '100%', width: `${(completedCount / CHECKLIST_ITEMS.length) * 100}%`, transition: 'width 0.3s' }} />
            </div>
            <span style={{ fontSize: '13px', color: C.muted, whiteSpace: 'nowrap' }}>
              {completedCount} / {CHECKLIST_ITEMS.length} done
            </span>
          </div>

          {weeks.map(week => {
            const items = CHECKLIST_ITEMS.filter(i => i.week === week);
            const weekDone = items.filter(i => checkedItems[i.id]).length;
            return (
              <div key={week} style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: week.includes('Deliverable') ? C.pink : C.blue }}>
                    {week}
                  </h3>
                  <span style={{ fontSize: '11px', color: C.faint }}>{weekDone}/{items.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {items.map(item => (
                    <Card key={item.id} onClick={() => toggleCheck(item.id)}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={!!checkedItems[item.id]}
                          onChange={() => toggleCheck(item.id)}
                          onClick={e => e.stopPropagation()}
                          style={{ marginTop: '2px', cursor: 'pointer', width: '16px', height: '16px', flexShrink: 0 }}
                        />
                        <div style={{ flex: 1 }}>
                          <span style={{
                            fontSize: '13px',
                            color: checkedItems[item.id] ? C.faint : C.text,
                            textDecoration: checkedItems[item.id] ? 'line-through' : 'none',
                          }}>
                            {item.label}
                          </span>
                          {item.link && !checkedItems[item.id] && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              style={{ marginLeft: '8px', fontSize: '11px', color: C.blue }}
                            >
                              ↗ open
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Hector bot reminder */}
          <Card>
            <div style={{ fontSize: '12px', color: C.muted }}>
              <span style={{ color: C.green, fontWeight: 700 }}>Hector standup bot:</span>
              {' '}Once in Slack, log updates with{' '}
              <code style={{ background: 'rgba(33,215,137,0.12)', color: C.green, padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                /hector standup adv add [THE THING YOU DID] [YOUTRACK-TICKET]
              </code>
            </div>
          </Card>
        </div>
      )}

      {/* ── Slack Channels ──────────────────────────────── */}
      {activeTab === 'slack' && (
        <div>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: C.muted }}>
            Slack is where most day-to-day communication happens. ⭐ = primary signal feed for advocacy work.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SLACK_CHANNELS.map(ch => (
              <Card key={ch.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <code style={{ fontSize: '13px', fontWeight: 700, color: channelTypeColor(ch.type) }}>
                        {ch.name}
                      </code>
                      {ch.type === 'signal' && (
                        <span style={{ fontSize: '10px', background: `${C.orange}22`, color: C.orange, padding: '1px 6px', borderRadius: '8px', fontWeight: 600 }}>
                          SIGNAL
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: C.muted, lineHeight: '1.5' }}>{ch.purpose}</p>
                  </div>
                  <a
                    href={ch.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '11px', color: C.blue, whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    Open ↗
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── YouTrack Tracked Issues ─────────────────────── */}
      {activeTab === 'youtrack' && (
        <div>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: C.muted }}>
            8 issues actively tracked for community evidence and product bridge conversations.
          </p>
          {(['Performance', 'Remote Development', 'Feature Request'] as const).map(cat => {
            const issues = TRACKED_ISSUES.filter(i => i.category === cat);
            return (
              <div key={cat} style={{ marginBottom: '24px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 700, color: cat === 'Performance' ? C.pink : cat === 'Remote Development' ? C.orange : C.blue }}>
                  {cat === 'Performance' ? '🔴' : cat === 'Remote Development' ? '🌐' : '✨'} {cat}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {issues.map(issue => (
                    <Card key={issue.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <a
                              href={issue.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: '11px', fontWeight: 700, color: C.blue, textDecoration: 'none' }}
                            >
                              {issue.id} ↗
                            </a>
                            <PriorityBadge priority={issue.priority} />
                          </div>
                          <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: C.text }}>{issue.title}</p>
                          <p style={{ margin: 0, fontSize: '11px', color: C.muted, lineHeight: '1.4' }}>{issue.notes}</p>
                        </div>
                        <div style={{ flexShrink: 0, textAlign: 'right' }}>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: C.orange }}>{issue.votes}</div>
                          <div style={{ fontSize: '10px', color: C.faint }}>votes</div>
                          <div style={{ fontSize: '13px', color: C.muted, marginTop: '4px' }}>{issue.comments}</div>
                          <div style={{ fontSize: '10px', color: C.faint }}>comments</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
          <a
            href="https://youtrack.jetbrains.com/issues/WEB"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: '4px', fontSize: '12px', color: C.blue }}
          >
            View all WEB issues on YouTrack ↗
          </a>
        </div>
      )}

      {/* ── Signal Sources ──────────────────────────────── */}
      {activeTab === 'signals' && (
        <div>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: C.muted }}>
            Active and planned signal sources. Green = monitoring now. Orange = set up but not fully live. Grey = not yet started.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SIGNAL_SOURCES.map(src => (
              <Card key={src.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span>{src.icon}</span>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '13px', fontWeight: 600, color: C.text, textDecoration: 'none' }}
                      >
                        {src.name}
                      </a>
                    </div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: C.muted }}>{src.notes}</p>
                    <span style={{ fontSize: '11px', color: C.faint }}>Cadence: {src.cadence}</span>
                  </div>
                  <StatusDot status={src.status} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Calendar ────────────────────────────────────── */}
      {activeTab === 'calendar' && (
        <div>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: C.muted }}>
            Key dates in the 30-day window. Click to mark done.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {CALENDAR_EVENTS.map((ev, i) => {
              const isDone = doneEvents[ev.date + ev.title];
              const typeColor = ev.type === 'meeting' ? C.blue : ev.type === 'travel' ? C.green : ev.type === 'deadline' ? C.pink : C.orange;
              const typeLabel = ev.type === 'meeting' ? '📅 Meeting' : ev.type === 'travel' ? '✈️ Travel' : ev.type === 'deadline' ? '🎯 Deadline' : '📝 Content';
              return (
                <Card
                  key={i}
                  onClick={() => setDoneEvents(p => ({ ...p, [ev.date + ev.title]: !p[ev.date + ev.title] }))}
                >
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', opacity: isDone ? 0.4 : 1 }}>
                    <div style={{ minWidth: '48px', textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: typeColor }}>{ev.date}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '10px', color: typeColor }}>{typeLabel}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: isDone ? C.faint : C.text, textDecoration: isDone ? 'line-through' : 'none' }}>
                          {ev.title}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '11px', color: C.muted, lineHeight: '1.4' }}>{ev.notes}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Useful links */}
          <div style={{ marginTop: '28px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: C.text }}>Useful Links</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {USEFUL_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    borderRadius: '16px',
                    border: `1px solid ${C.border}`,
                    fontSize: '12px',
                    color: C.blue,
                    textDecoration: 'none',
                    background: `${C.blue}0d`,
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Key Contacts ────────────────────────────────── */}
      {activeTab === 'contacts' && (
        <div>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: C.muted }}>
            Key contacts from Jan's onboarding doc + Day 1 email intel.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            {KEY_CONTACTS.map(contact => (
              <Card key={contact.name}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: `${C.blue}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 700, color: C.blue,
                  }}>
                    {contact.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: C.text }}>{contact.name}</div>
                    <div style={{ fontSize: '11px', color: C.muted, marginBottom: '4px' }}>{contact.role}</div>
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} style={{ fontSize: '11px', color: C.blue, display: 'block' }}>
                        {contact.email}
                      </a>
                    )}
                    {contact.slack && (
                      <div style={{ fontSize: '11px', color: C.green }}>{contact.slack}</div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
