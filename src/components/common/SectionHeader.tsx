import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({ icon, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '12px',
        }}>
          <span style={{
            fontSize: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
          }}>
            {icon}
          </span>
          <h1 style={{
            margin: 0,
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            fontWeight: '700',
            color: '#E8EDF3',
            letterSpacing: '-0.5px',
          }}>
            {title}
          </h1>
        </div>
        {subtitle && (
          <p style={{
            margin: '0 0 0 54px',
            fontSize: '14px',
            color: 'rgba(232, 237, 243, 0.6)',
            lineHeight: '1.5',
          }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div style={{ marginLeft: '16px', display: 'flex', alignItems: 'center' }}>
          {action}
        </div>
      )}
    </div>
  );
}
