import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import type { Database } from 'firebase/database';

// Firebase Configuration
// Get these values from your Firebase project settings:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (or select existing)
// 3. Enable Realtime Database
// 4. Go to Project Settings > General
// 5. Copy your config values to .env file

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
};

// Check if Firebase is configured
const isFirebaseConfigured = Object.values(firebaseConfig).every((val) => val && val.length > 0);

let database: Database | null = null;

if (isFirebaseConfigured) {
  try {
    // Initialize Firebase only if config is complete
    const app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
    // Graceful degradation - app works without Firebase
  }
} else {
  console.warn(
    'Firebase not configured. Cross-device sync disabled. Set environment variables in .env to enable Firebase.'
  );
}

export { database, ref, onValue, set, isFirebaseConfigured };
