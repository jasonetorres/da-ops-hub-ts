import { useDataStore } from '../../stores/dataStore';

// ─── Colour tokens ──────────────────────────────────────────────────────────
const C = {
  bg:        '#1e1f22',
  surface:   'rgba(43,45,49,0.9)',
  border:    'rgba(255,255,255,0.07)',
  text:      '#dbdee1',
  muted:     '#949ba4',
  accent:    '#5865f2',
  green:     '#23a55a',
  yellow:    '#f0b132',
  red:       '#f23f43',
  blurple:   '#5865f2',
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function pct(val: number, max: number): number {
  if (!max) return 0;
  return Math.round((val / max) * 100);
}

// ─── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({
  icon, label, value, sub, accent = C.text,
}: {
  icon: string; label: string; value: string | number; sub?: string; accent?: string;
}) {
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: '16px 18px',
    }}>
      <div style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: accent, lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: C.muted, marginTop: 5 }}>{sub}</div>
      )}
    </div>
  );
}

// ─── Horizontal Bar ────────────────────────────────────────────────────────

function HBar({ value, max, color = C.accent }: { value: number; max: number; color?: string }) {
  const w = pct(value, max);
  return (
    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: 3, transition: 'width 0.4s ease' }} />
    </div>
  );
}

// ─── Activity Bar Chart ────────────────────────────────────────────────────

function BarChart({
  data, label, color = C.accent,
}: {
  data: { key: string; val: number }[];
  label: string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.val), 1);
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
        {data.map(({ key, val }) => {
          const h = max ? Math.round((val / max) * 72) : 0;
          return (
            <div key={key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                title={`${key}: ${val}`}
                style={{
                  width: '100%',
                  height: h || 2,
                  background: val > 0 ? color : 'rgba(255,255,255,0.05)',
                  borderRadius: '2px 2px 0 0',
                  transition: 'height 0.3s ease',
                }}
              />
              <div style={{ fontSize: 9, color: C.muted, whiteSpace: 'nowrap' }}>{key}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Member Growth Sparkline ────────────────────────────────────────────────

function GrowthChart({ snapshots }: { snapshots: Record<string, number> }) {
  const entries = Object.entries(snapshots)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-30);

  if (entries.length < 2) {
    return (
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Member Growth (30d)
        </div>
        <div style={{ fontSize: 12, color: C.muted, padding: '24px 0', textAlign: 'center' }}>
          Collecting data — check back after a few days
        </div>
      </div>
    );
  }

  const vals  = entries.map(([, v]) => v);
  const minV  = Math.min(...vals);
  const maxV  = Math.max(...vals);
  const range = maxV - minV || 1;
  const W = 100;
  const H = 60;

  const points = entries.map(([, v], i) => {
    const x = (i / (entries.length - 1)) * W;
    const y = H - ((v - minV) / range) * (H - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const first = vals[0];
  const last  = vals[vals.length - 1];
  const delta = last - first;
  const deltaColor = delta >= 0 ? C.green : C.red;
  const deltaSign  = delta >= 0 ? '+' : '';

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Member Growth (30d)
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: deltaColor }}>
          {deltaSign}{delta.toLocaleString()} ({deltaSign}{pct(delta, first)}%)
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 60 }} preserveAspectRatio="none">
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke={C.green}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {entries.map(([, v], i) => {
          const x = (i / (entries.length - 1)) * W;
          const y = H - ((v - minV) / range) * (H - 6) - 3;
          return (
            <circle key={i} cx={x} cy={y} r="1.5" fill={C.green} vectorEffect="non-scaling-stroke">
              <title>{`${entries[i][0]}: ${v.toLocaleString()}`}</title>
            </circle>
          );
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: C.muted }}>
        <span>{entries[0][0]}</span>
        <span>{entries[entries.length - 1][0]}</span>
      </div>
    </div>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: C.muted }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 8 }}>
        No data yet
      </div>
      <div style={{ fontSize: 13, maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
        Deploy the Discord analytics collector with your{' '}
        <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, fontSize: 12 }}>
          BOT_TOKEN
        </code>
        {' '}and{' '}
        <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, fontSize: 12 }}>
          FIREBASE_DATABASE_URL
        </code>
        {' '}set. Stats refresh every 30 minutes automatically.
      </div>
    </div>
  );
}

// ─── Main View ──────────────────────────────────────────────────────────────

