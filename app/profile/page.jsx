"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Mail, Phone, Calendar, Check, X, MapPin, LogOut, Loader2, Home, Landmark, Building, Map, ChevronDown, Plus } from "lucide-react";
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

  // Sync form data with user state (user is our source of truth after updates)
  useEffect(() => {
    if (user || profile) {
      setFormData({
        name: user?.name || profile?.name || "",
        gender: user?.gender || profile?.gender || "",
        phone: user?.phone || profile?.phone || "",
        dob: user?.dob || profile?.dob || "",
        houseNo: user?.houseNo || profile?.houseNo || "",
        area: user?.area || profile?.area || "",
        landmark: user?.landmark || profile?.landmark || "",
        city: user?.city || profile?.city || "",
        state: user?.state || profile?.state || "",
        pincode: user?.pincode || profile?.pincode || "",
      });
    }
  }, [user, profile]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-wide">Loading your premium profile...</p>
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

  const handleCancel = () => {
    setFormData({
      name: user?.name || profile?.name || "",
      gender: user?.gender || profile?.gender || "",
      phone: user?.phone || profile?.phone || "",
      dob: user?.dob || profile?.dob || "",
      houseNo: user?.houseNo || profile?.houseNo || "",
      area: user?.area || profile?.area || "",
      landmark: user?.landmark || profile?.landmark || "",
      city: user?.city || profile?.city || "",
      state: user?.state || profile?.state || "",
      pincode: user?.pincode || profile?.pincode || "",
    });
    setIsEditing(false);
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
      
      // Save to Firebase
      await setDoc(userRef, formData, { merge: true });
      
      // Optimistic UI Update globally
      useAuthStore.setState((state) => ({
        user: { ...state.user, ...formData },
        profile: state.profile ? { ...state.profile, ...formData } : null
      }));

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

  // --- UX BEST PRACTICE: Actionable Empty State Component ---
  const EmptyField = ({ label }) => (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="text-sm font-extrabold text-pink-500 hover:text-pink-600 flex items-center gap-2 transition-all cursor-pointer group w-full text-left"
    >
      <div className="bg-pink-100/50 p-1 rounded-md group-hover:bg-pink-100 group-hover:scale-105 transition-all">
        <Plus size={14} className="text-pink-600" />
      </div>
      Add {label}
    </button>
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-pink-100/50 border border-pink-100 relative overflow-hidden">
        
        {/* Subtle Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 to-pink-600"></div>

        <form onSubmit={handleSave}>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-5 border-b border-pink-100/50 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Personal Details</h2>
              <p className="text-gray-500 text-sm mt-1.5 font-medium">Manage your personal information and delivery address.</p>
            </div>
            
            <div className="flex items-center w-full sm:w-auto">
              {!isEditing ? (
                <button type="button" onClick={() => setIsEditing(true)} className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm font-bold hover:bg-pink-100 hover:shadow-sm transition-all duration-300">
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3 w-full sm:w-auto">
                  <button type="button" onClick={handleCancel} disabled={isSaving} className="cursor-pointer flex-1 sm:flex-none px-6 py-3 bg-white text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 hover:text-gray-900 transition-all flex items-center justify-center gap-2 border-2 border-gray-200">
                    <X size={16}/> Cancel
                  </button>
                  <button type="submit" disabled={isSaving} className="cursor-pointer flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl text-sm font-bold hover:from-pink-700 hover:to-pink-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70">
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18}/>} 
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'}`}>
                <User size={20} className={isEditing ? 'text-pink-500' : 'text-gray-400'} />
                {isEditing ? (
                  <input type="text" placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 text-base font-bold placeholder-gray-300" />
                ) : (
                  (user?.name || profile?.name) 
                    ? <span className="font-bold text-base text-gray-900">{user?.name || profile?.name}</span> 
                    : <EmptyField label="Full Name" />
                )}
              </div>
            </div>

            {/* Email (Always disabled/read-only) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-100/60 rounded-xl border-2 border-transparent cursor-not-allowed">
                <Mail size={20} className="text-gray-400" />
                <span className="font-bold text-base text-gray-500">{user?.email}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
              <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'}`}>
                <Phone size={20} className={isEditing ? 'text-pink-500' : 'text-gray-400'} />
                {isEditing && <span className="text-gray-400 font-bold text-base border-r border-gray-200 pr-2">+91</span>}
                {isEditing ? (
                  <input type="tel" placeholder="9876543210" maxLength={10} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} className="bg-transparent w-full outline-none text-gray-900 text-base font-bold placeholder-gray-300" />
                ) : (
                  (user?.phone || profile?.phone)
                    ? <span className="font-bold text-base text-gray-900">+91 {user?.phone || profile?.phone}</span>
                    : <EmptyField label="Phone Number" />
                )}
              </div>
            </div>

            {/* DOB */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Date of Birth</label>
              <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'}`}>
                <Calendar size={20} className={isEditing ? 'text-pink-500' : 'text-gray-400'} />
                {isEditing ? (
                  <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="bg-transparent w-full outline-none text-gray-900 text-base font-bold cursor-pointer" />
                ) : (
                  (user?.dob || profile?.dob)
                    ? <span className="font-bold text-base text-gray-900">{user?.dob || profile?.dob}</span>
                    : <EmptyField label="Date of Birth" />
                )}
              </div>
            </div>

            {/* Gender Field */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Gender</label>
              <div className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 md:w-1/2 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'}`}>
                <User size={20} className={isEditing ? 'text-pink-500' : 'text-gray-400'} />
                {isEditing ? (
                  <>
                    <select 
                      value={formData.gender} 
                      onChange={(e) => setFormData({...formData, gender: e.target.value})} 
                      className="bg-transparent w-full outline-none text-gray-900 text-base font-bold cursor-pointer appearance-none z-10"
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Trans Gender">Trans Gender</option>
                    </select>
                    <ChevronDown size={18} className="text-pink-400 absolute right-4 z-0 pointer-events-none" />
                  </>
                ) : (
                  (user?.gender || profile?.gender)
                    ? <span className="font-bold text-base text-gray-900">{user?.gender || profile?.gender}</span>
                    : <EmptyField label="Gender" />
                )}
              </div>
            </div>

            {/* STRUCTURED ADDRESS SECTION */}
            <div className="md:col-span-2 mt-4">
              <div className="bg-gradient-to-br from-pink-50/50 to-white rounded-3xl p-6 md:p-8 border border-pink-100 shadow-sm">
                <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="p-2.5 bg-pink-100 rounded-xl text-pink-600 shadow-inner">
                    <MapPin size={22} fill="currentColor" className="text-pink-200" />
                  </div>
                  Primary Delivery Address
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Pincode */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Pincode</label>
                    <div className={`relative flex items-center px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-white border-gray-100 hover:border-pink-100'}`}>
                      {isEditing ? (
                        <input type="text" maxLength={6} placeholder="e.g. 110001" value={formData.pincode} onChange={handlePincodeChange} className="bg-transparent w-full outline-none text-gray-900 text-base font-bold placeholder-gray-300" />
                      ) : (
                        (user?.pincode || profile?.pincode)
                          ? <span className="text-base font-bold text-gray-900">{user?.pincode || profile?.pincode}</span>
                          : <EmptyField label="Pincode" />
                      )}
                      {isFetchingLocation && <Loader2 size={18} className="absolute right-4 text-pink-500 animate-spin" />}
                    </div>
                  </div>

                  {/* House */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">House / Flat No.</label>
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-white border-gray-100 hover:border-pink-100'}`}>
                      <Home size={18} className={isEditing ? 'text-pink-400' : 'text-gray-300'} />
                      {isEditing ? (
                        <input type="text" placeholder="Flat 401, Building B" value={formData.houseNo} onChange={(e) => setFormData({...formData, houseNo: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-bold placeholder-gray-300" />
                      ) : (
                        (user?.houseNo || profile?.houseNo)
                          ? <span className="text-base font-bold text-gray-900">{user?.houseNo || profile?.houseNo}</span>
                          : <EmptyField label="House No." />
                      )}
                    </div>
                  </div>

                  {/* Area */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Area / Street</label>
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-white border-gray-100 hover:border-pink-100'}`}>
                      <Building size={18} className={isEditing ? 'text-pink-400' : 'text-gray-300'} />
                      {isEditing ? (
                        <input type="text" placeholder="Sector 62" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-bold placeholder-gray-300" />
                      ) : (
                        (user?.area || profile?.area)
                          ? <span className="text-base font-bold text-gray-900">{user?.area || profile?.area}</span>
                          : <EmptyField label="Area / Street" />
                      )}
                    </div>
                  </div>

                  {/* Landmark */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Landmark (Optional)</label>
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-white border-gray-100 hover:border-pink-100'}`}>
                      <Landmark size={18} className={isEditing ? 'text-pink-400' : 'text-gray-300'} />
                      {isEditing ? (
                        <input type="text" placeholder="Near Apollo Hospital" value={formData.landmark} onChange={(e) => setFormData({...formData, landmark: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-bold placeholder-gray-300" />
                      ) : (
                        (user?.landmark || profile?.landmark)
                          ? <span className="text-base font-bold text-gray-900">{user?.landmark || profile?.landmark}</span>
                          : <EmptyField label="Landmark" />
                      )}
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">City / District</label>
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm' : 'bg-white border-gray-100 hover:border-pink-100'}`}>
                      <Map size={18} className={isEditing ? 'text-pink-400' : 'text-gray-300'} />
                      {isEditing ? (
                        <input type="text" placeholder="New Delhi" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-bold placeholder-gray-300" />
                      ) : (
                        (user?.city || profile?.city)
                          ? <span className="text-base font-bold text-gray-900">{user?.city || profile?.city}</span>
                          : <EmptyField label="City" />
                      )}
                    </div>
                  </div>

                  {/* State (Read-only after auto-fill) */}
                  <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">State</label>
                     <div className={`px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${isEditing ? (formData.state ? 'bg-gray-100 border-transparent cursor-not-allowed text-gray-500' : 'bg-white border-pink-200 focus-within:border-pink-500 shadow-sm') : 'bg-white border-gray-100 hover:border-pink-100'}`}>
                      {isEditing ? (
                        <input type="text" placeholder="Delhi" readOnly={!!formData.state} value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className={`bg-transparent w-full outline-none text-base font-bold focus:ring-0 ${formData.state ? 'text-gray-500' : 'text-gray-900'}`} title={formData.state ? "State is auto-filled and locked via Pincode" : ""} />
                      ) : (
                        (user?.state || profile?.state)
                          ? <span className="text-base font-bold text-gray-900">{user?.state || profile?.state}</span>
                          : <EmptyField label="State" />
                      )}
                     </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Logout Section */}
        <div className="mt-10 pt-8 border-t border-pink-100/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <h4 className="text-lg font-extrabold text-gray-900">Sign Out</h4>
            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed font-medium">Logging out will end your session on this device. You will need your credentials to log back in.</p>
          </div>
          <button 
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer group shadow-sm w-full md:w-auto hover:shadow-md"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}