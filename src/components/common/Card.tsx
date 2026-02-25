import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'rgba(20, 30, 50, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: '12px',
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
      }}
      className={className}
      onMouseEnter={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLElement).style.background = 'rgba(20, 30, 50, 0.7)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(8, 124, 250, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLElement).style.background = 'rgba(20, 30, 50, 0.5)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.07)';
        }
      }}
    >
      {children}
    </div>
  );
}
