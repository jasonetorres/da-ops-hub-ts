import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({ icon, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>{icon}</span>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#E8EDF3' }}>{title}</h1>
        </div>
        {subtitle && <p style={{ margin: 0, fontSize: '13px', color: 'rgba(232, 237, 243, 0.6)' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
