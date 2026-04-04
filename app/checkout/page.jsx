"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { MapPin, CheckCircle2, ShieldCheck, ArrowRight, Plus } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  
  // Get Global States
  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const user = useAuthStore((state) => state.user);

  // Local State for selected address
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Security Check: If no user or empty cart, kick them back to home
    if (isMounted && (!user || cartItems.length === 0)) {
      router.push("/");
    }
  }, [user, cartItems, isMounted, router]);

  if (!isMounted || !user) return null;

  const totalAmount = getTotalPrice();
  const shippingFee = totalAmount > 499 ? 0 : 50; // Free shipping over ₹499
  const finalAmount = totalAmount + shippingFee;

  const handleProceedToPayment = () => {
    // Note: Payment Gateway bypassed for now.
    // Redirect directly to the success page!
    router.push("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        
        {/* Simple Progress Bar */}
        <div className="flex items-center justify-center gap-4 mb-10 text-sm font-bold text-gray-400">
          <span className="text-pink-600 flex items-center gap-1"><CheckCircle2 size={16}/> Cart</span>
          <span className="w-10 h-px bg-pink-600"></span>
          <span className="text-gray-900 flex items-center gap-1 border-b-2 border-gray-900 pb-1"><MapPin size={16}/> Delivery</span>
          <span className="w-10 h-px bg-gray-300"></span>
          <span className="flex items-center gap-1"><ShieldCheck size={16}/> Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Address Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
                <button className="text-pink-600 font-bold flex items-center gap-1 hover:text-pink-800 transition">
                  <Plus size={16}/> Add New
                </button>
              </div>

              {user.addresses && user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedAddressIndex(index)}
                      className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddressIndex === index 
                          ? "border-pink-500 bg-pink-50 shadow-sm" 
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                    >
                      {/* Checkmark Icon for selected state */}
                      {selectedAddressIndex === index && (
                        <div className="absolute top-4 right-4 text-pink-500">
                          <CheckCircle2 size={24} className="fill-pink-100" />
                        </div>
                      )}
                      <h3 className="font-bold text-gray-900 mb-2">{user.name}</h3>
                      <p className="text-gray-600 text-sm w-11/12 leading-relaxed">{address}</p>
                      <p className="text-gray-900 font-semibold mt-3 text-sm flex items-center gap-2">
                        Mobile: {user.phone}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
                  <MapPin size={32} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">You haven't saved any addresses yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Price Details</h3>
            
            <div className="space-y-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span className="font-medium text-gray-900">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                {shippingFee === 0 ? (
                  <span className="text-green-500 font-bold">FREE</span>
                ) : (
                  <span className="font-medium text-gray-900">₹{shippingFee}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 mb-8">
              <span>Total Payable</span>
              <span>₹{finalAmount}</span>
            </div>

            <button 
              onClick={handleProceedToPayment}
              disabled={!user.addresses || user.addresses.length === 0}
              className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition hover:shadow-lg"
            >
              Continue to Payment <ArrowRight size={20} />
            </button>
            
            <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14}/> Safe and Secure Payments
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}