"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInit() {
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  useEffect(() => {
    // This starts the Firebase observer. 
    // It detects the session cookie and keeps the user logged in.
    const unsubscribe = initAuthListener();
    
    // Cleanup the listener when the app closes
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [initAuthListener]);

  return null; // This component renders nothing, it just runs logic
}