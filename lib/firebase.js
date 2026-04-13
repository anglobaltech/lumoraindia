import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// 1. Main App (For Customers)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 2. Secondary App (For Admins) - This completely isolates the admin session!
const adminApp = getApps().find(a => a.name === "adminPanel") || initializeApp(firebaseConfig, "adminPanel");

const auth = getAuth(app);
const adminAuth = getAuth(adminApp); // The isolated Admin Auth instance
const db = getFirestore(app);
const storage = getStorage(app);

export { app, adminApp, auth, adminAuth, db, storage };