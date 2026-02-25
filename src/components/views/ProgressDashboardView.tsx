import { useDataStore } from '../../stores/dataStore';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';
import ProgressStat from '../common/ProgressStat';

export default function ProgressDashboardView() {
  const {
    weeklyTasks,
    okrs,
    content,
    champions,
    getPhaseProgress,
    getOKRProgress,
  } = useDataStore();

  // Calculate phase progress
  const phase30Progress = getPhaseProgress('30-day');
  const phase60Progress = getPhaseProgress('60-day');
  const phase90Progress = getPhaseProgress('90-day');

  // Calculate content & champion stats
  const publishedContent = content.filter((c: any) => c.status === 'Published').length;
  const championsEngaged = champions.filter((c: any) => c.status === 'Active').length;

  // Calculate overall metrics
  const completedTasks = weeklyTasks.filter((t: any) => t.status === 'Completed').length;
  const totalTasks = weeklyTasks.length;
  const taskCompletionPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const avgOKRProgress =
    okrs.length > 0
      ? Math.round(
          okrs.reduce((sum: any, okr: any) => sum + getOKRProgress(okr.id), 0) / okrs.length
        )
      : 0;

  // Get upcoming content due this week & next
  const today = new Date();
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  const upcomingThisWeek = weeklyTasks.filter((task: any) => {
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= weekFromNow && task.status !== 'Completed';
  });

  const upcomingNextWeek = weeklyTasks.filter((task: any) => {
    const dueDate = new Date(task.dueDate);
    return dueDate > weekFromNow && dueDate <= twoWeeksFromNow && task.status !== 'Completed';
  });

  // Get phase info for visualization
  const phaseStats = [
    { phase: '30-day', progress: phase30Progress, emoji: '🚀' },
    { phase: '60-day', progress: phase60Progress, emoji: '📈' },
    { phase: '90-day', progress: phase90Progress, emoji: '🎯' },
  ];

  return (
    <div className="view">
      <SectionHeader
        icon="📊"
        title="Progress Dashboard"
        subtitle="30·60·90 plan execution overview and momentum indicators"
      />

      {/* Overall KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <ProgressStat
          label="Weekly Tasks Complete"
          value={completedTasks}
          unit={`/ ${totalTasks}`}
          icon="✅"
          progress={taskCompletionPercent}
          color="#21D789"
        />
        <ProgressStat
          label="OKR Average Progress"
          value={avgOKRProgress}
          unit="%"
          icon="🎪"
          progress={avgOKRProgress}
          color="#087CFA"
        />
        <ProgressStat
          label="Content Published"
          value={publishedContent}
          unit="pieces"
          icon="📝"
          color="#FC801D"
        />
        <ProgressStat
          label="Champions Engaged"
          value={championsEngaged}
          unit="active"
          icon="🏆"
          color="#FC318C"
        />
      </div>

      {/* Phase Progress Section */}
      <Card>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600' }}>
          Phase Completion
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
          }}
        >
          {phaseStats.map((stat) => (
            <div
              key={stat.phase}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(132, 204, 250, 0.2)',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '13px', color: 'rgba(232,237,243,0.6)', marginBottom: '8px' }}>
                {stat.phase === '30-day'
                  ? '30-Day Listen & Learn'
                  : stat.phase === '60-day'
                    ? '60-Day Build & Establish'
                    : '90-Day Scale & Lead'}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#087CFA', marginBottom: '8px' }}>
                {stat.progress}%
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    background: `linear-gradient(90deg, #087CFA 0%, #21D789 100%)`,
                    height: '100%',
                    width: `${Math.min(stat.progress, 100)}%`,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Tasks Timeline */}
      <div style={{ marginTop: '24px' }}>
      <Card>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600' }}>
          📅 Coming Up
        </h3>

        {upcomingThisWeek.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#21D789',
                marginBottom: '8px',
              }}
            >
              This Week
            </div>
            {upcomingThisWeek.map((task: any) => (
              <div
                key={task.id}
                style={{
                  fontSize: '12px',
                  color: 'rgba(232,237,243,0.7)',
                  marginBottom: '6px',
                  paddingLeft: '12px',
                  borderLeft: '2px solid #21D789',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <span style={{ minWidth: '60px', fontSize: '11px', color: '#21D789' }}>
                  {new Date(task.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span>{task.title}</span>
              </div>
            ))}
          </div>
        )}

        {upcomingNextWeek.length > 0 && (
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#FC801D',
                marginBottom: '8px',
              }}
            >
              Next Week
            </div>
            {upcomingNextWeek.map((task: any) => (
              <div
                key={task.id}
                style={{
                  fontSize: '12px',
                  color: 'rgba(232,237,243,0.7)',
                  marginBottom: '6px',
                  paddingLeft: '12px',
                  borderLeft: '2px solid #FC801D',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <span style={{ minWidth: '60px', fontSize: '11px', color: '#FC801D' }}>
                  {new Date(task.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span>{task.title}</span>
              </div>
            ))}
          </div>
        )}

        {upcomingThisWeek.length === 0 && upcomingNextWeek.length === 0 && (
          <div style={{ fontSize: '12px', color: 'rgba(232,237,243,0.4)', fontStyle: 'italic' }}>
            No upcoming tasks this week or next week
          </div>
        )}
      </Card>
      </div>

      {/* Execution Summary */}
      <div style={{ marginTop: '24px' }}>
      <Card>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
          Strategy Execution Status
        </h3>
        <div style={{ fontSize: '13px', color: 'rgba(232,237,243,0.7)', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Framework:</strong> 3 core pillars (Authenticity, Data-Informed, Bridge Builder)
            established and guiding all decisions.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Execution:</strong> {completedTasks} of {totalTasks} weekly tasks completed
            ({taskCompletionPercent}%). {upcomingThisWeek.length} tasks due this week.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>OKRs:</strong> {okrs.length} objectives active. Average progress: {avgOKRProgress}%
          </p>
          <p style={{ margin: 0 }}>
            <strong>Content:</strong> {publishedContent} pieces published across 4 strategic pillars
            (Productivity ROI, AI+Guardrails, Monorepo, TypeScript).
          </p>
        </div>
      </Card>
      </div>

      {/* Phase Attribution */}
      <div style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(232,237,243,0.5)' }}>
        <p style={{ margin: '0' }}>
          Progress dashboard updates automatically as you complete tasks, publish content, and achieve
          OKR milestones. Use the other strategic views to drill into details by phase, pillar, or OKR.
        </p>
      </div>
    </div>
  );
}
