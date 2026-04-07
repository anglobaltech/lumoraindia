// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { 
//   getFirestore, 
//   initializeFirestore, 
//   persistentLocalCache, 
//   persistentMultipleTabManager 
// } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// };

// // 1. Safe Initialization
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// // 2. Singleton Pattern for DB to prevent slow Localhost
// let db;
// if (!getApps().length) {
//     db = initializeFirestore(app, {
//         localCache: persistentLocalCache({
//             tabManager: persistentMultipleTabManager()
//         })
//     });
// } else {
//     db = getFirestore(app);
// }

// const auth = getAuth(app);

// export { auth, db };

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// ADD THESE CONSOLE LOGS
console.log("Firebase Config object being used:", firebaseConfig);
console.log("Project ID from env:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("API Key from env:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
// You can log all if you want, but projectId and apiKey are key.

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
