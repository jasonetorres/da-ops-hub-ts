import { useState } from 'react';
import type { Content, ContentType, ContentStatus } from '../../types/domain';
import { useDataStore } from '../../stores/dataStore';
import { useAppStore } from '../../stores/appStore';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Button from '../common/Button';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';

export default function ContentView() {
  const { content, addContent, updateContent, deleteContent } = useDataStore();
  const { contentFilter, setContentFilter } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Content>>({
    title: '',
    type: 'Blog Post',
    pillar: '',
    status: 'Idea',
    dueDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const contentTypes: ContentType[] = ['Blog Post', 'Video', 'Tweet', 'Talk', 'Podcast', 'Guide'];
  const statuses: ContentStatus[] = ['Idea', 'Drafting', 'Review', 'Scheduled', 'Published'];

  const filteredContent =
    contentFilter === 'all' ? content : content.filter((c: Content) => c.status === contentFilter);

  const handleAdd = () => {
    if (formData.title && formData.type) {
      const newContent: Content = {
        id: Date.now().toString(),
        title: formData.title,
        type: formData.type || 'Blog Post',
        pillar: formData.pillar || '',
        status: formData.status || 'Idea',
        dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
        notes: formData.notes || '',
      };
      addContent(newContent);
      setShowModal(false);
      setFormData({ title: '', type: 'Blog Post', status: 'Idea' });
    }
  };

  const handleEdit = (item: Content) => {
    setFormData(item);
    setEditingId(item.id);
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (editingId && formData.title) {
      updateContent(editingId, formData as Content);
      setShowModal(false);
      setEditingId(null);
      setFormData({});
    }
  };

  const contentIcon: Record<string, string> = {
    'Blog Post': '📝',
    'Video': '🎬',
    'Tweet': '🐦',
    'Talk': '🎤',
    'Podcast': '🎙️',
    'Guide': '📚',
  };

  return (
    <div className="view">
      <SectionHeader
        icon="📝"
        title="Content Pipeline"
        subtitle="Track blog posts, videos, talks across statuses"
        action={
          <Button onClick={() => setShowModal(true)} variant="primary">
            + New Content
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['all', ...statuses].map((status) => (
          <button
            key={status}
            onClick={() => setContentFilter(status)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: contentFilter === status ? '1px solid #087CFA' : '1px solid rgba(255,255,255,0.1)',
              background: contentFilter === status ? 'rgba(8, 124, 250, 0.15)' : 'transparent',
              color: contentFilter === status ? '#087CFA' : '#999',
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredContent.length > 0 ? (
          filteredContent.map((item: Content) => (
            <Card key={item.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span>{contentIcon[item.type] || '📄'}</span>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>{item.title}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
                    {item.type} • {item.pillar} • Due: {item.dueDate}
                  </p>
                </div>
                <StatusPill status={item.status} />
              </div>

              {item.notes && (
                <p style={{ margin: '8px 0', fontSize: '12px', color: 'rgba(232,237,243,0.7)' }}>
                  {item.notes}
                </p>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <Button onClick={() => handleEdit(item)} variant="secondary" size="sm">
                  Edit
                </Button>
                <Button onClick={() => deleteContent(item.id)} variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No content found</div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({});
        }}
        title={editingId ? 'Edit Content' : 'Add Content'}
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
          <select
            value={formData.type || 'Blog Post'}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as ContentType })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          >
            {contentTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Pillar (e.g., Productivity ROI)"
            value={formData.pillar || ''}
            onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
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
            type="date"
            placeholder="Due Date"
            value={formData.dueDate || ''}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
            value={formData.status || 'Idea'}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
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
