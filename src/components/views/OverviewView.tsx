import { useDataStore } from '../../stores/dataStore';
import { useChallengeStore } from '../../stores/challengeStore';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';

export default function OverviewView() {
  const { champions, content, signals, milestones, intel } = useDataStore();
  const { completedChallenges, streak } = useChallengeStore();

  const stats = [
    {
      label: 'Active Champions',
      value: champions.filter((c) => c.status === 'active').length,
      icon: '🏆',
      color: '#087CFA',
    },
    {
      label: 'Content Published',
      value: content.filter((c) => c.status === 'published').length,
      icon: '📝',
      color: '#21D789',
    },
    {
      label: 'Pending Signals',
      value: signals.filter((s) => !s.reported).length,
      icon: '📡',
      color: '#FC801D',
    },
    {
      label: 'Challenges Completed',
      value: completedChallenges.length,
      icon: '💡',
      color: '#FC318C',
    },
  ];

  const phases = ['30-day', '60-day', '90-day'];
  const getPhaseProgress = (phase: string) => {
    const phaseItems = milestones.filter((m) => m.phase === phase);
    const completed = phaseItems.filter((m) => m.status === 'completed').length;
    return completed > 0 ? Math.round((completed / phaseItems.length) * 100) : 0;
  };

  const phaseIcon: Record<string, string> = {
    '30-day': '🏃',
    '60-day': '🚀',
    '90-day': '🎯',
  };

  const phaseColor: Record<string, string> = {
    '30-day': '#087CFA',
    '60-day': '#FC801D',
    '90-day': '#FC318C',
  };

  return (
    <div className="view">
      <SectionHeader
        icon="📊"
        title="Overview Dashboard"
        subtitle="Champion metrics, content status, signal insights"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: '600', color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>📈 Phase Progress</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {phases.map((phase) => {
            const progress = getPhaseProgress(phase);
            return (
              <Card key={phase}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span>{phaseIcon[phase]}</span>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
                      {phase.charAt(0).toUpperCase() + phase.slice(1)}
                    </h3>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: phaseColor[phase] }}>
                    {progress}%
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                  <div
                    style={{
                      background: phaseColor[phase],
                      height: '100%',
                      width: `${progress}%`,
                      transition: 'width 0.3s',
                    }}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>🎯 Quick Stats</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(232,237,243,0.8)' }}>Total Champions</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#087CFA' }}>{champions.length}</span>
              </div>
            </Card>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(232,237,243,0.8)' }}>Content Pipeline</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#FC801D' }}>{content.length}</span>
              </div>
            </Card>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(232,237,243,0.8)' }}>Competitors Tracked</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#FC318C' }}>{intel.length}</span>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>💪 Challenge Stats</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(232,237,243,0.8)' }}>Current Streak</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#21D789' }}>{streak.current} days</span>
              </div>
            </Card>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(232,237,243,0.8)' }}>Best Streak</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#21D789' }}>{streak.best} days</span>
              </div>
            </Card>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(232,237,243,0.8)' }}>Completion Rate</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#087CFA' }}>
                  {Math.round((completedChallenges.length / 100) * 100)}%
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
