"use client";
import React from "react";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      
      <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <Heart size={48} className="mx-auto mb-4 text-pink-300" />
        <h3 className="text-lg font-bold text-gray-700">Your wishlist is empty</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
          Save items you love here so you can easily find them and buy them later.
        </p>
        <button className="mt-6 px-6 py-2 bg-pink-50 text-pink-600 font-bold rounded-lg hover:bg-pink-100 transition">
          Explore Products
        </button>
      </div>
    </div>
  );
}