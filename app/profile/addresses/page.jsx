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

  if (!user) return <div className="p-8 text-center bg-white rounded-2xl shadow-sm">Please log in.</div>;

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

  // TRIGGER THE CUSTOM DELETE MODAL
  const triggerDelete = (addr) => {
    setAddressToDelete(addr);
  };

  // CONFIRM REMOVE (Called from the modal)
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
      // Close the modal whether it succeeded or failed
      setAddressToDelete(null);
    }
  };

  // SAVE OR UPDATE ADDRESS
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

      // Update UI immediately
      useAuthStore.setState({ user: updatedUser });
      toast.success(editingContext ? "Address updated!" : "Address added!");

      // Close form immediately after saving
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
    <>
      {/* --- CUSTOM CONFIRMATION MODAL --- */}
      {addressToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-red-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">Remove Address?</h3>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-8 ml-2">
              Are you sure you want to delete this address?
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setAddressToDelete(null)} 
                className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRemove} 
                className="px-5 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 shadow-md transition cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT --- */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Saved Addresses</h2>
            <p className="text-gray-500 text-sm mt-1">Manage where we deliver your orders.</p>
          </div>
          {!isFormOpen && (
            <button onClick={handleAddNew} className="flex items-center gap-2 bg-pink-50 text-pink-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-pink-100 transition cursor-pointer">
              <Plus size={18} /> Add New
            </button>
          )}
        </div>

        {isFormOpen ? (
          <form onSubmit={handleSaveAddress} className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-inner mb-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {editingContext ? "Edit Address" : "Add New Address"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Pincode</label>
                <div className="relative flex items-center p-4 bg-white rounded-xl border-2 border-pink-100 focus-within:border-pink-500 shadow-sm transition-all duration-200">
                  <input type="text" maxLength={6} required placeholder="e.g. 110001" value={formData.pincode} onChange={handlePincodeChange} className="bg-transparent w-full outline-none text-gray-900 text-base font-semibold" />
                  {isFetchingLocation && <Loader2 size={18} className="absolute right-4 text-pink-500 animate-spin" />}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">House / Flat No.</label>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-pink-100 focus-within:border-pink-500 shadow-sm transition-all duration-200">
                  <Home size={18} className="text-pink-400" />
                  <input type="text" required placeholder="Flat 401, Building B" value={formData.houseNo} onChange={(e) => setFormData({...formData, houseNo: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-semibold" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Area / Street</label>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-pink-100 focus-within:border-pink-500 shadow-sm transition-all duration-200">
                  <Navigation size={18} className="text-pink-400" />
                  <input type="text" required placeholder="Sector 62, Main Road" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-semibold" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">City</label>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-pink-100 focus-within:border-pink-500 shadow-sm transition-all duration-200">
                  <Map size={18} className="text-pink-400" />
                  <input type="text" required placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="bg-transparent w-full outline-none text-base text-gray-900 font-semibold" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">State</label>
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${formData.state ? 'bg-gray-100 border-transparent cursor-not-allowed' : 'bg-white border-pink-100 focus-within:border-pink-500'}`}>
                  <input type="text" required readOnly={!!formData.state} placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="bg-transparent w-full outline-none text-base font-semibold focus:ring-0 text-gray-700" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={() => setIsFormOpen(false)} disabled={isSaving} className="px-5 py-3 bg-white text-gray-600 rounded-xl text-sm font-bold border border-gray-200 hover:bg-gray-50 cursor-pointer flex gap-1 items-center">
                <X size={16} /> Cancel
              </button>
              <button type="submit" disabled={isSaving} className="px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl text-sm font-bold hover:from-pink-700 hover:to-pink-600 shadow-md flex gap-1 items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} 
                {isSaving ? 'Saving...' : (editingContext ? 'Update Address' : 'Save Address')}
              </button>
            </div>
          </form>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayList.length > 0 ? (
            displayList.map((addr, index) => (
              <div key={index} className="border-2 border-gray-100 rounded-2xl p-6 relative group hover:border-pink-200 transition-all shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold">
                  <Home size={18} className="text-pink-500" />
                  <span>Address {index + 1}</span>
                  {addr.isDefault && (
                    <span className="bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ml-2">Default</span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{addr.text}</p>
                
                <div className="flex gap-4 border-t border-gray-100 pt-4 mt-auto">
                  <button 
                    onClick={() => handleEdit(addr)} 
                    className="text-sm font-bold text-pink-600 flex items-center gap-1 hover:text-pink-800 cursor-pointer transition-colors"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => triggerDelete(addr)} 
                    className="text-sm font-bold text-red-500 flex items-center gap-1 hover:text-red-700 cursor-pointer transition-colors"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            !isFormOpen && (
              <div className="col-span-2 text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                <MapPin size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="font-medium text-gray-600">No addresses saved yet.</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}