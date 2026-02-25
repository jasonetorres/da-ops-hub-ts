interface SidebarProps {
  items: Array<{ id: string; icon: string; label: string }>;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ items, currentTab, onTabChange }: SidebarProps) {
  return (
    <nav
      style={{
        width: '240px',
        background: 'rgba(20, 30, 50, 0.6)',
        borderRight: '1px solid rgba(255, 255, 255, 0.07)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        gap: '8px',
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '12px 0 24px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>
          WebStorm DA Ops Hub
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
          Developer Advocacy Toolkit
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            style={{
              all: 'unset',
              padding: '12px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              fontWeight: currentTab === item.id ? '600' : '500',
              color: currentTab === item.id ? '#E8EDF3' : 'rgba(232,237,243,0.7)',
              background: currentTab === item.id ? 'rgba(8,124,250,0.15)' : 'transparent',
              border: currentTab === item.id ? '1px solid rgba(8,124,250,0.3)' : 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (currentTab !== item.id) {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentTab !== item.id) {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
