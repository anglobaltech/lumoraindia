"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({ children }) {
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  useEffect(() => {
    // This runs once when the app loads to check if the user is logged in
    initAuthListener();
  }, [initAuthListener]);

  return <>{children}</>;
}