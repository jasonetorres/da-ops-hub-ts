import { useEffect, useState } from 'react';
import { getFirebaseStatus } from '../../services/firebaseSync';

export default function FirebaseStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const connected = await getFirebaseStatus();
        setIsConnected(connected);
      } catch (error) {
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
    // Check status every 10 seconds
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        backgroundColor: isConnected ? 'rgba(33, 215, 137, 0.1)' : 'rgba(252, 128, 29, 0.1)',
        border: `1px solid ${isConnected ? 'rgba(33, 215, 137, 0.3)' : 'rgba(252, 128, 29, 0.3)'}`,
        color: isConnected ? '#21D789' : '#FC801D',
      }}
      title={isConnected ? 'Firebase sync active - data syncing in real-time' : 'Using localStorage only - data persists locally'}
    >
      <div
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isConnected ? '#21D789' : '#FC801D',
          animation: isConnected ? 'pulse 2s ease-in-out infinite' : 'none',
        }}
      />
      <span>{isConnected ? 'Sync Active' : 'Offline Mode'}</span>
    </div>
  );
}

// Add pulse animation to global styles if not present
if (typeof document !== 'undefined' && !document.querySelector('#firebase-status-style')) {
  const style = document.createElement('style');
  style.id = 'firebase-status-style';
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
}
