"use client";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { db } from "../../lib/firebase";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { MapPin, CheckCircle2, ShieldCheck, ArrowRight, Plus, X, Loader2, Banknote, CreditCard, ShoppingBag, Edit2, Trash2 } from "lucide-react";
import { fetchLocationFromPincode } from "../../app/actions/location";

export default function CheckoutPage() {
  const router = useRouter();

  // Get Global States
  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart); 
  const user = useAuthStore((state) => state.user);

  // Local States
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Success States
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [placedOrderAmount, setPlacedOrderAmount] = useState(0); // FIXED: Captures exact amount before cart clears!

  // States for Address Form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null); // Tracks which address is being edited
  const [formData, setFormData] = useState({
    houseNo: "", area: "", landmark: "", city: "", state: "", pincode: ""
  });

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && !orderSuccess && (!user || cartItems.length === 0)) {
      router.push("/");
    }
  }, [user, cartItems, isMounted, router, orderSuccess]);

  useEffect(() => {
    const fetchLocationData = async () => {
      if (formData.pincode.length === 6) {
        setIsFetchingLocation(true);
        try {
          const data = await fetchLocationFromPincode(formData.pincode);
          if (data && data[0].Status === "Success") {
            const locationDetails = data[0].PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              city: locationDetails.District,
              state: locationDetails.State
            }));
          }
        } catch (error) {
          console.error("Failed to fetch location:", error);
        } finally {
          setIsFetchingLocation(false);
        }
      }
    };
    fetchLocationData();
  }, [formData.pincode]);

  if (!isMounted || !user) return null;

  const totalAmount = getTotalPrice();
  const shippingFee = totalAmount > 499 ? 0 : 50;
  const finalAmount = totalAmount + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditAddress = (index, address, e) => {
    e.stopPropagation();
    
    // If it's an old string address, we can't cleanly edit it, but if it's an object:
    if (typeof address === "object") {
      setFormData({
        houseNo: address.houseNo || "",
        area: address.area || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || ""
      });
    } else {
      setFormData({ houseNo: "", area: "", landmark: "", city: "", state: "", pincode: "" });
    }
    
    setEditingAddressIndex(index);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (index, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    
    try {
      const updatedAddresses = [...(user.addresses || [])];
      updatedAddresses.splice(index, 1);
      
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { addresses: updatedAddresses }, { merge: true });
      
      // Update global store
      useAuthStore.setState((state) => ({
        user: { ...state.user, addresses: updatedAddresses }
      }));

      // Reset selection if needed
      if (selectedAddressIndex === index) {
        setSelectedAddressIndex(0);
      } else if (selectedAddressIndex > index) {
        setSelectedAddressIndex(prev => prev - 1);
      }
    } catch(err) {
       console.error("Error deleting address", err);
       alert("Failed to delete. Please try again.");
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const newAddressObj = { ...formData };

    try {
      const userRef = doc(db, "users", user.uid);
      let updatedAddresses = user.addresses ? [...user.addresses] : [];

      if (editingAddressIndex !== null) {
        updatedAddresses[editingAddressIndex] = newAddressObj; // Update existing
      } else {
        updatedAddresses.push(newAddressObj); // Add new
      }

      // Sync to Firebase (Also save flat fields so the Profile Page sees it natively!)
      await setDoc(userRef, { 
        addresses: updatedAddresses,
        houseNo: formData.houseNo,
        area: formData.area,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      }, { merge: true });

      // Update Local Store Instantly
      useAuthStore.setState((state) => ({
        user: { 
          ...state.user, 
          addresses: updatedAddresses,
          houseNo: formData.houseNo,
          area: formData.area,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }
      }));

      setSelectedAddressIndex(editingAddressIndex !== null ? editingAddressIndex : updatedAddresses.length - 1);
      setShowAddressForm(false);
      setEditingAddressIndex(null);
      setFormData({ houseNo: "", area: "", landmark: "", city: "", state: "", pincode: "" });
    } catch (error) {
      console.error("Failed to save address:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleProceedToPayment = async () => {
    if (paymentMethod === "ONLINE") {
      alert("Online payments are coming soon! Please use Cash on Delivery.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;

      // Use the selected address object or string
      const selectedAddr = user?.addresses?.[selectedAddressIndex];
      const addressString = typeof selectedAddr === "object" 
        ? `${selectedAddr.houseNo}, ${selectedAddr.area}, ${selectedAddr.landmark ? selectedAddr.landmark + ", " : ""}${selectedAddr.city}, ${selectedAddr.state}, ${selectedAddr.pincode}`
        : selectedAddr;

      // Construct the EXACT payload the Admin Dashboard expects
      const orderPayload = {
        orderId: orderId,
        userId: user?.uid || "guest_user", 
        user: { 
          name: user?.name || "Customer", 
          email: user?.email || "no-email@provided.com", 
          phone: user?.phone || "Not provided" 
        },
        customerEmail: user?.email || "", // Added for Admin Table search
        customerPhone: user?.phone || "", // Added for Admin Table search
        address: addressString || "No Address Provided",
        cartItems: cartItems,
        totals: { totalAmount, shippingFee, finalAmount },
        paymentMethod: "COD",
        status: "processing", // Changed to lowercase 'processing' to match Admin Badges
        createdAt: new Date().toISOString()
      };

      // 1. Securely Save Order to Firebase
      await addDoc(collection(db, "orders"), orderPayload);

      // 2. Append order to User's Order History
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { myOrders: [...(user.myOrders || []), orderId] }, { merge: true });
      }

      // 3. Attempt API route (e.g., for sending Emails), but fail gracefully if missing
      try {
        const response = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        // Only try to parse JSON if the response headers say it IS json
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await response.json();
          if (!result.success) console.warn("API route responded, but reported failure.");
        }
      } catch (apiError) {
        console.warn("API route /api/order failed (likely missing), but order was still placed in Firebase successfully.");
        // We ignore this error because the Firebase save already worked!
      }

      // 4. Always show Success Screen and Clear Cart
      setPlacedOrderId(orderId);
      setPlacedOrderAmount(finalAmount); 
      setOrderSuccess(true); 
      if (clearCart) clearCart(); 

    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong placing your order. Please check console for details.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Success Screen
  if (orderSuccess) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center py-10 px-5">
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="fill-green-100" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">Congratulations!</h1>
          <p className="text-gray-600 mb-6 text-lg">Your order has been placed successfully.</p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200 text-left">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-semibold text-gray-700">{placedOrderId}</p>
            <p className="text-sm text-gray-500 mt-3 mb-1">Total Amount</p>
            {/* FIXED: Uses the frozen snapshot value! */}
            <p className="font-semibold text-gray-700">₹{placedOrderAmount}</p> 
          </div>

          <button 
            onClick={() => router.push("/")} 
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition hover:shadow-lg cursor-pointer"
          >
            <ShoppingBag size={20} /> Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Checkout UI
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10 text-sm font-semibold text-gray-400">
          <span className="text-pink-600 flex items-center gap-1"><CheckCircle2 size={16} /> Cart</span>
          <span className="w-10 h-px bg-pink-600"></span>
          <span className="text-gray-700 flex items-center gap-1 border-b-2 border-gray-700 pb-1"><MapPin size={16} /> Delivery</span>
          <span className="w-10 h-px bg-gray-300"></span>
          <span className="flex items-center gap-1"><ShieldCheck size={16} /> Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* ADDRESS SECTION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Select Delivery Address</h2>
                <button 
                  onClick={() => {
                    setFormData({ houseNo: "", area: "", landmark: "", city: "", state: "", pincode: "" });
                    setEditingAddressIndex(null);
                    setShowAddressForm(!showAddressForm);
                  }} 
                  className="text-pink-600 font-semibold flex items-center gap-1 hover:text-pink-800 transition cursor-pointer"
                >
                  {showAddressForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add New</>}
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleSaveAddress} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-4">{editingAddressIndex !== null ? "Edit Address" : "Add New Address"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="text" name="houseNo" placeholder="Flat / House No." value={formData.houseNo} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none" />
                    <input required type="text" name="area" placeholder="Area / Sector" value={formData.area} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none" />
                    <input type="text" name="landmark" placeholder="Landmark (Optional)" value={formData.landmark} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none md:col-span-2" />
                    <div className="relative">
                      <input required type="text" name="pincode" placeholder="Pincode (6 digits)" value={formData.pincode} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none" />
                      {isFetchingLocation && <Loader2 className="absolute right-3 top-3 animate-spin text-pink-500" size={20} />}
                    </div>
                    <input required type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className={`w-full border rounded-lg p-3 text-sm outline-none transition-colors ${isFetchingLocation ? 'bg-gray-100 border-gray-200 text-gray-500' : 'border-gray-300 focus:ring-2 focus:ring-pink-500'}`} />
                    <input required type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className={`w-full border rounded-lg p-3 text-sm outline-none transition-colors ${isFetchingLocation ? 'bg-gray-100 border-gray-200 text-gray-500' : 'border-gray-300 focus:ring-2 focus:ring-pink-500'}`} />
                  </div>
                  <button type="submit" disabled={isSaving} className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:bg-pink-300 cursor-pointer">
                    {isSaving ? "Saving..." : "Save Address"}
                  </button>
                </form>
              )}

              {user.addresses && user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address, index) => {
                    const displayAddress = typeof address === "object" 
                      ? `${address.houseNo}, ${address.area}, ${address.landmark ? address.landmark + ", " : ""}${address.city}, ${address.state}, ${address.pincode}`
                      : address;

                    return (
                      <div 
                        key={index} 
                        onClick={() => setSelectedAddressIndex(index)} 
                        className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedAddressIndex === index ? "border-pink-500 bg-pink-50 shadow-sm" : "border-gray-200 hover:border-pink-300"}`}
                      >
                        {selectedAddressIndex === index && <div className="absolute top-4 right-4 text-pink-500"><CheckCircle2 size={24} className="fill-pink-100" /></div>}
                        
                        <h3 className="font-semibold text-gray-700 mb-2">{user.name || "Customer"}</h3>
                        <p className="text-gray-600 text-sm w-10/12 leading-relaxed pr-10">{displayAddress}</p>
                        <p className="text-gray-700 font-semibold mt-3 text-sm flex items-center gap-2">Mobile: {user.phone || "Not provided"}</p>
                        
                        {/* Edit & Delete Action Buttons */}
                        <div className="absolute bottom-4 right-4 flex gap-3">
                          <button 
                            onClick={(e) => handleEditAddress(index, address, e)} 
                            className="text-gray-400 hover:text-pink-600 transition-colors p-2 bg-white rounded-full shadow-sm border border-gray-100 cursor-pointer"
                            title="Edit Address"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={(e) => handleDeleteAddress(index, e)} 
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm border border-gray-100 cursor-pointer"
                            title="Delete Address"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                !showAddressForm && (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
                    <MapPin size={32} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600">You haven't saved any addresses yet.</p>
                    <button onClick={() => setShowAddressForm(true)} className="mt-4 text-pink-600 font-semibold hover:underline cursor-pointer">Add one now</button>
                  </div>
                )
              )}
            </div>

            {/* PAYMENT SECTION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div onClick={() => setPaymentMethod("COD")} className={`relative p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${paymentMethod === "COD" ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300"}`}>
                  <Banknote className={paymentMethod === "COD" ? "text-pink-600" : "text-gray-400"} />
                  <span className="font-semibold text-gray-700">Cash on Delivery</span>
                  {paymentMethod === "COD" && <CheckCircle2 size={20} className="absolute right-4 text-pink-500 fill-pink-100" />}
                </div>
                <div onClick={() => setPaymentMethod("ONLINE")} className={`relative p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${paymentMethod === "ONLINE" ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300"}`}>
                  <CreditCard className={paymentMethod === "ONLINE" ? "text-pink-600" : "text-gray-400"} />
                  <span className="font-semibold text-gray-700">Pay Online</span>
                  <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded-full absolute right-4">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* TOTALS & PLACE ORDER */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Price Details</h3>
            <div className="space-y-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span className="font-medium text-gray-700">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                {shippingFee === 0 ? <span className="text-green-500 font-semibold">FREE</span> : <span className="font-medium text-gray-700">₹{shippingFee}</span>}
              </div>
            </div>
            <div className="flex justify-between text-xl font-semibold text-gray-700 mb-8">
              <span>Total Payable</span>
              <span>₹{finalAmount}</span>
            </div>
            <button 
              onClick={handleProceedToPayment} 
              disabled={!user.addresses || user.addresses.length === 0 || isPlacingOrder} 
              className="w-full bg-gray-700 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition hover:shadow-lg cursor-pointer"
            >
              {isPlacingOrder ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : <>{paymentMethod === "COD" ? "Place Order (COD)" : "Continue to Payment"} <ArrowRight size={20} /></>}
            </button>
            <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> Safe and Secure Payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}