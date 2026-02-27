import { database, ref, onValue, set, isFirebaseConfigured } from '../config/firebase';
import type { DataState } from '../stores/dataStore';
import { useDataStore } from '../stores/dataStore';

const DATA_PATH = 'da-ops-hub-data';

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
          // Update Zustand store with Firebase data
          useDataStore.setState(firebaseData as DataState, true);
        }
      },
      (error) => {
        console.warn('Firebase sync listen error:', error);
      }
    );
  } catch (error) {
    console.warn('Firebase sync initialization warning:', error);
    // Gracefully degrade - app continues to work with localStorage only
  }
}

/**
 * Sync data to Firebase
 * Called whenever data changes in Zustand store
 * Gracefully degrades if Firebase is not configured
 *
 * Only syncs serializable data, not action functions
 */
export async function syncDataToFirebase(data: DataState) {
  if (!isFirebaseConfigured || !database) {
    // Firebase not configured - that's ok, localStorage will persist data
    return;
  }

  try {
    const dataRef = ref(database, DATA_PATH);

    // Extract only the data properties (not functions)
    // Firebase can only store JSON-serializable values
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
    // Data still updates locally, Firebase sync just failed
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
      // Timeout after 3 seconds
      setTimeout(() => resolve(false), 3000);
    });
  } catch (error) {
    return Promise.resolve(false);
  }
}
