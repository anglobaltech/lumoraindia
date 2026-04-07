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

export const useAuthStore = create((set, get) => ({
    user: null,
    profile: null,
    loading: true,
    error: null,

    signUp: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);

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

    // 🌟 ADDED: Manual refresh to sync UI after saving changes
    refreshProfile: async () => {
        const { user } = get();
        if (!user) return;
        try {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                set({ profile: docSnap.data() });
            }
        } catch (err) {
            console.error("Profile refresh failed:", err);
        }
    },

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

    initAuthListener: () => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                set({ user, loading: false });
                const docRef = doc(db, 'users', user.uid);
                getDoc(docRef)
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            set({ profile: docSnap.data() });
                        }
                    })
                    .catch((err) => {
                        console.warn("Firebase background profile fetch failed:", err);
                    });
            } else {
                set({ user: null, profile: null, loading: false });
            }
        });
    }
}));