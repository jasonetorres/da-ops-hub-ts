import { useState } from 'react';
import type { Champion, ChampionStatus } from '../../types/domain';
import { useDataStore } from '../../stores/dataStore';
import { useAppStore } from '../../stores/appStore';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Button from '../common/Button';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';

export default function ChampionsView() {
  const { champions, addChampion, updateChampion, deleteChampion } = useDataStore();
  const { championsFilter, setChampionsFilter } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Champion>>({
    name: '',
    handle: '',
    platform: 'Twitter/X',
    status: 'Identified',
    audience: '',
    contentType: '',
    tags: [],
    notes: '',
    lastContact: new Date().toISOString().split('T')[0],
  });

  const statuses: ChampionStatus[] = ['Identified', 'Contacted', 'Engaged', 'Champion'];
  const platforms = ['Twitter/X', 'Reddit', 'YouTube', 'GitHub', 'LinkedIn', 'Discord', 'Dev.to'] as const;

  const filteredChampions =
    championsFilter === 'all' ? champions : champions.filter((c: Champion) => c.status === championsFilter);

  const handleAdd = () => {
    if (formData.name && formData.handle) {
      const newChampion: Champion = {
        id: Date.now().toString(),
        name: formData.name,
        handle: formData.handle,
        platform: formData.platform || 'Twitter/X',
        status: formData.status || 'Identified',
        audience: formData.audience || '',
        contentType: formData.contentType || '',
        tags: formData.tags || [],
        notes: formData.notes || '',
        lastContact: formData.lastContact || new Date().toISOString().split('T')[0],
      };
      addChampion(newChampion);
      setShowModal(false);
      setFormData({ name: '', handle: '', platform: 'Twitter/X', status: 'Identified' });
    }
  };

  const handleEdit = (champion: Champion) => {
    setFormData(champion);
    setEditingId(champion.id);
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (editingId && formData.name) {
      updateChampion(editingId, formData as Champion);
      setShowModal(false);
      setEditingId(null);
      setFormData({});
    }
  };

  return (
    <div className="view">
      <SectionHeader
        icon="🏆"
        title="Champions CRM"
        subtitle="Manage developer relationships and community advocates"
        action={
          <Button onClick={() => setShowModal(true)} variant="primary">
            + Add Champion
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['all', ...statuses].map((status) => (
          <button
            key={status}
            onClick={() => setChampionsFilter(status)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: championsFilter === status ? '1px solid #087CFA' : '1px solid rgba(255,255,255,0.1)',
              background: championsFilter === status ? 'rgba(8, 124, 250, 0.15)' : 'transparent',
              color: championsFilter === status ? '#087CFA' : '#999',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filteredChampions.length > 0 ? (
          filteredChampions.map((champion: Champion) => (
            <Card key={champion.id}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>{champion.name}</h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>@{champion.handle}</p>
                  </div>
                  <StatusPill status={champion.status} size="sm" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px', fontSize: '12px', color: 'rgba(232,237,243,0.7)' }}>
                <span>📱 {champion.platform}</span>
                <span>👥 {champion.audience}</span>
                <span>📝 {champion.contentType}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Button onClick={() => handleEdit(champion)} variant="secondary" size="sm">
                  Edit
                </Button>
                <Button onClick={() => deleteChampion(champion.id)} variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#999' }}>
            No champions found
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({});
        }}
        title={editingId ? 'Edit Champion' : 'Add Champion'}
        actions={
          <>
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={editingId ? handleUpdate : handleAdd} variant="primary">
              {editingId ? 'Update' : 'Add'}
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            type="text"
            placeholder="Handle (e.g., @username)"
            value={formData.handle || ''}
            onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
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
            value={formData.platform || 'Twitter/X'}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as Champion['platform'] })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          >
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Audience (e.g., Frontend Devs)"
            value={formData.audience || ''}
            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
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
            type="text"
            placeholder="Content Type (e.g., Tutorials)"
            value={formData.contentType || ''}
            onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
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
            value={formData.status || 'Identified'}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ChampionStatus })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
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
