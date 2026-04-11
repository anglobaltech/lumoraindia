"use client";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { ShieldAlert, Loader2, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const { profile, loading } = useAuthStore();

  // If already logged in as admin, push to dashboard
  useEffect(() => {
    if (!loading && profile?.role === "admin") {
      router.push("/admin");
    }
  }, [profile, loading, router]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // 2. STRICT CHECK: Are they in the admins collection?
      const adminRef = doc(db, "admins", userCredential.user.email.toLowerCase());
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists() && adminSnap.data().role === "admin") {
        toast.success("Welcome to the Lumora Control Panel");
        // The authStore's initAuthListener will pick up the state change
        router.push("/admin");
      } else {
        // They are a valid user, but NOT an admin. Kick them out.
        await auth.signOut();
        toast.error("Unauthorized. This portal is for Lumora staff only.");
      }
    } catch (error) {
      toast.error("Invalid admin credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
      <p className="text-gray-400 font-bold tracking-widest uppercase text-sm animate-pulse">Verifying Security Clearance...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-600/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex justify-center text-pink-500 mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          <div className="p-4 bg-pink-500/10 rounded-3xl border border-pink-500/20 backdrop-blur-sm">
             <ShieldAlert size={56} strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-center text-3xl md:text-4xl font-black text-white tracking-tight">
          Secure Portal
        </h2>
        <p className="mt-2 text-center text-sm font-bold text-pink-400 tracking-widest uppercase">
          Authorized Personnel Only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">
        <div className="bg-slate-800/60 backdrop-blur-xl py-8 px-6 shadow-2xl sm:rounded-[2rem] sm:px-10 border border-slate-700/50 relative overflow-hidden">
          
          {/* Subtle top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>

          <form className="space-y-6" onSubmit={handleAdminLogin}>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Staff Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lumora.com"
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-600/50 rounded-xl shadow-sm placeholder-gray-500 bg-slate-900/50 text-white font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Master Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-600/50 rounded-xl shadow-sm placeholder-gray-500 bg-slate-900/50 text-white font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-pink-500/20 text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-pink-500 disabled:opacity-50 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : "Authenticate Identity"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}