"use client";
import React from "react";
import { useAuthStore } from "../../../store/authStore";
import { MapPin, Plus, Trash2, Home } from "lucide-react";

export default function AddressesPage() {
  const user = useAuthStore((state) => state.user);

  // Fallback if user is not loaded
  if (!user) return <div className="p-8 text-center bg-white rounded-2xl shadow-sm">Please log in.</div>;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
        <button className="flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-100 transition">
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* We map through the addresses array we created in Phase 3 */}
        {user.addresses && user.addresses.length > 0 ? (
          user.addresses.map((address, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-5 relative group hover:border-pink-300 transition">
              <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold">
                <Home size={18} className="text-pink-500" />
                <span>Address {index + 1}</span>
                {index === 0 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md ml-2">Default</span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {address}
              </p>

              <div className="flex gap-4 border-t border-gray-100 pt-4 mt-auto">
                <button className="text-sm font-semibold text-pink-600 hover:text-pink-800">Edit</button>
                <button className="text-sm font-semibold text-red-500 flex items-center gap-1 hover:text-red-700">
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl">
            <MapPin size={40} className="mx-auto mb-3 text-gray-300" />
            <p>No addresses saved yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}