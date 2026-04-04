"use client";
import { useEffect } from "react";
import { AlertOctagon, RefreshCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // In the future, this is where you send the error to a service like Sentry or Google Analytics
    console.error("Critical App Crash Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center bg-white">
      <div className="mb-6 animate-bounce">
        <AlertOctagon size={64} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-black text-gray-900 mb-4">Something went wrong!</h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        We apologize for the inconvenience. An unexpected system error occurred on our end. 
      </p>
      
      {/* The 'reset' function tries to reload the specific component that crashed without reloading the whole page */}
      <button
        onClick={() => reset()}
        className="bg-pink-50 text-pink-600 px-8 py-4 rounded-xl font-bold hover:bg-pink-100 transition flex items-center gap-2"
      >
        <RefreshCcw size={20} /> Try Again
      </button>
    </div>
  );
}