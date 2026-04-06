"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Mail, Phone, Calendar, Check, X, MapPin, LogOut, Loader2, Home, Landmark, Building, Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, logout } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Expanded Form State for structured address & proper phone/DOB
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    houseNo: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Sync data from profile
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        dob: profile.dob || "",
        houseNo: profile.houseNo || "",
        area: profile.area || "",
        landmark: profile.landmark || "",
        city: profile.city || "",
        state: profile.state || "",
        pincode: profile.pincode || "",
      });
    }
  }, [profile]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading your profile...</p>
      </div>
    );
  }

  const handleSave = async () => {
    // 1. Phone Validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    // 2. Pincode Validation (6 digits)
    if (formData.pincode && formData.pincode.length !== 6) {
      toast.error("Pincode must be exactly 6 digits.");
      return;
    }

    setIsSaving(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, formData);
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // Removed reload() - use local state or store refresh logic instead
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.info("Logged out successfully.");
      router.push("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
            {/* <p className="text-gray-500 text-sm mt-1">Amazon-style profile management for Lumora.</p> */}
          </div>
          
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="px-5 py-2 bg-pink-50 text-pink-600 rounded-xl text-sm font-bold hover:bg-pink-100 transition cursor-pointer">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} disabled={isSaving} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition flex items-center gap-1 cursor-pointer">
                  <X size={16}/> Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition flex items-center gap-1 disabled:opacity-50 cursor-pointer shadow-md">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16}/>} 
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isEditing ? 'bg-white border-pink-400 ring-2 ring-pink-50' : 'bg-gray-50 border-gray-100'}`}>
              <User size={18} className="text-pink-500 shrink-0" />
              {isEditing ? (
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 font-medium" placeholder="Full Name" />
              ) : (
                <span className="font-medium text-gray-900">{profile?.name || "Not provided"}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 opacity-80 cursor-not-allowed">
              <Mail size={18} className="text-pink-300 shrink-0" />
              <span className="font-medium text-gray-600">{user.email}</span>
              <span className="ml-auto text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
            </div>
          </div>

          {/* Phone with Country Code */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isEditing ? 'bg-white border-pink-400 ring-2 ring-pink-50' : 'bg-gray-50 border-gray-100'}`}>
              <Phone size={18} className="text-pink-500 shrink-0" />
              <span className="text-gray-400 font-medium">+91</span>
              {isEditing ? (
                <input type="tel" maxLength={10} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} className="bg-transparent w-full outline-none text-gray-900 font-medium" placeholder="10-digit number" />
              ) : (
                <span className="font-medium text-gray-900">{profile?.phone || "Not provided"}</span>
              )}
            </div>
          </div>

          {/* DOB with Calendar */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Date of Birth</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isEditing ? 'bg-white border-pink-400 ring-2 ring-pink-50' : 'bg-gray-50 border-gray-100'}`}>
              <Calendar size={18} className="text-pink-500 shrink-0" />
              {isEditing ? (
                <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 font-medium cursor-pointer" />
              ) : (
                <span className="font-medium text-gray-900">{profile?.dob || "Not provided"}</span>
              )}
            </div>
          </div>

          {/* STRUCTURED ADDRESS FORM */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-pink-600" /> Delivery Address Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* House No */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400">Flat / House No. / Building</label>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-400' : 'bg-gray-50 border-gray-100'}`}>
                  <Home size={16} className="text-gray-400" />
                  {isEditing ? <input type="text" value={formData.houseNo} onChange={(e) => setFormData({...formData, houseNo: e.target.value})} className="bg-transparent w-full outline-none text-sm" /> : <span className="text-sm">{profile?.houseNo || "-"}</span>}
                </div>
              </div>

              {/* Area */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400">Area / Street / Sector</label>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-400' : 'bg-gray-50 border-gray-100'}`}>
                  <Building size={16} className="text-gray-400" />
                  {isEditing ? <input type="text" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="bg-transparent w-full outline-none text-sm" /> : <span className="text-sm">{profile?.area || "-"}</span>}
                </div>
              </div>

              {/* Landmark */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400">Landmark (Optional)</label>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-400' : 'bg-gray-50 border-gray-100'}`}>
                  <Landmark size={16} className="text-gray-400" />
                  {isEditing ? <input type="text" value={formData.landmark} onChange={(e) => setFormData({...formData, landmark: e.target.value})} className="bg-transparent w-full outline-none text-sm" /> : <span className="text-sm">{profile?.landmark || "-"}</span>}
                </div>
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400">City</label>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-400' : 'bg-gray-50 border-gray-100'}`}>
                  <Map size={16} className="text-gray-400" />
                  {isEditing ? <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="bg-transparent w-full outline-none text-sm" /> : <span className="text-sm">{profile?.city || "-"}</span>}
                </div>
              </div>

              {/* State & Pincode */}
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-400">State</label>
                   <div className={`p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-400' : 'bg-gray-50 border-gray-100'}`}>
                    {isEditing ? <input type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="bg-transparent w-full outline-none text-sm" /> : <span className="text-sm">{profile?.state || "-"}</span>}
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-400">Pincode</label>
                   <div className={`p-3 rounded-xl border ${isEditing ? 'bg-white border-pink-400' : 'bg-gray-50 border-gray-100'}`}>
                    {isEditing ? <input type="text" maxLength={6} value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/\D/g, '')})} className="bg-transparent w-full outline-none text-sm" /> : <span className="text-sm">{profile?.pincode || "-"}</span>}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-xs text-gray-400 max-w-xs">Logging out will sign you out of all sessions on this browser.</p>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all cursor-pointer group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Log Out of Account
          </button>
        </div>

      </div>
    </div>
  );
}