import { useState } from 'react';
import type { Intel } from '../../types/domain';
import { useDataStore } from '../../stores/dataStore';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Button from '../common/Button';
import SectionHeader from '../common/SectionHeader';

export default function IntelView() {
  const { intel, updateIntel } = useDataStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    competitor: '',
    strengths: '',
    weaknesses: '',
    opportunities: '',
  });

  const handleEdit = (item: Intel) => {
    setFormData({
      competitor: item.competitor,
      strengths: (item.strengths || []).join(', '),
      weaknesses: (item.weaknesses || []).join(', '),
      opportunities: (item.opportunities || []).join(', '),
    });
    setEditingId(item.id);
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (editingId && formData.competitor) {
      updateIntel(editingId, {
        competitor: formData.competitor,
        strengths: formData.strengths.split(',').map((s) => s.trim()),
        weaknesses: formData.weaknesses.split(',').map((s) => s.trim()),
        opportunities: formData.opportunities.split(',').map((s) => s.trim()),
      });
      setShowModal(false);
      setEditingId(null);
      setFormData({ competitor: '', strengths: '', weaknesses: '', opportunities: '' });
    }
  };

  return (
    <div className="view">
      <SectionHeader icon="⚔️" title="Competitive Intel" subtitle="VS Code, Cursor, Zed battlecards" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {intel.map((item) => (
          <Card key={item.id}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>{item.competitor}</h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'rgba(232,237,243,0.5)' }}>Competitive Battlecard</p>
            </div>

            {item.strengths && item.strengths.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#21D789' }}>💪 Strengths ({item.strengths.length})</p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: 'rgba(232,237,243,0.8)', lineHeight: '1.5' }}>
                  {item.strengths.slice(0, 3).map((s, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{s}</li>
                  ))}
                  {item.strengths.length > 3 && <li style={{ color: '#999', fontStyle: 'italic' }}>+{item.strengths.length - 3} more</li>}
                </ul>
              </div>
            )}

            {item.weaknesses && item.weaknesses.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#FC318C' }}>⚠️ Weaknesses ({item.weaknesses.length})</p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: 'rgba(232,237,243,0.8)', lineHeight: '1.5' }}>
                  {item.weaknesses.slice(0, 3).map((w, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{w}</li>
                  ))}
                  {item.weaknesses.length > 3 && <li style={{ color: '#999', fontStyle: 'italic' }}>+{item.weaknesses.length - 3} more</li>}
                </ul>
              </div>
            )}

            {item.opportunities && item.opportunities.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#FC801D' }}>🎯 Opportunities ({item.opportunities.length})</p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: 'rgba(232,237,243,0.8)', lineHeight: '1.5' }}>
                  {item.opportunities.slice(0, 3).map((o, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{o}</li>
                  ))}
                  {item.opportunities.length > 3 && <li style={{ color: '#999', fontStyle: 'italic' }}>+{item.opportunities.length - 3} more</li>}
                </ul>
              </div>
            )}

            <Button onClick={() => handleEdit(item)} variant="secondary" size="sm">
              View Full Battlecard
            </Button>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ competitor: '', strengths: '', weaknesses: '', opportunities: '' });
        }}
        title="Edit Battlecard"
        actions={
          <>
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} variant="primary">
              Update
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Competitor Name"
            value={formData.competitor}
            onChange={(e) => setFormData({ ...formData, competitor: e.target.value })}
            disabled
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#999',
              fontSize: '13px',
            }}
          />
          <textarea
            placeholder="Strengths (comma-separated)"
            value={formData.strengths}
            onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
              minHeight: '60px',
              fontFamily: 'inherit',
              resize: 'none',
            }}
          />
          <textarea
            placeholder="Weaknesses (comma-separated)"
            value={formData.weaknesses}
            onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
              minHeight: '60px',
              fontFamily: 'inherit',
              resize: 'none',
            }}
          />
          <textarea
            placeholder="Opportunities (comma-separated)"
            value={formData.opportunities}
            onChange={(e) => setFormData({ ...formData, opportunities: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
              minHeight: '60px',
              fontFamily: 'inherit',
              resize: 'none',
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
