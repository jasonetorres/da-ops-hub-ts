interface ProgressStatProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  progress?: number; // 0-100
  color?: string;
  bgColor?: string;
}

export default function ProgressStat({
  label,
  value,
  unit,
  icon = '📊',
  progress,
  color = '#087CFA',
  bgColor,
}: ProgressStatProps) {
  return (
    <div
      style={{
        background: bgColor || 'rgba(13, 17, 23, 0.5)',
        border: '1px solid rgba(132, 204, 250, 0.2)',
        borderRadius: '8px',
        padding: '16px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '20px' }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', color: 'rgba(232,237,243,0.6)', marginBottom: '4px' }}>
            {label}
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: color }}>
            {value}
            {unit && <span style={{ fontSize: '14px', color: 'rgba(232,237,243,0.6)', marginLeft: '4px' }}>{unit}</span>}
          </div>
        </div>
      </div>

      {progress !== undefined && (
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
          <div
            style={{
              background: color,
              height: '100%',
              width: `${Math.min(progress, 100)}%`,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}
    </div>
  );
}
