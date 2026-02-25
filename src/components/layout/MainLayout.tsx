import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  navItems: Array<{ id: string; icon: string; label: string }>;
  currentTab: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

export default function MainLayout({
  navItems,
  currentTab,
  onTabChange,
  children,
}: MainLayoutProps) {
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0D1117', color: '#E8EDF3' }}>
      <Sidebar
        items={navItems}
        currentTab={currentTab}
        onTabChange={onTabChange}
      />
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </main>
    </div>
  );
}
