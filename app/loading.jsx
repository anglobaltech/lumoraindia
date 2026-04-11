import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
      {/* Premium spinning loader */}
      <div className="w-16 h-16 border-4 border-pink-50 border-t-pink-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-bold tracking-widest uppercase text-sm animate-pulse">
        Loading Lumora...
      </p>
    </div>
  );
}