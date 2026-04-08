"use client";
import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

function SuccessContent() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  
  // Grab the real Order ID that the API passed back, or show a fallback
  const orderId = searchParams.get("orderId") || "LUM-CONFIRMED";

  useEffect(() => {
    // Empty the user's cart because they just bought the items!
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-white max-w-lg w-full rounded-3xl p-8 md:p-12 shadow-xl text-center border border-pink-100">
      
      {/* Animated Checkmark */}
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
        <CheckCircle size={50} className="text-green-500" />
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-2">Congratulations! 🎉</h1>
      <h2 className="text-xl font-bold text-pink-600 mb-4">Order Placed Successfully</h2>
      
      <p className="text-gray-500 mb-8">
        Thank you for choosing Lumora India. A confirmation email has been sent to your inbox.
      </p>

      {/* Order Details Card */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200 text-left">
        <p className="text-sm text-gray-500 mb-1">Your Order Tracking ID</p>
        <p className="font-bold text-gray-900 text-2xl mb-4">{orderId}</p>
        
        <div className="flex items-center gap-3 text-pink-600 bg-pink-50 p-3 rounded-xl border border-pink-100">
          <Package size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">You can track this in the "My Orders" section of your profile.</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <Link href="/">
          <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <ShoppingBag size={20} /> Continue Shopping
          </button>
        </Link>
        
        <Link href="/profile" className="block w-full text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
          View My Profile <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-5">
      <Suspense fallback={<div className="text-pink-600 font-bold animate-pulse">Loading receipt...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}