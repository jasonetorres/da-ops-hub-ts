import { useState } from 'react';
import type { Signal } from '../../types/domain';
import { useDataStore } from '../../stores/dataStore';
import { useAppStore } from '../../stores/appStore';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Button from '../common/Button';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';

export default function SignalsView() {
  const { signals, addSignal, markSignalReported } = useDataStore();
  const { signalsFilter, setSignalsFilter } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    source: 'twitter',
    content: '',
    sentiment: 'neutral' as const,
    priority: 'medium' as const,
  });

  const priorities = ['low', 'medium', 'high', 'critical'];
  const sentiments = ['negative', 'neutral', 'positive'];
  const sources = ['twitter', 'github', 'reddit', 'hacker-news', 'discord'];

  const priorityColor: Record<string, string> = {
    low: '#21D789',
    medium: '#FC801D',
    high: '#FC318C',
    critical: '#FC318C',
  };

  const sentimentIcon: Record<string, string> = {
    negative: '😞',
    neutral: '😐',
    positive: '😊',
  };

  const filteredSignals =
    signalsFilter === 'all'
      ? signals
      : signals.filter(
          (s) =>
            (signalsFilter === 'urgent' && ['high', 'critical'].includes(s.priority)) ||
            (signalsFilter === s.priority),
        );

  const handleAdd = () => {
    if (formData.content) {
      const newSignal: Signal = {
        id: Date.now().toString(),
        source: formData.source as any,
        content: formData.content,
        sentiment: formData.sentiment,
        priority: formData.priority,
        reported: false,
        createdAt: new Date(),
      };
      addSignal(newSignal);
      setShowModal(false);
      setFormData({ source: 'twitter', content: '', sentiment: 'neutral', priority: 'medium' });
    }
  };

  return (
    <div className="view">
      <SectionHeader
        icon="📡"
        title="Community Signals"
        subtitle="Monitor mentions and escalate to product team"
        action={
          <Button onClick={() => setShowModal(true)} variant="primary">
            + Log Signal
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['all', 'urgent', ...priorities].map((filter) => (
          <button
            key={filter}
            onClick={() => setSignalsFilter(filter)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: signalsFilter === filter ? '1px solid #087CFA' : '1px solid rgba(255,255,255,0.1)',
              background: signalsFilter === filter ? 'rgba(8, 124, 250, 0.15)' : 'transparent',
              color: signalsFilter === filter ? '#087CFA' : '#999',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSignals.length > 0 ? (
          filteredSignals.map((signal) => (
            <Card key={signal.id}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#E8EDF3', lineHeight: 1.5 }}>{signal.content}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>{signal.source}</span>
                  <span>{sentimentIcon[signal.sentiment]}</span>
                  <div style={{ flex: 1 }} />
                  <StatusPill status={signal.priority} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {!signal.reported && (
                  <Button
                    onClick={() => markSignalReported(signal.id)}
                    variant="primary"
                    size="sm"
                  >
                    ✓ Mark Reported
                  </Button>
                )}
                {signal.reported && (
                  <span style={{ fontSize: '12px', color: '#21D789' }}>✓ Reported</span>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No signals found</div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setFormData({ source: 'twitter', content: '', sentiment: 'neutral', priority: 'medium' });
        }}
        title="Log Community Signal"
        actions={
          <>
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleAdd} variant="primary">
              Log Signal
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea
            placeholder="What's the signal? (mention, complaint, feature request, etc.)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
              minHeight: '100px',
              fontFamily: 'inherit',
              resize: 'none',
            }}
          />
          <select
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={formData.sentiment}
            onChange={(e) => setFormData({ ...formData, sentiment: e.target.value as any })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          >
            {sentiments.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </Modal>
    </div>
  );
}
