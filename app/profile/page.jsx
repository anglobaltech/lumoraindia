"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Mail, Phone, Calendar, Check, X, MapPin, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Make sure this path is correct
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  
  // Pulling the correct states from our new authStore
  const { user, profile, logout } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    address: "",
  });

  // Sync form data when the profile loads from Firebase
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        age: profile.age || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  // Protect the route
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading your profile...</p>
      </div>
    );
  }

  // --- ACTIONS ---

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update the document in Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, formData);
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      
      // Refresh the page slightly to re-sync the global store with fresh DB data
      window.location.reload(); 
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.info("Logged out successfully.");
      router.push("/"); // Instantly redirect to home page
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your personal information and delivery address.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-pink-50 text-pink-600 rounded-xl text-sm font-bold hover:bg-pink-100 transition">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} disabled={isSaving} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition flex items-center gap-1">
                  <X size={16}/> Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition flex items-center gap-1 disabled:opacity-50">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16}/>} 
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-200 ring-2 ring-pink-50' : 'bg-gray-50 border-gray-100'}`}>
              <User size={18} className="text-pink-500 shrink-0" />
              {isEditing ? (
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 font-medium" />
              ) : (
                <span className="font-medium text-gray-900">{profile?.name || "Not provided"}</span>
              )}
            </div>
          </div>

          {/* Email (Read Only - Tied to Auth) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 opacity-70">
              <Mail size={18} className="text-pink-500 shrink-0" />
              <span className="font-medium text-gray-900">{user.email}</span>
              <span className="ml-auto text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-200 ring-2 ring-pink-50' : 'bg-gray-50 border-gray-100'}`}>
              <Phone size={18} className="text-pink-500 shrink-0" />
              {isEditing ? (
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 font-medium" />
              ) : (
                <span className="font-medium text-gray-900">{profile?.phone || "Not provided"}</span>
              )}
            </div>
          </div>

          {/* Age */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Age</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-200 ring-2 ring-pink-50' : 'bg-gray-50 border-gray-100'}`}>
              <Calendar size={18} className="text-pink-500 shrink-0" />
              {isEditing ? (
                <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 font-medium" />
              ) : (
                <span className="font-medium text-gray-900">{profile?.age ? `${profile.age} Years` : "Not provided"}</span>
              )}
            </div>
          </div>

          {/* Address (Takes full width) */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivery Address</label>
            <div className={`flex items-start gap-3 p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-200 ring-2 ring-pink-50' : 'bg-gray-50 border-gray-100'}`}>
              <MapPin size={18} className="text-pink-500 shrink-0 mt-0.5" />
              {isEditing ? (
                <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 font-medium resize-none h-20" placeholder="Enter full address..." />
              ) : (
                <span className="font-medium text-gray-900">{profile?.address || "Not provided"}</span>
              )}
            </div>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition"
          >
            <LogOut size={18} />
            Log Out of Account
          </button>
        </div>

      </div>
    </div>
  );
}