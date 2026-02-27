import { useState } from 'react';
import { useDataStore } from '../../stores/dataStore';
import Card from '../common/Card';
import Button from '../common/Button';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';

export default function TrackerView() {
  const { milestones, updateMilestoneStatus, weeklyTasks, completeWeeklyTask, resetAllWeeklyTasks } = useDataStore();
  const [showTasksView, setShowTasksView] = useState(true);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [taskNotes, setTaskNotes] = useState<Record<string, string>>({});

  const phaseColor: Record<string, string> = {
    '30-day': '#087CFA',
    '60-day': '#FC801D',
    '90-day': '#FC318C',
  };

  const phaseIcon: Record<string, string> = {
    '30-day': '🏃',
    '60-day': '🚀',
    '90-day': '🎯',
  };

  const phases = ['30-day', '60-day', '90-day'];

  const getPhaseProgress = (phase: string) => {
    const phaseItems = milestones.filter((m: any) => m.phase === phase);
    const completed = phaseItems.filter((m: any) => m.status === 'Completed').length;
    return { completed, total: phaseItems.length };
  };

  // Track icons
  const TRACK_ICONS: Record<string, string> = {
    'Content': '📝',
    'Community': '👥',
    'Product Bridge': '🌉',
  };

  return (
    <div className="view">
      <SectionHeader
        icon="🎯"
        title="30·60·90 Tracker"
        subtitle="Phase-based roadmap with weekly execution tasks"
      />

      {/* View Toggle & Reset */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            onClick={() => setShowTasksView(true)}
            variant={showTasksView ? 'primary' : 'secondary'}
            size="sm"
          >
            📋 Weekly Tasks ({weeklyTasks.length})
          </Button>
          <Button
            onClick={() => setShowTasksView(false)}
            variant={!showTasksView ? 'primary' : 'secondary'}
            size="sm"
          >
            🏁 Milestones ({milestones.length})
          </Button>
        </div>
        {showTasksView && (
          <Button
            onClick={() => {
              if (window.confirm('Reset all tasks to In Progress?')) {
                resetAllWeeklyTasks();
              }
            }}
            variant="danger"
            size="sm"
          >
            ↻ Reset All
          </Button>
        )}
      </div>

      {showTasksView ? (
        // Weekly Tasks View (36 tasks organized by phase & week)
        <>
          {phases.map((phase: any) => {
            const phaseTasks = weeklyTasks.filter((t: any) => t.phase === phase);
            const completedTasks = phaseTasks.filter((t: any) => t.status === 'Completed').length;
            const percentage = phaseTasks.length > 0 ? (completedTasks / phaseTasks.length) * 100 : 0;
            const weeks = Array.from(new Set(phaseTasks.map((t: any) => t.week))).sort((a: any, b: any) => a - b);

            return (
              <div key={phase} style={{ marginBottom: '32px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{phaseIcon[phase]}</span>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: phaseColor[phase] }}>
                      {phase === '30-day' ? '30-Day Listen & Learn' : phase === '60-day' ? '60-Day Build & Establish' : '90-Day Scale & Lead'}
                    </h2>
                    <span style={{ color: '#999', fontSize: '12px' }}>
                      {completedTasks}/{phaseTasks.length} tasks
                    </span>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '6px', overflow: 'hidden' }}>
                    <div
                      style={{
                        background: phaseColor[phase],
                        height: '100%',
                        width: `${percentage}%`,
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                </div>

                {weeks.map((week: any) => {
                  const weekTasks = phaseTasks.filter((t: any) => t.week === week);
                  const baseWeek = phase === '30-day' ? 0 : phase === '60-day' ? 4 : 8;
                  return (
                    <div key={`${phase}-${week}`} style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', color: 'rgba(232,237,243,0.5)', marginBottom: '8px', marginLeft: '8px', fontWeight: '600' }}>
                        Week {baseWeek + week}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {weekTasks.map((task: any) => (
                          <Card
                            key={task.id}
                            onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                                <div style={{ minWidth: '24px', paddingTop: '2px', display: 'flex', alignItems: 'center' }}>
                                  <input
                                    type="checkbox"
                                    checked={task.status === 'Completed'}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      completeWeeklyTask(task.id);
                                    }}
                                    style={{
                                      cursor: 'pointer',
                                      width: '20px',
                                      height: '20px',
                                      minWidth: '20px',
                                      flexShrink: 0,
                                    }}
                                    aria-label={`Mark "${task.title}" as ${task.status === 'Completed' ? 'incomplete' : 'complete'}`}
                                  />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{TRACK_ICONS[task.track] || '📌'}</span>
                                    <h4 style={{
                                      margin: 0,
                                      fontSize: '13px',
                                      fontWeight: '600',
                                      textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                                      color: task.status === 'Completed' ? 'rgba(232,237,243,0.5)' : '#E8EDF3',
                                    }}>
                                      {task.title}
                                    </h4>
                                  </div>
                                  <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: 'rgba(232,237,243,0.5)', lineHeight: '1.4' }}>
                                    {task.description}
                                  </p>
                                </div>
                              </div>
                              <div style={{ flexShrink: 0, paddingTop: '2px' }}>
                                <StatusPill status={task.status} size="sm" />
                              </div>
                            </div>

                            {/* Expanded details section */}
                            {expandedTaskId === task.id && (
                              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ marginBottom: '12px' }}>
                                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'rgba(232,237,243,0.7)' }}>
                                    📝 Notes & Progress
                                  </label>
                                  <textarea
                                    value={taskNotes[task.id] || task.notes || ''}
                                    onChange={(e) => setTaskNotes({ ...taskNotes, [task.id]: e.target.value })}
                                    placeholder="Add notes, blockers, or progress updates..."
                                    style={{
                                      width: '100%',
                                      minHeight: '80px',
                                      padding: '8px',
                                      fontSize: '12px',
                                      borderRadius: '6px',
                                      border: '1px solid rgba(8, 124, 250, 0.2)',
                                      background: 'rgba(8, 124, 250, 0.05)',
                                      color: '#E8EDF3',
                                      fontFamily: 'inherit',
                                      resize: 'vertical',
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      ) : (
        // Milestones View (Original)
        <>
          {phases.map((phase) => {
            const progress = getPhaseProgress(phase);
            const phaseItems = milestones.filter((m: any) => m.phase === phase);
            const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

            return (
              <div key={phase} style={{ marginBottom: '32px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{phaseIcon[phase]}</span>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: phaseColor[phase] }}>
                      {phase.charAt(0).toUpperCase() + phase.slice(1)} Phase
                    </h2>
                    <span style={{ color: '#999', fontSize: '12px' }}>
                      {progress.completed}/{progress.total}
                    </span>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '6px', overflow: 'hidden' }}>
                    <div
                      style={{
                        background: phaseColor[phase],
                        height: '100%',
                        width: `${percentage}%`,
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {phaseItems.map((milestone: any) => (
                    <Card key={milestone.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                            {milestone.title}
                          </h3>
                          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
                            {milestone.description}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <StatusPill status={milestone.status} size="sm" />
                          {milestone.status !== 'Completed' && (
                            <Button
                              onClick={() => {
                                if (milestone.status === 'Not Started') {
                                  updateMilestoneStatus(milestone.id, 'In Progress');
                                } else if (milestone.status === 'In Progress') {
                                  updateMilestoneStatus(milestone.id, 'Completed');
                                }
                              }}
                              variant="primary"
                              size="sm"
                            >
                              {milestone.status === 'Not Started' ? 'Start' : 'Complete'}
                            </Button>
                          )}
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
    </div>
  );
}
