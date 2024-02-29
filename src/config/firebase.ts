import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// add firebase config
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId ,
  databaseURL: Constants.manifest?.extra?.realTimeDbUrl,
  appId: Constants.manifest?.extra?.appId,
};

// initialize firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// initialize db
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// initialize storage
const storage = getStorage();

// initialize realTime db
const realtimeDb = getDatabase();

export { auth, db, storage, realtimeDb };
