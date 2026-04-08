"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Mail, Phone, Calendar, Check, X, MapPin, LogOut, Loader2, Home, Landmark, Building, Map, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, logout, refreshProfile } = useAuthStore(); 

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender: "", 
    phone: "",
    dob: "",
    houseNo: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        gender: profile.gender || "",
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
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={44} />
        <p className="text-gray-500 font-medium animate-pulse text-lg">Loading your premium profile...</p>
      </div>
    );
  }

  const handlePincodeChange = async (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, pincode: val });

    if (val.length === 6) {
      setIsFetchingLocation(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        
        if (data && data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setFormData(prev => ({
            ...prev,
            state: postOffice.State,
            city: postOffice.District 
          }));
          toast.success("City and State auto-filled!");
        } else {
          toast.error("Invalid Pincode. Please check again.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Network error while fetching location.");
      } finally {
        setIsFetchingLocation(false);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault(); 
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (formData.pincode && formData.pincode.length !== 6) {
      toast.error("Pincode must be exactly 6 digits.");
      return;
    }

    setIsSaving(true);
    try {
      if (!user || !user.uid) throw new Error("Cannot save: User ID is missing.");
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, formData, { merge: true });
      if (refreshProfile) await refreshProfile();
      toast.success("Profile updated successfully!");
      setIsEditing(false); 
    } catch (error) {
      toast.error(`Error: ${error.message}`); 
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 h-fit">
        
        <form onSubmit={handleSave}>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile Details</h2>
              <p className="text-gray-500 text-sm mt-1.5 font-medium">Manage your personal information and delivery addresses.</p>
            </div>
            
            <div className="flex items-center w-full sm:w-auto">
              {!isEditing ? (
                <button type="button" onClick={() => setIsEditing(true)} className="w-full sm:w-auto px-6 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm font-bold hover:bg-pink-100 hover:shadow-sm transition-all duration-200">
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3 w-full sm:w-auto">
                  <button type="button" onClick={() => setIsEditing(false)} disabled={isSaving} className="flex-1 sm:flex-none px-5 py-3 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 hover:text-gray-900 transition-all flex items-center justify-center gap-2 border border-gray-200">
                    <X size={16}/> Cancel
                  </button>
                  <button type="submit" disabled={isSaving} className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl text-sm font-bold hover:from-pink-700 hover:to-pink-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 disabled:opacity-70">
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18}/>} 
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
            
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-gray-50 border-transparent'}`}>
                <User size={20} className={isEditing ? 'text-pink-500' : 'text-gray-400'} />
                {isEditing ? (
                  <input type="text" placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 text-base font-semibold placeholder-gray-400" />
                ) : (
                  <span className="font-semibold text-base text-gray-900">{profile?.name || "Not provided"}</span>
                )}
              </div>
            </div>

            {/* Email (Always disabled) */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="flex items-center gap-3 p-4 bg-gray-100/60 rounded-xl border-2 border-transparent cursor-not-allowed">
                <Mail size={20} className="text-gray-400" />
                <span className="font-semibold text-base text-gray-500">{user.email}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-gray-50 border-transparent'}`}>
                <Phone size={20} className={isEditing ? 'text-pink-500' : 'text-gray-400'} />
                <span className="text-gray-400 font-semibold text-base">+91</span>
                {isEditing ? (
                  <input type="tel" placeholder="9876543210" maxLength={10} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} className="bg-transparent w-full outline-none text-gray-900 text-base font-semibold placeholder-gray-400" />
                ) : (
                  <span className="font-semibold text-base text-gray-900">{profile?.phone || "Not provided"}</span>
                )}
              </div>
            </div>

            {/* DOB */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Date of Birth</label>
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-gray-50 border-transparent'}`}>
                <Calendar size={20} className={isEditing ? 'text-pink-500' : 'text-gray-400'} />
                {isEditing ? (
                  <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 text-base font-semibold cursor-pointer" />
                ) : (
                  <span className="font-semibold text-base text-gray-900">{profile?.dob || "Not provided"}</span>
                )}
              </div>
            </div>

            {/* Premium Dropdown Gender Field */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Gender</label>
              <div className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 md:w-1/2 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-gray-50 border-transparent'}`}>
                <User size={20} className={isEditing ? 'text-pink-500' : 'text-gray-400'} />
                {isEditing ? (
                  <>
                    <select 
                      value={formData.gender} 
                      onChange={(e) => setFormData({...formData, gender: e.target.value})} 
                      className="bg-transparent w-full outline-none text-gray-900 text-base font-semibold cursor-pointer appearance-none z-10"
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Trans Gender">Trans Gender</option>
                    </select>
                    <ChevronDown size={18} className="text-gray-400 absolute right-4 z-0" />
                  </>
                ) : (
                  <span className="font-semibold text-base text-gray-900">{profile?.gender || "Not selected"}</span>
                )}
              </div>
            </div>

            {/* STRUCTURED ADDRESS SECTION */}
            <div className="md:col-span-2 mt-4">
              <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-inner">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                    <MapPin size={20} />
                  </div>
                  Primary Delivery Address
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Pincode */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Pincode</label>
                    <div className={`relative flex items-center p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-white border-transparent shadow-sm'}`}>
                      {isEditing ? (
                        <input type="text" maxLength={6} placeholder="e.g. 110001" value={formData.pincode} onChange={handlePincodeChange} className="bg-transparent w-full outline-none text-gray-900 text-base font-semibold" />
                      ) : (
                        <span className="text-base font-semibold text-gray-900">{profile?.pincode || "Not provided"}</span>
                      )}
                      {isFetchingLocation && <Loader2 size={18} className="absolute right-4 text-pink-500 animate-spin" />}
                    </div>
                  </div>

                  {/* House */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">House / Flat No.</label>
                    <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-white border-transparent shadow-sm'}`}>
                      <Home size={18} className={isEditing ? 'text-pink-400' : 'text-gray-300'} />
                      {isEditing ? <input type="text" placeholder="Flat 401, Building B" value={formData.houseNo} onChange={(e) => setFormData({...formData, houseNo: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-semibold" /> : <span className="text-base font-semibold text-gray-900">{profile?.houseNo || "Not provided"}</span>}
                    </div>
                  </div>

                  {/* Area */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Area / Street</label>
                    <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-white border-transparent shadow-sm'}`}>
                      <Building size={18} className={isEditing ? 'text-pink-400' : 'text-gray-300'} />
                      {isEditing ? <input type="text" placeholder="Sector 62" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-semibold" /> : <span className="text-base font-semibold text-gray-900">{profile?.area || "Not provided"}</span>}
                    </div>
                  </div>

                  {/* Landmark */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Landmark (Optional)</label>
                    <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-white border-transparent shadow-sm'}`}>
                      <Landmark size={18} className={isEditing ? 'text-pink-400' : 'text-gray-300'} />
                      {isEditing ? <input type="text" placeholder="Near Apollo Hospital" value={formData.landmark} onChange={(e) => setFormData({...formData, landmark: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-semibold" /> : <span className="text-base font-semibold text-gray-900">{profile?.landmark || "Not provided"}</span>}
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">City / District</label>
                    <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? 'bg-white border-pink-100 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 shadow-sm' : 'bg-white border-transparent shadow-sm'}`}>
                      <Map size={18} className={isEditing ? 'text-pink-400' : 'text-gray-300'} />
                      {isEditing ? <input type="text" placeholder="New Delhi" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-semibold" /> : <span className="text-base font-semibold text-gray-900">{profile?.city || "Not provided"}</span>}
                    </div>
                  </div>

                  {/* State (Read-only after auto-fill) */}
                  <div className="space-y-2">
                     <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">State</label>
                     <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${isEditing ? (formData.state ? 'bg-gray-100 border-transparent cursor-not-allowed text-gray-500' : 'bg-white border-pink-100 focus-within:border-pink-500 shadow-sm') : 'bg-white border-transparent shadow-sm'}`}>
                      {isEditing ? (
                        <input type="text" placeholder="Delhi" readOnly={!!formData.state} value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className={`bg-transparent w-full outline-none text-base font-semibold focus:ring-0 ${formData.state ? 'text-gray-500' : 'text-gray-900'}`} title={formData.state ? "State is auto-filled and locked via Pincode" : ""} />
                      ) : (
                        <span className="text-base font-semibold text-gray-900">{profile?.state || "Not provided"}</span>
                      )}
                     </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Logout Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <h4 className="text-base font-bold text-gray-900">Sign Out</h4>
            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">Logging out will end your session on this device. You will need your credentials to log back in.</p>
          </div>
          <button 
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer group shadow-sm w-full md:w-auto"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}