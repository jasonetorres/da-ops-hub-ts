import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      background: '#0D1117',
      color: '#E8EDF3',
      overflow: 'hidden',
    }}>
      {/* Mobile hamburger */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'fixed',
            top: '12px',
            left: '12px',
            zIndex: 1002,
            padding: '8px 12px',
            background: '#087CFA',
            border: 'none',
            borderRadius: '4px',
            color: '#E8EDF3',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            minHeight: '40px',
            minWidth: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Toggle sidebar"
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
          left: 0,
          top: 0,
          height: '100vh',
          zIndex: isMobile ? 1001 : 0,
          transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
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
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '100vh',
          maxWidth: isMobile ? '100vw' : 'calc(100vw - 240px)',
        }}
      >
        {children}
      </main>
    </div>
  );
}
