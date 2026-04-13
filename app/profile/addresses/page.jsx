"use client";
import React, { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { MapPin, Plus, Trash2, Home, Map, Loader2, Check, X, Navigation, Edit2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase"; 

export default function AddressesPage() {
  const user = useAuthStore((state) => state.user);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Tracks if we are editing an existing address or adding a new one
  const [editingContext, setEditingContext] = useState(null); 
  
  // Tracks the address currently selected for deletion to show the custom modal
  const [addressToDelete, setAddressToDelete] = useState(null);
  
  const initialFormState = { houseNo: "", area: "", landmark: "", city: "", state: "", pincode: "" };
  const [formData, setFormData] = useState(initialFormState);
  
  // Gather all addresses
  const getSavedAddresses = () => {
    if (!user) return [];
    let combinedAddresses = [];

    // 1. Primary Address (Flat fields from profile)
    if (user.city || user.pincode || user.houseNo || user.area) {
      const formatted = [user.houseNo, user.area, user.landmark, user.city, user.state, user.pincode]
        .filter(Boolean)
        .join(", ");
      
      if (formatted) {
        combinedAddresses.push({ 
          isDefault: true, 
          source: 'flat',
          data: { 
            houseNo: user.houseNo || "", 
            area: user.area || "", 
            landmark: user.landmark || "", 
            city: user.city || "", 
            state: user.state || "", 
            pincode: user.pincode || "" 
          },
          text: formatted 
        });
      }
    }

    // 2. Additional Addresses (from addresses array)
    if (user.addresses && Array.isArray(user.addresses)) {
      user.addresses.forEach((addr, index) => {
        if (typeof addr === 'object') {
          combinedAddresses.push({ 
            isDefault: false, 
            source: 'array',
            index: index,
            data: addr,
            text: [addr.houseNo, addr.area, addr.landmark, addr.city, addr.state, addr.pincode].filter(Boolean).join(", ") 
          });
        }
      });
    }

    return combinedAddresses;
  };

  const displayList = getSavedAddresses();

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-gray-500 font-semibold animate-pulse text-lg tracking-wide">Loading your addresses...</p>
    </div>
  );

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
          setFormData(prev => ({ ...prev, state: postOffice.State, city: postOffice.District }));
          toast.success("City and State auto-filled!");
        } else {
          toast.error("Invalid Pincode.");
        }
      } catch (err) {
        toast.error("Network error fetching pincode.");
      } finally {
        setIsFetchingLocation(false);
      }
    }
  };

  const handleAddNew = () => {
    setFormData(initialFormState);
    setEditingContext(null);
    setIsFormOpen(true);
  };

  const handleEdit = (addr) => {
    setFormData(addr.data);
    setEditingContext({ source: addr.source, index: addr.index });
    setIsFormOpen(true);
  };

  const triggerDelete = (addr) => {
    setAddressToDelete(addr);
  };

  const confirmRemove = async () => {
    if (!addressToDelete) return;
    const addr = addressToDelete;

    try {
      const userRef = doc(db, "users", user.uid);
      let updatedUser = { ...user };

      if (addr.source === 'flat') {
        const clearData = { houseNo: "", area: "", landmark: "", city: "", state: "", pincode: "" };
        await updateDoc(userRef, clearData);
        updatedUser = { ...updatedUser, ...clearData };
      } else if (addr.source === 'array') {
        const newArray = user.addresses.filter((_, i) => i !== addr.index);
        await updateDoc(userRef, { addresses: newArray });
        updatedUser.addresses = newArray;
      }

      useAuthStore.setState({ user: updatedUser });
      toast.success("Address removed successfully!");
    } catch (error) {
      console.error("Error removing address:", error);
      toast.error("Failed to remove address.");
    } finally {
      setAddressToDelete(null);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (formData.pincode.length !== 6) return toast.error("Pincode must be 6 digits.");
    
    setIsSaving(true);
    
    try {
      const userRef = doc(db, "users", user.uid);
      let updatedUser = { ...user };

      if (editingContext === null) {
        const currentAddresses = user.addresses || [];
        const newArray = [...currentAddresses, formData];
        await updateDoc(userRef, { addresses: newArray });
        updatedUser.addresses = newArray;
      } 
      else if (editingContext.source === 'flat') {
        await updateDoc(userRef, formData);
        updatedUser = { ...updatedUser, ...formData };
      } 
      else if (editingContext.source === 'array') {
        const newArray = [...user.addresses];
        newArray[editingContext.index] = formData;
        await updateDoc(userRef, { addresses: newArray });
        updatedUser.addresses = newArray;
      }

      useAuthStore.setState({ user: updatedUser });
      toast.success(editingContext ? "Address updated!" : "Address added!");

      setIsFormOpen(false);
      setFormData(initialFormState);
      setEditingContext(null);

    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address to database.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      
      {/* --- CUSTOM CONFIRMATION MODAL --- */}
      {addressToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-sm w-full shadow-2xl shadow-pink-900/20 animate-in zoom-in-95 duration-300 border border-pink-50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                <AlertCircle className="text-red-500 w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Remove Address?</h3>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3 w-full">
              <button 
                onClick={() => setAddressToDelete(null)} 
                className="flex-1 px-5 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRemove} 
                className="flex-1 px-5 py-3 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT --- */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-pink-100/50 border border-pink-100 relative overflow-hidden">
        
        {/* Subtle Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 to-pink-600"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-pink-100/50 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 tracking-tight">Saved Addresses</h2>
            <p className="text-gray-500 text-sm mt-1.5 font-medium">Manage where we deliver your premium orders.</p>
          </div>
          {!isFormOpen && (
            <button onClick={handleAddNew} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-pink-600 shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              <Plus size={18} /> Add New Address
            </button>
          )}
        </div>

        {isFormOpen ? (
          <form onSubmit={handleSaveAddress} className="bg-gradient-to-br from-pink-50/50 to-white rounded-3xl p-6 md:p-8 border border-pink-100 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-3">
               <div className="p-2.5 bg-pink-100 rounded-xl text-pink-600 shadow-inner">
                  {editingContext ? <Edit2 size={22} /> : <MapPin size={22} />}
               </div>
              {editingContext ? "Edit Address Details" : "New Address Details"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest ml-1">Pincode</label>
                <div className="relative flex items-center px-4 py-3.5 bg-white rounded-xl border-2 border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm transition-all duration-300">
                  <input type="text" maxLength={6} required placeholder="e.g. 110001" value={formData.pincode} onChange={handlePincodeChange} className="bg-transparent w-full outline-none text-gray-700 text-base font-semibold placeholder-gray-300" />
                  {isFetchingLocation && <Loader2 size={18} className="absolute right-4 text-pink-500 animate-spin" />}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest ml-1">House / Flat No.</label>
                <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl border-2 border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm transition-all duration-300">
                  <Home size={18} className="text-pink-400" />
                  <input type="text" required placeholder="Flat 401, Building B" value={formData.houseNo} onChange={(e) => setFormData({...formData, houseNo: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-700 font-semibold placeholder-gray-300" />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest ml-1">Area / Street</label>
                <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl border-2 border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm transition-all duration-300">
                  <Navigation size={18} className="text-pink-400" />
                  <input type="text" required placeholder="Sector 62, Main Road" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-700 font-semibold placeholder-gray-300" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest ml-1">City</label>
                <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl border-2 border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm transition-all duration-300">
                  <Map size={18} className="text-pink-400" />
                  <input type="text" required placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-700 font-semibold placeholder-gray-300" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest ml-1">State</label>
                <div className={`px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${formData.state ? 'bg-gray-100 border-transparent cursor-not-allowed' : 'bg-white border-pink-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 shadow-sm'}`}>
                  <input type="text" required readOnly={!!formData.state} placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className={`bg-transparent w-full outline-none text-base font-semibold focus:ring-0 ${formData.state ? 'text-gray-500' : 'text-gray-700'}`} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-pink-100/50">
              <button type="button" onClick={() => setIsFormOpen(false)} disabled={isSaving} className="w-full sm:w-auto px-6 py-3.5 bg-white text-gray-600 rounded-xl text-sm font-semibold border-2 border-gray-200 hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 cursor-pointer flex justify-center gap-2 items-center">
                <X size={16} /> Cancel
              </button>
              <button type="submit" disabled={isSaving} className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-pink-600 shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex justify-center gap-2 items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />} 
                {isSaving ? 'Saving...' : (editingContext ? 'Update Address' : 'Save Address')}
              </button>
            </div>
          </form>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayList.length > 0 ? (
            displayList.map((addr, index) => (
              <div key={index} className="group relative bg-white border-2 border-pink-50 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 hover:border-pink-200 transition-all duration-300 flex flex-col">
                
                {/* Decorative Top Accent */}
                {addr.isDefault && (
                  <div className="absolute top-0 left-6 right-6 h-1 bg-pink-500 rounded-b-md"></div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-gray-700 font-semibold text-base">
                    <div className="p-2 bg-pink-50 rounded-lg text-pink-500 group-hover:scale-110 transition-transform">
                       <Home size={20} />
                    </div>
                    Address {index + 1}
                  </div>
                  {addr.isDefault && (
                    <span className="bg-gradient-to-r from-pink-100 to-pink-50 text-pink-600 border border-pink-200 text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      Default
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6 flex-grow pr-4">
                  {addr.text}
                </p>
                
                <div className="flex items-center gap-4 border-t border-pink-50 pt-5 mt-auto">
                  <button 
                    onClick={() => handleEdit(addr)} 
                    className="flex-1 text-sm font-semibold text-pink-600 bg-pink-50 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition-colors"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => triggerDelete(addr)} 
                    className="flex-1 text-sm font-semibold text-red-500 bg-red-50 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 hover:text-red-700 cursor-pointer transition-colors"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            !isFormOpen && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 border-2 border-dashed border-pink-100 rounded-3xl bg-pink-50/30">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-pink-100 mb-4">
                  <MapPin size={28} className="text-pink-300" />
                </div>
                <h3 className="text-base font-semibold text-gray-700 mb-1">No Addresses Found</h3>
                <p className="font-medium text-gray-500 text-sm">Add a delivery address to make checkout faster.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}