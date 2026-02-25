interface StatusPillProps {
  status: string;
  size?: 'sm' | 'md';
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  completed: { bg: 'rgba(33, 215, 137, 0.15)', text: '#21D789' },
  active: { bg: 'rgba(8, 124, 250, 0.15)', text: '#087CFA' },
  pending: { bg: 'rgba(252, 128, 29, 0.15)', text: '#FC801D' },
  archived: { bg: 'rgba(255, 255, 255, 0.08)', text: '#999' },
  urgent: { bg: 'rgba(252, 49, 140, 0.15)', text: '#FC318C' },
};

export default function StatusPill({ status, size = 'md' }: StatusPillProps) {
  const colors = STATUS_COLORS[status.toLowerCase()] || STATUS_COLORS.pending;
  const fontSize = size === 'sm' ? '11px' : '12px';
  const padding = size === 'sm' ? '4px 8px' : '6px 12px';

  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        fontSize,
        fontWeight: '500',
        padding,
        borderRadius: '6px',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
    >
      {status}
    </span>
  );
}
