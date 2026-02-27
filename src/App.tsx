import { useEffect } from 'react';
import { useAppStore } from './stores/appStore';
import { useDataStore } from './stores/dataStore';
import { NAV_ITEMS } from './utils/constants';
import { initializeFirebaseSync } from './services/firebaseSync';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import OverviewView from './components/views/OverviewView';
import ChampionsView from './components/views/ChampionsView';
import ContentView from './components/views/ContentView';
import SignalsView from './components/views/SignalsView';
import TrackerView from './components/views/TrackerView';
import IntelView from './components/views/IntelView';
import NewsView from './components/views/NewsView';
import ChallengeView from './components/views/ChallengeView';
import StrategicFrameworkView from './components/views/StrategicFrameworkView';
import ContentStrategyView from './components/views/ContentStrategyView';
import WeeklyTasksView from './components/views/WeeklyTasksView';
import OKRsDashboardView from './components/views/OKRsDashboardView';
import DocumentsView from './components/views/DocumentsView';
import ProgressDashboardView from './components/views/ProgressDashboardView';
import ToolsAndResourcesView from './components/views/ToolsAndResourcesView';

function App() {
  const { currentTab, setCurrentTab } = useAppStore();

  // Initialize Firebase sync and cross-tab synchronization
  useEffect(() => {
    // Initialize Firebase real-time sync for cross-device synchronization
    initializeFirebaseSync();

    // Also keep localStorage sync for same-browser tab synchronization
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'da-ops-hub-data' && event.newValue) {
        // Rehydrate the store from localStorage (for same-browser tabs)
        try {
          const newData = JSON.parse(event.newValue);
          if (newData.state) {
            useDataStore.setState(newData.state, true);
          }
        } catch (error) {
          console.error('Failed to sync data from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const renderView = () => {
    switch (currentTab) {
      case 'overview': return <OverviewView />;
      case 'champions': return <ChampionsView />;
      case 'content': return <ContentView />;
      case 'signals': return <SignalsView />;
      case 'tracker': return <TrackerView />;
      case 'intel': return <IntelView />;
      case 'news': return <NewsView />;
      case 'challenge': return <ChallengeView />;
      case 'framework': return <StrategicFrameworkView />;
      case 'content-strategy': return <ContentStrategyView />;
      case 'weekly-tasks': return <WeeklyTasksView />;
      case 'okrs': return <OKRsDashboardView />;
      case 'documents': return <DocumentsView />;
      case 'progress': return <ProgressDashboardView />;
      case 'tools-resources': return <ToolsAndResourcesView />;
      default: return <OverviewView />;
    }
  };

  return (
    <MainLayout
      navItems={NAV_ITEMS}
      currentTab={currentTab}
      onTabChange={setCurrentTab}
    >
      {renderView()}
    </MainLayout>
  );
}

export default App;
