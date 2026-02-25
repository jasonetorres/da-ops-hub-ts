import { useState } from 'react';
import { useDataStore } from '../../stores/dataStore';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';
import StatusPill from '../common/StatusPill';

export default function OKRsDashboardView() {
  const { okrs, updateKeyResult, getOKRProgress } = useDataStore();
  const [editingKR, setEditingKR] = useState<{ okrId: string; krId: string } | null>(null);
  const [newValue, setNewValue] = useState<number>(0);

  const phases: ('30-day' | '60-day' | '90-day')[] = ['30-day', '60-day', '90-day'];

  return (
    <div className="view">
      <SectionHeader
        icon="🎪"
        title="OKRs & Key Results"
        subtitle="Track objectives and progress towards success metrics"
      />

      {phases.map((phase: any) => {
        const phaseOKRs = okrs.filter((o: any) => o.phase === phase);
        if (phaseOKRs.length === 0) return null;

        return (
          <div key={phase} style={{ marginBottom: '32px' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: phase === '30-day' ? '#087CFA' : phase === '60-day' ? '#FC801D' : '#FC318C' }}>
              {phase.toUpperCase()} Phase OKRs
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {phaseOKRs.map((okr: any) => {
                const progress = getOKRProgress(okr.id);
                return (
                  <Card key={okr.id}>
                    {/* OKR Header */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
                          {okr.title}
                        </h3>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: progress > 66 ? '#21D789' : progress > 33 ? '#FC801D' : '#87CEEB' }}>
                            {progress}%
                          </div>
                          <StatusPill status={okr.status} size="sm" />
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
                        {okr.description}
                      </p>
                      <div style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(232,237,243,0.5)' }}>
                        Owner: <strong>{okr.owner}</strong> | Success: {okr.successMetric}
                      </div>
                    </div>

                    {/* Key Results */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {okr.keyResults.map((kr: any) => {
                        const percentage = kr.target > 0 ? Math.round((kr.current / kr.target) * 100) : 0;
                        const isEditing = editingKR?.okrId === okr.id && editingKR?.krId === kr.id;

                        return (
                          <div
                            key={kr.id}
                            style={{
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              borderRadius: '6px',
                              padding: '12px',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                              <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', flex: 1 }}>
                                {kr.description}
                              </p>
                              <div style={{ fontSize: '14px', fontWeight: '700', color: '#087CFA', marginLeft: '12px' }}>
                                {kr.current}/{kr.target} {kr.unit}
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                              <div
                                style={{
                                  background: percentage >= 100 ? '#21D789' : percentage >= 50 ? '#FC801D' : '#087CFA',
                                  height: '100%',
                                  width: `${Math.min(percentage, 100)}%`,
                                  transition: 'width 0.3s',
                                }}
                              />
                            </div>

                            <div style={{ fontSize: '11px', color: 'rgba(232,237,243,0.5)', textAlign: 'right', marginBottom: '8px' }}>
                              {percentage}%
                            </div>

                            {/* Edit Current Value */}
                            {isEditing ? (
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <input
                                  type="number"
                                  value={newValue}
                                  onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
                                  style={{
                                    flex: 1,
                                    padding: '4px 8px',
                                    fontSize: '12px',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: '#E8EDF3',
                                    border: '1px solid #087CFA',
                                    borderRadius: '4px',
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    updateKeyResult(okr.id, kr.id, { current: newValue });
                                    setEditingKR(null);
                                  }}
                                  style={{
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    background: '#087CFA',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingKR(null)}
                                  style={{
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: '#E8EDF3',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingKR({ okrId: okr.id, krId: kr.id });
                                  setNewValue(kr.current);
                                }}
                                style={{
                                  padding: '4px 8px',
                                  fontSize: '11px',
                                  background: 'rgba(132, 204, 250, 0.2)',
                                  color: '#087CFA',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                }}
                              >
                                Update Progress
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
