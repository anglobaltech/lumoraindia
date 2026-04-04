import { create } from 'zustand';
import { auth, db } from '../lib/firebase'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const useAuthStore = create((set) => ({
  user: null, 
  profile: null, 
  loading: true, 
  error: null,

  // 1. Initial Sign Up (Just creates the credentials)
  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      // Create a placeholder doc
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        createdAt: new Date().toISOString(),
        profileCompleted: false
      });

      set({ user: userCredential.user, loading: false });
      return { success: true, uid: userCredential.user.uid };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // 2. Complete Profile (Saves the extra details)
  completeProfile: async (uid, profileData) => {
    set({ loading: true, error: null });
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...profileData,
        profileCompleted: true,
        role: 'customer'
      });
      
      const docSnap = await getDoc(userRef);
      set({ profile: docSnap.data(), loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // 3. Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, error: null, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: "Invalid email or password", loading: false });
      return { success: false, error: error.message };
    }
  },

  // 4. Logout
  logout: async () => {
    set({ loading: true });
    try {
      await signOut(auth);
      set({ user: null, profile: null, error: null, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false };
    }
  },

  // 5. Auth Listener
  initAuthListener: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        set({ 
          user: user, 
          profile: docSnap.exists() ? docSnap.data() : null,
          loading: false 
        });
      } else {
        set({ user: null, profile: null, loading: false });
      }
    });
  }
}));