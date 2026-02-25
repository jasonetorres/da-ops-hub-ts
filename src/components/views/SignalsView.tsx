import { useState } from 'react';
import type { Signal, SignalSource, Sentiment, SignalPriority } from '../../types/domain';
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
  const [formData, setFormData] = useState<Partial<Signal>>({
    source: 'Twitter/X',
    title: '',
    url: '',
    sentiment: 'Neutral',
    category: '',
    priority: 'Medium',
    notes: '',
  });

  const priorities: SignalPriority[] = ['Low', 'Medium', 'High'];
  const sentiments: Sentiment[] = ['Negative', 'Neutral', 'Positive'];
  const sources: SignalSource[] = ['Twitter/X', 'Reddit', 'GitHub', 'Stack Overflow', 'Discord', 'Blog Comment', 'YouTrack'];

  const sentimentIcon: Record<Sentiment, string> = {
    Negative: '😞',
    Neutral: '😐',
    Positive: '😊',
  };

  const filteredSignals =
    signalsFilter === 'all'
      ? signals
      : signals.filter(
          (s: Signal) =>
            (signalsFilter === 'urgent' && s.priority === 'High') ||
            (signalsFilter === s.priority),
        );

  const handleAdd = () => {
    if (formData.title && formData.url) {
      const newSignal: Signal = {
        id: Date.now().toString(),
        source: formData.source || 'Twitter/X',
        title: formData.title,
        url: formData.url,
        sentiment: formData.sentiment || 'Neutral',
        category: formData.category || '',
        priority: formData.priority || 'Medium',
        reportedToProduct: false,
        notes: formData.notes || '',
        date: new Date().toISOString().split('T')[0],
      };
      addSignal(newSignal);
      setShowModal(false);
      setFormData({ source: 'Twitter/X', title: '', url: '', sentiment: 'Neutral', priority: 'Medium' });
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
            + Add Signal
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['all', 'urgent', ...priorities].map((priority) => (
          <button
            key={priority}
            onClick={() => setSignalsFilter(priority)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: signalsFilter === priority ? '1px solid #087CFA' : '1px solid rgba(255,255,255,0.1)',
              background: signalsFilter === priority ? 'rgba(8, 124, 250, 0.15)' : 'transparent',
              color: signalsFilter === priority ? '#087CFA' : '#999',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSignals.length > 0 ? (
          filteredSignals.map((signal: Signal) => (
            <Card key={signal.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span>{sentimentIcon[signal.sentiment]}</span>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>{signal.title}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
                    {signal.source} • {signal.category} • {signal.date}
                  </p>
                </div>
                <StatusPill status={signal.priority} />
              </div>

              <p style={{ margin: '8px 0', fontSize: '12px', color: 'rgba(232,237,243,0.7)' }}>
                <a href={signal.url} target="_blank" rel="noopener noreferrer" style={{ color: '#087CFA', textDecoration: 'none' }}>
                  View Signal →
                </a>
              </p>

              {signal.notes && (
                <p style={{ margin: '8px 0', fontSize: '12px', color: 'rgba(232,237,243,0.7)' }}>
                  {signal.notes}
                </p>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {!signal.reportedToProduct && (
                  <Button onClick={() => markSignalReported(signal.id)} variant="primary" size="sm">
                    Mark as Reported
                  </Button>
                )}
                {signal.reportedToProduct && (
                  <StatusPill status="Reported" size="sm" />
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
          setFormData({});
        }}
        title="Add Signal"
        actions={
          <>
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleAdd} variant="primary">
              Add
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          />
          <input
            type="url"
            placeholder="URL"
            value={formData.url || ''}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          />
          <select
            value={formData.source || 'Twitter/X'}
            onChange={(e) => setFormData({ ...formData, source: e.target.value as SignalSource })}
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
          <input
            type="text"
            placeholder="Category"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          />
          <select
            value={formData.sentiment || 'Neutral'}
            onChange={(e) => setFormData({ ...formData, sentiment: e.target.value as Sentiment })}
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
            value={formData.priority || 'Medium'}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as SignalPriority })}
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
          <textarea
            placeholder="Notes"
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
              minHeight: '80px',
              resize: 'vertical',
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
