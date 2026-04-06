"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({ children }) {
  const initAuthListener = useAuthStore((state) => state.initAuthListener);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    // Single point of entry for Auth
    const unsubscribe = initAuthListener();
    
    // Proper cleanup to prevent memory leaks and state collisions
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [initAuthListener]);

  // High-end UI: Prevent flickering "Login" buttons by waiting for loading
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}



// "use client";

// import { useEffect } from "react";

// import { useAuthStore } from "@/store/authStore";



// export default function AuthProvider({ children }) {

// const initAuthListener = useAuthStore((state) => state.initAuthListener);



// useEffect(() => {

// // This runs once when the app loads to check if the user is logged in

// initAuthListener();

// }, [initAuthListener]);



// return <>{children}</>;

// }