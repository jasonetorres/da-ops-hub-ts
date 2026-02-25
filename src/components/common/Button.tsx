import type { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export default function Button({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: ButtonProps) {
  const styles = {
    primary: {
      bg: 'rgba(8, 124, 250, 0.2)',
      bgHover: 'rgba(8, 124, 250, 0.3)',
      text: '#087CFA',
      border: '1px solid rgba(8, 124, 250, 0.3)',
    },
    secondary: {
      bg: 'transparent',
      bgHover: 'rgba(255, 255, 255, 0.05)',
      text: '#E8EDF3',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    danger: {
      bg: 'rgba(252, 49, 140, 0.15)',
      bgHover: 'rgba(252, 49, 140, 0.25)',
      text: '#FC318C',
      border: '1px solid rgba(252, 49, 140, 0.3)',
    },
  };

  const selectedStyle = styles[variant];
  const padding = size === 'sm' ? '6px 12px' : '10px 16px';
  const fontSize = size === 'sm' ? '12px' : '13px';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: selectedStyle.bg,
        color: selectedStyle.text,
        border: selectedStyle.border,
        borderRadius: '8px',
        padding,
        fontSize,
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.background = selectedStyle.bgHover;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.background = selectedStyle.bg;
        }
      }}
    >
      {children}
    </button>
  );
}
