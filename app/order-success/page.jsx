"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export default function OrderSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // 1. Generate a random mock Order ID for now
    setOrderId(`LUM-${Math.floor(100000 + Math.random() * 900000)}`);
    
    // 2. Empty the user's cart because they just "bought" the items!
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="bg-white max-w-lg w-full rounded-3xl p-8 md:p-12 shadow-xl text-center border border-gray-100">
        
        {/* Animated Checkmark */}
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={50} className="text-green-500" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for choosing Lumora. Your order has been successfully placed and is being processed.
        </p>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 text-left">
          <p className="text-sm text-gray-500 mb-1">Order Tracking ID</p>
          <p className="font-bold text-gray-900 text-lg mb-4">{orderId}</p>
          
          <div className="flex items-center gap-3 text-pink-600 bg-pink-50 p-3 rounded-xl">
            <Package size={20} />
            <span className="text-sm font-semibold">You will receive an SMS with tracking details shortly.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/profile/orders">
            <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition shadow-md">
              Track My Order
            </button>
          </Link>
          <Link href="/">
            <button className="w-full bg-white text-gray-700 font-bold py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              Continue Shopping <ArrowRight size={18} />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}