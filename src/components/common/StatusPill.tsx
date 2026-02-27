interface StatusPillProps {
  status: string;
  size?: 'sm' | 'md';
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  completed: {
    bg: 'rgba(33, 215, 137, 0.12)',
    text: '#21D789',
    border: '1px solid rgba(33, 215, 137, 0.3)',
  },
  active: {
    bg: 'rgba(8, 124, 250, 0.12)',
    text: '#087CFA',
    border: '1px solid rgba(8, 124, 250, 0.3)',
  },
  pending: {
    bg: 'rgba(252, 128, 29, 0.12)',
    text: '#FC801D',
    border: '1px solid rgba(252, 128, 29, 0.3)',
  },
  archived: {
    bg: 'rgba(255, 255, 255, 0.06)',
    text: 'rgba(232, 237, 243, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  urgent: {
    bg: 'rgba(252, 49, 140, 0.12)',
    text: '#FC318C',
    border: '1px solid rgba(252, 49, 140, 0.3)',
  },
  identified: {
    bg: 'rgba(8, 124, 250, 0.12)',
    text: '#087CFA',
    border: '1px solid rgba(8, 124, 250, 0.3)',
  },
  contacted: {
    bg: 'rgba(252, 128, 29, 0.12)',
    text: '#FC801D',
    border: '1px solid rgba(252, 128, 29, 0.3)',
  },
  engaged: {
    bg: 'rgba(33, 215, 137, 0.12)',
    text: '#21D789',
    border: '1px solid rgba(33, 215, 137, 0.3)',
  },
  champion: {
    bg: 'linear-gradient(135deg, rgba(33, 215, 137, 0.12) 0%, rgba(8, 124, 250, 0.08) 100%)',
    text: '#21D789',
    border: '1px solid rgba(33, 215, 137, 0.3)',
  },
};

export default function StatusPill({ status, size = 'md' }: StatusPillProps) {
  const colors = STATUS_COLORS[status.toLowerCase()] || STATUS_COLORS.pending;
  const fontSize = size === 'sm' ? '11px' : '12px';
  const padding = size === 'sm' ? '5px 10px' : '7px 14px';

  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        fontSize,
        fontWeight: '600',
        padding,
        borderRadius: '6px',
        border: colors.border,
        whiteSpace: 'nowrap',
        display: 'inline-block',
        transition: 'all 0.2s ease',
        textTransform: 'capitalize',
        letterSpacing: '0.3px',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'scale(1.05)';
        el.style.boxShadow = `0 4px 12px ${colors.text}20`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'scale(1)';
        el.style.boxShadow = 'none';
      }}
    >
      {status}
    </span>
  );
}
