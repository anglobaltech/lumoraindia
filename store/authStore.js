import { create } from 'zustand';
import { auth, adminAuth, db } from '../lib/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const useAuthStore = create((set, get) => ({
    // --- CUSTOMER STATE ---
    user: null,
    profile: null,
    loading: true,
    error: null,

    // --- ADMIN STATE ---
    adminUser: null,
    adminProfile: null,
    adminLoading: true,

    // 1. Initial Sign Up (Customer)
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

    // 2. Complete Profile (Customer)
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

    // 3. Login (Customer)
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

    // 4. Logout (Customer)
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

    // 5. Admin Login (Isolated & Fixed Race Condition)
    adminLogin: async (email, password) => {
        set({ adminLoading: true, error: null });
        try {
            // 1. Authenticate
            const userCredential = await signInWithEmailAndPassword(adminAuth, email, password);
            
            // 2. IMMEDIATELY fetch the admin profile before returning success
            const adminRef = doc(db, 'admins', email.toLowerCase());
            const adminSnap = await getDoc(adminRef);

            if (adminSnap.exists() && adminSnap.data().role === "admin") {
                // Set everything at once so the Layout doesn't kick the user out
                set({ 
                    adminUser: userCredential.user, 
                    adminProfile: adminSnap.data(),
                    error: null, 
                    adminLoading: false 
                });
                return { success: true };
            } else {
                // If they logged in but aren't in the admin collection
                await signOut(adminAuth);
                set({ adminUser: null, adminProfile: null, error: "Unauthorized access", adminLoading: false });
                return { success: false, error: "Unauthorized access. Staff only." };
            }
        } catch (error) {
            set({ error: "Invalid admin credentials", adminLoading: false });
            return { success: false, error: "Invalid admin credentials" };
        }
    },

    // 6. Admin Logout (Isolated)
    adminLogout: async () => {
        set({ adminLoading: true });
        try {
            await signOut(adminAuth);
            set({ adminUser: null, adminProfile: null, error: null, adminLoading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.message, adminLoading: false });
            return { success: false };
        }
    },

    // 7. Combined Auth Listener (Listens to both simultaneously without overlapping)
    initAuthListener: () => {
        // A. Customer Listener
        const unsubCustomer = onAuthStateChanged(auth, async (user) => {
            if (user) {
                set({ user, loading: true });
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        set({ profile: userSnap.data(), loading: false });
                    } else {
                        set({ profile: null, loading: false });
                    }
                } catch (err) {
                    set({ profile: null, loading: false });
                }
            } else {
                set({ user: null, profile: null, loading: false });
            }
        });

        // B. Admin Listener
        const unsubAdmin = onAuthStateChanged(adminAuth, async (user) => {
            if (user) {
                // If adminUser is already set by adminLogin, skip the redundant fetch to avoid UI flashing
                if (get().adminUser?.uid === user.uid && get().adminProfile) return;

                set({ adminUser: user, adminLoading: true });
                try {
                    const adminRef = doc(db, 'admins', user.email.toLowerCase());
                    const adminSnap = await getDoc(adminRef);

                    if (adminSnap.exists() && adminSnap.data().role === "admin") {
                        set({ adminProfile: adminSnap.data(), adminLoading: false });
                    } else {
                        await signOut(adminAuth);
                        set({ adminProfile: null, adminUser: null, adminLoading: false });
                    }
                } catch (err) {
                    set({ adminProfile: null, adminLoading: false });
                }
            } else {
                set({ adminUser: null, adminProfile: null, adminLoading: false });
            }
        });

        return () => {
            unsubCustomer();
            unsubAdmin();
        };
    }
}));