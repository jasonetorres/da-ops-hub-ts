import { useState } from 'react';
import type { CommunityQuestion, QACategory, QASource } from '../../types/domain';
import { useDataStore } from '../../stores/dataStore';
import { useAppStore } from '../../stores/appStore';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Button from '../common/Button';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';

export default function CommunityQAView() {
  const { communityQuestions, addCommunityQuestion, updateCommunityQuestion, deleteCommunityQuestion } = useDataStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QACategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Unanswered' | 'Answered' | 'Content Published' | 'FAQ Published'>('all');
  const [formData, setFormData] = useState<Partial<CommunityQuestion>>({
    source: 'Slack',
    question: '',
    sourceHandle: '',
    category: 'Other',
    responseFramework: '',
    tags: [],
    status: 'Unanswered',
  });

  const categories: QACategory[] = ['Cursor Positioning', 'WebStorm Features', 'AI/Inference', 'Competitive', 'Performance', 'TypeScript', 'Monorepo', 'Pricing', 'Other'];
  const sources: QASource[] = ['Slack', 'Reddit', 'Discord', 'Twitter/X', 'GitHub Discussions', 'Email', 'Conference', 'Meetup'];
  const statuses = ['Unanswered', 'Answered', 'Content Published', 'FAQ Published'] as const;

  const filteredQuestions = communityQuestions.filter((q) => {
    const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || q.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const handleAdd = () => {
    if (formData.question) {
      const newQuestion: CommunityQuestion = {
        id: Date.now().toString(),
        question: formData.question,
        source: formData.source || 'Slack',
        sourceHandle: formData.sourceHandle || '',
        category: formData.category || 'Other',
        responseFramework: formData.responseFramework || '',
        tags: formData.tags || [],
        dateAsked: new Date().toISOString().split('T')[0],
        status: formData.status || 'Unanswered',
        upvotes: 0,
        reshares: 0,
        replies: 0,
        linkedSignalId: undefined,
        linkedContentId: undefined,
        notes: '',
      };
      addCommunityQuestion(newQuestion);
      setShowModal(false);
      setFormData({ source: 'Slack', question: '', sourceHandle: '', category: 'Other', responseFramework: '', tags: [], status: 'Unanswered' });
    }
  };

  const statusColor: Record<string, string> = {
    'Unanswered': '#FF6B6B',
    'Answered': '#4ECDC4',
    'Content Published': '#45B7D1',
    'FAQ Published': '#96CEB4',
  };

  return (
    <div className="view">
      <SectionHeader
        icon="❓"
        title="Community Q&A"
        subtitle="Capture recurring questions and response frameworks for knowledge building"
        action={
          <Button onClick={() => setShowModal(true)} variant="primary">
            + Add Question
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#999', marginRight: '8px' }}>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as QACategory | 'all')}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#E8EDF3',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#999', marginRight: '8px' }}>Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#E8EDF3',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q: CommunityQuestion) => (
            <Card key={q.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '600' }}>{q.question}</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
                    {q.source} • {q.category} • {q.dateAsked}
                    {q.sourceHandle && ` • @${q.sourceHandle}`}
                  </p>
                </div>
                <StatusPill status={q.status} />
              </div>

              {q.responseFramework && (
                <div style={{ margin: '12px 0', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '13px', color: 'rgba(232,237,243,0.8)', lineHeight: '1.5' }}>
                  <strong>Response Framework:</strong>
                  <div style={{ marginTop: '8px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '12px' }}>
                    {q.responseFramework}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px', margin: '12px 0', fontSize: '12px', color: 'rgba(232,237,243,0.7)' }}>
                <div>👍 {q.upvotes} upvotes</div>
                <div>↗️ {q.reshares} reshares</div>
                <div>💬 {q.replies} replies</div>
              </div>

              {q.tags && q.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', margin: '12px 0', flexWrap: 'wrap' }}>
                  {q.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: '11px', background: 'rgba(8,124,250,0.2)', color: '#087CFA', padding: '4px 8px', borderRadius: '4px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <Button
                  onClick={() => {
                    setFormData(q);
                    setShowModal(true);
                  }}
                  variant="secondary"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteCommunityQuestion(q.id)}
                  variant="secondary"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No questions found</div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setFormData({ source: 'Slack', question: '', sourceHandle: '', category: 'Other', responseFramework: '', tags: [], status: 'Unanswered' });
        }}
        title={formData.id ? 'Edit Question' : 'Add Question'}
        actions={
          <>
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleAdd} variant="primary">
              {formData.id ? 'Update' : 'Add'}
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea
            placeholder="Question"
            value={formData.question || ''}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
              minHeight: '60px',
              resize: 'vertical',
            }}
          />

          <input
            type="text"
            placeholder="Source Handle (e.g., ChrisNowicki, username)"
            value={formData.sourceHandle || ''}
            onChange={(e) => setFormData({ ...formData, sourceHandle: e.target.value })}
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
            value={formData.source || 'Slack'}
            onChange={(e) => setFormData({ ...formData, source: e.target.value as QASource })}
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
            value={formData.category || 'Other'}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as QACategory })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={formData.status || 'Unanswered'}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
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
            placeholder="Response Framework (markdown)"
            value={formData.responseFramework || ''}
            onChange={(e) => setFormData({ ...formData, responseFramework: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
              minHeight: '100px',
              resize: 'vertical',
            }}
          />

          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={(formData.tags || []).join(', ')}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map((t) => t.trim()).filter(t => t) })}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#E8EDF3',
              fontSize: '13px',
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
