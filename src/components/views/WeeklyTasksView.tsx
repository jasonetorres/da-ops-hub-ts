import { useState } from 'react';
import { useDataStore } from '../../stores/dataStore';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';
import StatusPill from '../common/StatusPill';

const TRACK_COLORS: Record<string, string> = {
  'Content': '#087CFA',
  'Community': '#21D789',
  'Product Bridge': '#FC801D',
};

const TRACK_ICONS: Record<string, string> = {
  'Content': '📝',
  'Community': '👥',
  'Product Bridge': '🌉',
};

export default function WeeklyTasksView() {
  const { weeklyTasks, completeWeeklyTask } = useDataStore();
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([1]);
  const [filterTrack, setFilterTrack] = useState<'Content' | 'Community' | 'Product Bridge' | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'Not Started' | 'In Progress' | 'Completed' | 'all'>('all');

  // Get all available weeks
  const allWeeks = Array.from(new Set(weeklyTasks.map((t: any) => t.week))).sort((a: any, b: any) => a - b);

  const filtered = weeklyTasks
    .filter((t: any) => selectedWeeks.includes(t.week))
    .filter((t: any) => filterTrack === 'all' || t.track === filterTrack)
    .filter((t: any) => filterStatus === 'all' || t.status === filterStatus);

  const phaseWeekMap = {
    '30-day': 'Weeks 1-4',
    '60-day': 'Weeks 5-8',
    '90-day': 'Weeks 9-12',
  };

  const getWeekLabel = (phase: string, week: number) => {
    const baseWeek = phase === '30-day' ? 0 : phase === '60-day' ? 4 : 8;
    return `Week ${baseWeek + week}`;
  };

  // Group tasks by phase and week for display organization
  // (Helps with visual grouping)

  const phases: ('30-day' | '60-day' | '90-day')[] = ['30-day', '60-day', '90-day'];

  return (
    <div className="view">
      <SectionHeader
        icon="📋"
        title="Weekly Tasks"
        subtitle="36 tasks across 12 weeks × 3 tracks (Content, Community, Product Bridge)"
      />

      {/* Week Selector */}
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <strong style={{ fontSize: '12px', color: 'rgba(232,237,243,0.6)', display: 'block', marginBottom: '12px' }}>
          Select Week(s):
        </strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '6px', marginBottom: '16px' }}>
          {allWeeks.map((week: any) => (
            <button
              key={week}
              onClick={() =>
                setSelectedWeeks(selectedWeeks.includes(week) ? selectedWeeks.filter((w) => w !== week) : [...selectedWeeks, week])
              }
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                fontWeight: '600',
                background: selectedWeeks.includes(week) ? '#087CFA' : 'rgba(255,255,255,0.05)',
                color: selectedWeeks.includes(week) ? '#fff' : 'rgba(232,237,243,0.7)',
                border: '1px solid ' + (selectedWeeks.includes(week) ? '#087CFA' : 'rgba(255,255,255,0.1)'),
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              W{week}
            </button>
          ))}
        </div>

        {/* Quick Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <strong style={{ fontSize: '11px', color: 'rgba(232,237,243,0.5)' }}>Track:</strong>
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {['all', 'Content', 'Community', 'Product Bridge'].map((t: any) => (
                <button
                  key={t}
                  onClick={() => setFilterTrack(t as any)}
                  style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    background: filterTrack === t ? TRACK_COLORS[t] || '#087CFA' : 'rgba(255,255,255,0.05)',
                    color: filterTrack === t ? '#fff' : 'rgba(232,237,243,0.6)',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t === 'all' ? 'All' : t.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <strong style={{ fontSize: '11px', color: 'rgba(232,237,243,0.5)' }}>Status:</strong>
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {['all', 'Not Started', 'In Progress', 'Completed'].map((s: any) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s as any)}
                  style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    background: filterStatus === s ? '#087CFA' : 'rgba(255,255,255,0.05)',
                    color: filterStatus === s ? '#fff' : 'rgba(232,237,243,0.6)',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {s === 'all' ? 'All' : s === 'Not Started' ? 'Pending' : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Display */}
      {filtered.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(232,237,243,0.5)' }}>
          No tasks match your filters. Select a week to get started.
        </div>
      ) : (
        <>
          {/* Group by Week */}
          {selectedWeeks
            .sort((a: any, b: any) => a - b)
            .map((week: any) => {
              const weekTasks = filtered.filter((t: any) => t.week === week);
              if (weekTasks.length === 0) return null;

              // Get phase for this week
              const weekPhase = weekTasks[0]?.phase;
              const baseWeek = weekPhase === '30-day' ? 0 : weekPhase === '60-day' ? 4 : 8;

              return (
                <div key={`week-${week}`} style={{ marginBottom: '28px' }}>
                  {/* Week Header */}
                  <div style={{ marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#E8EDF3' }}>
                      Week {baseWeek + week}
                    </h3>
                    <div style={{ fontSize: '11px', color: 'rgba(232,237,243,0.5)', marginTop: '2px' }}>
                      {weekPhase === '30-day' ? '🏃 30-Day Listen & Learn' : weekPhase === '60-day' ? '🚀 60-Day Build & Establish' : '🎯 90-Day Scale & Lead'}
                    </div>
                  </div>

                  {/* Tasks Grid by Track */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {weekTasks.map((task: any) => (
                      <Card key={task.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <input
                                type="checkbox"
                                checked={task.status === 'Completed'}
                                onChange={() => completeWeeklyTask(task.id)}
                                style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                              />
                              <span style={{ fontSize: '20px' }}>{TRACK_ICONS[task.track]}</span>
                              <h4
                                style={{
                                  margin: 0,
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                                  color: task.status === 'Completed' ? 'rgba(232,237,243,0.5)' : '#E8EDF3',
                                }}
                              >
                                {task.title}
                              </h4>
                            </div>

                            <p style={{ margin: '0 0 8px 32px', fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
                              {task.description}
                            </p>

                            {/* Linked items */}
                            {(task.linkedContent.length > 0 || task.linkedChampions.length > 0) && (
                              <div style={{ marginLeft: '32px', fontSize: '11px', color: 'rgba(132, 204, 250, 0.7)' }}>
                                {task.linkedContent.length > 0 && (
                                  <span style={{ marginRight: '12px' }}>
                                    📝 {task.linkedContent.length} content
                                  </span>
                                )}
                                {task.linkedChampions.length > 0 && (
                                  <span>👥 {task.linkedChampions.length} champion{task.linkedChampions.length !== 1 ? 's' : ''}</span>
                                )}
                              </div>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <StatusPill status={task.status} size="sm" />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
        </>
      )}

      {/* Summary Stats */}
      <Card>
        <div style={{ fontSize: '12px', color: 'rgba(232,237,243,0.7)' }}>
          <strong>Summary:</strong>
          <div style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
            <div>
              <div style={{ color: 'rgba(232,237,243,0.5)', fontSize: '11px' }}>Total Tasks</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#087CFA' }}>{weeklyTasks.length}</div>
            </div>
            <div>
              <div style={{ color: 'rgba(232,237,243,0.5)', fontSize: '11px' }}>Completed</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#21D789' }}>
                {weeklyTasks.filter((t: any) => t.status === 'Completed').length}
              </div>
            </div>
            <div>
              <div style={{ color: 'rgba(232,237,243,0.5)', fontSize: '11px' }}>In Progress</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#FC801D' }}>
                {weeklyTasks.filter((t: any) => t.status === 'In Progress').length}
              </div>
            </div>
            <div>
              <div style={{ color: 'rgba(232,237,243,0.5)', fontSize: '11px' }}>Completion %</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#087CFA' }}>
                {Math.round(
                  (weeklyTasks.filter((t: any) => t.status === 'Completed').length / weeklyTasks.length) * 100
                )}%
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
