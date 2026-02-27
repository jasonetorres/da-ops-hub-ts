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
            top: '14px',
            left: '12px',
            zIndex: 1002,
            padding: '8px',
            background: 'linear-gradient(135deg, rgba(8, 124, 250, 0.2) 0%, rgba(8, 124, 250, 0.15) 100%)',
            border: '1px solid rgba(8, 124, 250, 0.4)',
            borderRadius: '8px',
            color: '#087CFA',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
            minHeight: '40px',
            minWidth: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 12px rgba(8, 124, 250, 0.1)',
          }}
          aria-label="Toggle sidebar"
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'linear-gradient(135deg, rgba(8, 124, 250, 0.3) 0%, rgba(8, 124, 250, 0.25) 100%)';
            el.style.borderColor = 'rgba(8, 124, 250, 0.6)';
            el.style.boxShadow = '0 6px 16px rgba(8, 124, 250, 0.15)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'linear-gradient(135deg, rgba(8, 124, 250, 0.2) 0%, rgba(8, 124, 250, 0.15) 100%)';
            el.style.borderColor = 'rgba(8, 124, 250, 0.4)';
            el.style.boxShadow = '0 4px 12px rgba(8, 124, 250, 0.1)';
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
          WebkitOverflowScrolling: 'touch',
          width: '100%',
          maxWidth: isMobile ? '100vw' : 'calc(100vw - 240px)',
          position: 'relative',
          scrollBehavior: 'smooth',
        }}
      >
        {children}
      </main>
    </div>
  );
}
