import Card from './Card';

interface PillarCardProps {
  name: string;
  description: string;
  tenets?: string[];
  color?: string;
  ideas?: any[];
  metrics?: string[];
  weight?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  expanded?: boolean;
  onToggleExpand?: () => void;
}

export default function PillarCard({
  name,
  description,
  tenets,
  color = '#087CFA',
  ideas,
  metrics,
  weight,
  onEdit,
  onDelete,
  expanded = false,
  onToggleExpand,
}: PillarCardProps) {
  return (
    <Card
      onClick={onToggleExpand}
      className="cursor-pointer hover:scale-105 transition-transform"
    >
      <div style={{ borderLeft: `4px solid ${color}`, paddingLeft: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#E8EDF3' }}>
            {name}
          </h3>
          {weight && (
            <span style={{ fontSize: '12px', color: '#999', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
              {weight}%
            </span>
          )}
        </div>

        <p style={{ margin: 0, fontSize: '13px', color: 'rgba(232,237,243,0.7)', marginBottom: '12px' }}>
          {description}
        </p>

        {expanded && tenets && tenets.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            {tenets.map((tenet, idx) => (
              <div
                key={idx}
                style={{
                  fontSize: '12px',
                  color: 'rgba(232,237,243,0.6)',
                  marginBottom: '6px',
                  paddingLeft: '12px',
                  borderLeft: '2px solid rgba(132, 204, 250, 0.3)',
                }}
              >
                • {tenet}
              </div>
            ))}
          </div>
        )}

        {expanded && ideas && ideas.length > 0 && (
          <div style={{ marginBottom: '12px', fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
            <strong>Ideas ({ideas.length}):</strong>
            {ideas.slice(0, 3).map((idea, idx) => (
              <div key={idx} style={{ marginTop: '4px', paddingLeft: '12px' }}>
                - {idea.title || idea.name || 'Untitled'}
              </div>
            ))}
            {ideas.length > 3 && <div style={{ marginTop: '4px', paddingLeft: '12px', fontStyle: 'italic' }}>+{ideas.length - 3} more</div>}
          </div>
        )}

        {expanded && metrics && metrics.length > 0 && (
          <div style={{ marginBottom: '12px', fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
            <strong>Metrics:</strong>
            {metrics.map((metric, idx) => (
              <div key={idx} style={{ marginTop: '4px', paddingLeft: '12px' }}>
                ✓ {metric}
              </div>
            ))}
          </div>
        )}

        {(onEdit || onDelete) && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                style={{
                  padding: '4px 12px',
                  fontSize: '11px',
                  background: '#087CFA',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                style={{
                  padding: '4px 12px',
                  fontSize: '11px',
                  background: '#FC318C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
