import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export default function Card({ children, className = '', onClick, variant = 'default' }: CardProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const baseStyles = {
    borderRadius: '12px',
    padding: isMobile ? '14px' : '18px',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '100%',
    overflow: 'hidden',
    border: 'none',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: 'rgba(20, 30, 50, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
    },
    elevated: {
      background: 'rgba(30, 41, 59, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    },
    outlined: {
      background: 'transparent',
      border: '1px solid rgba(8, 124, 250, 0.3)',
    },
  };

  const selectedVariant = variantStyles[variant];
  const combinedStyles = { ...baseStyles, ...selectedVariant } as React.CSSProperties;

  return (
    <div
      onClick={onClick}
      style={combinedStyles}
      className={className}
      onMouseEnter={(e) => {
        if (onClick) {
          const el = e.currentTarget as HTMLElement;
          el.style.background = 'rgba(30, 41, 59, 0.8)';
          el.style.borderColor = 'rgba(8, 124, 250, 0.4)';
          el.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
          el.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          const el = e.currentTarget as HTMLElement;
          el.style.background = selectedVariant.background as string;
          el.style.borderColor = (selectedVariant.border as string) || '';
          el.style.boxShadow = (selectedVariant.boxShadow as string) || 'none';
          el.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </div>
  );
}