export default function DiscordIntelView() {
  const { discordAnalytics: da } = useDataStore();
  const { guildInfo, engagement, topChannels, roles, activityByDay, activityByHour, memberSnapshots } = da;

  const hasData = !!guildInfo;

  // ── Day-of-week chart data ───────────────────────────────────────────────
  const dayData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((k) => ({
    key: k,
    val: activityByDay[k] ?? 0,
  }));

  // ── Hourly chart data (grouped: 0-5, 6-11, 12-17, 18-23) ────────────────
  const hourGroups = [
    { key: '12a', val: [0,1,2,3,4,5].reduce((s, h) => s + (activityByHour[h] ?? 0), 0) },
    { key: '6a',  val: [6,7,8,9,10,11].reduce((s, h) => s + (activityByHour[h] ?? 0), 0) },
    { key: '12p', val: [12,13,14,15,16,17].reduce((s, h) => s + (activityByHour[h] ?? 0), 0) },
    { key: '6p',  val: [18,19,20,21,22,23].reduce((s, h) => s + (activityByHour[h] ?? 0), 0) },
  ];

  // ── Top channels ─────────────────────────────────────────────────────────
  const maxMsgs = topChannels[0]?.messageCount ?? 1;

  // ── Roles ─────────────────────────────────────────────────────────────────
  const maxRoleMembers = roles[0]?.memberCount ?? 1;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 40 }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            {guildInfo?.iconURL && (
              <img
                src={guildInfo.iconURL}
                alt="server icon"
                style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
              />
            )}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>
              {guildInfo?.name ?? 'Discord'} Server Insights
            </h2>
            {hasData && (
              <span style={{
                fontSize: 10,
                background: 'rgba(35,165,90,0.15)',
                color: C.green,
                border: `1px solid rgba(35,165,90,0.3)`,
                borderRadius: 4,
                padding: '2px 7px',
                letterSpacing: '0.06em',
              }}>
                LIVE
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
            {hasData
              ? `Live server statistics · refreshed ${timeAgo(guildInfo!.lastUpdated)}`
              : 'Awaiting first data collection from the analytics collector'}
          </p>
        </div>
      </div>

      {!hasData ? (
        <EmptyState />
      ) : (
        <>
          {/* ── Server Overview ── */}
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            Server Overview
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 24 }}>
            <StatCard icon="👥" label="Total Members"   value={guildInfo!.memberCount.toLocaleString()} accent={C.blurple} />
            <StatCard icon="🚀" label="Server Boost"    value={`Tier ${guildInfo!.boostTier}`} sub={`${guildInfo!.boostCount} boosters`} accent={C.yellow} />
            <StatCard icon="💬" label="Text Channels"   value={guildInfo!.channelCount} />
            <StatCard icon="🔊" label="Voice Channels"  value={guildInfo!.voiceChannelCount} />
            <StatCard icon="🏷️" label="Roles"            value={guildInfo!.roleCount} />
          </div>

          {/* ── Engagement Metrics ── */}
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            Engagement (last {engagement ? 'scan' : '—'})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 24 }}>
            <StatCard icon="✉️" label="Messages Scanned"   value={(engagement?.totalMessages ?? 0).toLocaleString()} accent={C.green} />
            <StatCard icon="🗣️" label="Communicators"       value={(engagement?.uniqueCommunicators ?? 0).toLocaleString()} sub="users with messages" accent={C.blurple} />
            <StatCard icon="📣" label="Active Channels"    value={engagement?.activeChannels ?? 0} sub="with recent messages" />
            <StatCard icon="📈" label="Avg Msgs / Day"     value={engagement?.avgMessagesPerDay ?? 0} sub="30-day estimate" />
          </div>

          {/* ── Charts Row ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            <BarChart data={dayData}   label="Activity by Day"           color={C.green}   />
            <BarChart data={hourGroups} label="Activity by Time (UTC)"   color={C.blurple} />
          </div>

          {/* ── Member Growth ── */}
          <div style={{ marginBottom: 24 }}>
            <GrowthChart snapshots={memberSnapshots} />
          </div>

          {/* ── Top Channels + Role Distribution ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>

            {/* Top Channels */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Top Channels by Activity
              </div>
              {topChannels.length === 0 ? (
                <div style={{ fontSize: 12, color: C.muted }}>No channel data yet</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {topChannels.map((ch, i) => (
                    <div key={ch.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: C.text, fontWeight: i < 3 ? 600 : 400 }}>
                          #{ch.name}
                        </span>
                        <span style={{ fontSize: 12, color: C.muted }}>
                          {ch.messageCount} &nbsp;
                          <span style={{ fontSize: 10, color: C.muted }}>
                            ({pct(ch.messageCount, maxMsgs)}%)
                          </span>
                        </span>
                      </div>
                      <HBar value={ch.messageCount} max={maxMsgs} color={i === 0 ? C.green : C.accent} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Role Distribution */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Role Distribution
              </div>
              {roles.length === 0 ? (
                <div style={{ fontSize: 12, color: C.muted }}>No role data yet</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {roles.map((r) => (
                    <div key={r.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0, display: 'inline-block' }} />
                          <span style={{ fontSize: 12, color: C.text }}>{r.name}</span>
                        </div>
                        <span style={{ fontSize: 12, color: C.muted }}>
                          {r.memberCount} &nbsp;
                          <span style={{ fontSize: 10 }}>
                            ({pct(r.memberCount, guildInfo!.memberCount)}%)
                          </span>
                        </span>
                      </div>
                      <HBar value={r.memberCount} max={maxRoleMembers} color={r.color} />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </>
      )}
    </div>
  );
}
