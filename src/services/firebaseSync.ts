import { database, ref, onValue, set, isFirebaseConfigured } from '../config/firebase';
import type { DataState } from '../stores/dataStore';
import { useDataStore } from '../stores/dataStore';
import type { DiscordAnalytics } from '../types/domain';

const DATA_PATH = 'da-ops-hub-data';
const DISCORD_PATH = 'discordAnalytics';

/**
 * Initialize Firebase real-time sync
 * Listens for changes in Firebase and updates local Zustand store
 * Gracefully degrades if Firebase is not configured
 */
export function initializeFirebaseSync() {
  if (!isFirebaseConfigured || !database) {
    console.warn('Firebase not configured - using localStorage only');
    return;
  }

  try {
    const dataRef = ref(database, DATA_PATH);

    // Listen for real-time updates from Firebase
    onValue(
      dataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const firebaseData = snapshot.val();

          // Update ops hub data (preserving action functions via shallow merge)
          useDataStore.setState({
            champions: firebaseData.champions,
            content: firebaseData.content,
            signals: firebaseData.signals,
            milestones: firebaseData.milestones,
            intel: firebaseData.intel,
            strategicPillars: firebaseData.strategicPillars,
            contentPillars: firebaseData.contentPillars,
            weeklyTasks: firebaseData.weeklyTasks,
            okrs: firebaseData.okrs,
            documents: firebaseData.documents,
            resources: firebaseData.resources,
          });

        }
      },
      (error) => {
        console.warn('Firebase sync listen error:', error);
      }
    );

    // Separate listener for Discord analytics (written by bot at root level,
    // never touched by syncDataToFirebase so it won't get overwritten)
    const discordRef = ref(database, DISCORD_PATH);
    onValue(
      discordRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const da = snapshot.val();
          const analytics: Partial<DiscordAnalytics> = {
            guildInfo:       da.guildInfo       ?? null,
            engagement:      da.engagement      ?? null,
            activityByDay:   da.activityByDay   ?? {},
            activityByHour:  da.activityByHour  ?? {},
            memberSnapshots: da.memberSnapshots ?? {},
            topChannels: Array.isArray(da.topChannels)
              ? da.topChannels
              : Object.values(da.topChannels ?? {}),
            roles: Array.isArray(da.roles)
              ? da.roles
              : Object.values(da.roles ?? {}),
          };
          useDataStore.getState().setDiscordAnalytics(analytics);
        }
      },
      (error) => {
        console.warn('Firebase discord sync listen error:', error);
      }
    );
  } catch (error) {
    console.warn('Firebase sync initialization warning:', error);
    // Gracefully degrade - app continues to work with localStorage only
  }
}

/**
 * Sync ops hub data to Firebase.
 * NOTE: discordAnalytics is intentionally excluded —
 * it is written by the collector bot and must not be overwritten from the ops hub.
 */
export async function syncDataToFirebase(data: DataState) {
  if (!isFirebaseConfigured || !database) {
    return;
  }

  try {
    const dataRef = ref(database, DATA_PATH);

    const serializableData = {
      champions: data.champions,
      content: data.content,
      signals: data.signals,
      milestones: data.milestones,
      intel: data.intel,
      strategicPillars: data.strategicPillars,
      contentPillars: data.contentPillars,
      weeklyTasks: data.weeklyTasks,
      okrs: data.okrs,
      documents: data.documents,
      resources: data.resources,
    };

    await set(dataRef, serializableData);
  } catch (error) {
    console.error('Firebase sync write error:', error);
  }
}

/**
 * Check Firebase connection status
 */
export function getFirebaseStatus() {
  if (!isFirebaseConfigured || !database) {
    return Promise.resolve(false);
  }

  try {
    const dataRef = ref(database, '.info/connected');
    return new Promise<boolean>((resolve) => {
      const unsubscribe = onValue(dataRef, (snapshot) => {
        unsubscribe();
        resolve(snapshot.val() === true);
      });
      setTimeout(() => resolve(false), 3000);
    });
  } catch (error) {
    return Promise.resolve(false);
  }
}
