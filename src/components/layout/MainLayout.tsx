import { useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0D1117', color: '#E8EDF3' }}>
      {/* Mobile hamburger */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 1000,
            padding: '8px',
            background: '#087CFA',
            border: 'none',
            borderRadius: '4px',
            color: '#E8EDF3',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          ☰
        </button>
      )}

      {/* Sidebar overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: isMobile ? 'fixed' : 'relative',
          left: isMobile && !sidebarOpen ? '-100%' : 0,
          zIndex: isMobile ? 1001 : 0,
          transition: 'left 0.3s',
        }}
      >
        <Sidebar
          items={navItems}
          currentTab={currentTab}
          onTabChange={(tab: string) => {
            onTabChange(tab);
            if (isMobile) setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: isMobile ? '60px 16px 16px' : '32px',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </div>
  );
}
