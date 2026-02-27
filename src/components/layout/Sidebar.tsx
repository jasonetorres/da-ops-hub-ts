interface SidebarProps {
  items: Array<{ id: string; icon: string; label: string }>;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ items, currentTab, onTabChange }: SidebarProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <nav
      style={{
        width: isMobile ? '240px' : '240px',
        minWidth: '240px',
        background: 'rgba(20, 30, 50, 0.6)',
        borderRight: '1px solid rgba(255, 255, 255, 0.07)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        gap: '8px',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100vh',
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            style={{
              all: 'unset',
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              fontWeight: currentTab === item.id ? '600' : '500',
              color: currentTab === item.id ? '#E8EDF3' : 'rgba(232,237,243,0.65)',
              background: currentTab === item.id ? 'linear-gradient(135deg, rgba(8,124,250,0.2) 0%, rgba(8,124,250,0.12) 100%)' : 'transparent',
              border: currentTab === item.id ? '1px solid rgba(8,124,250,0.35)' : '1px solid transparent',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              if (currentTab !== item.id) {
                el.style.background = 'rgba(255, 255, 255, 0.06)';
                el.style.color = 'rgba(232,237,243,0.85)';
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              if (currentTab !== item.id) {
                el.style.background = 'transparent';
                el.style.color = 'rgba(232,237,243,0.65)';
              }
            }}
          >
            <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
            <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
