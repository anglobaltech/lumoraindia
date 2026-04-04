"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

// Used relative paths to prevent build errors
import { useCartStore } from "../../store/cartStore"; 
import { useAuthStore } from "../../store/authStore"; // 👈 Added Auth Store Import
import LoginModal from "../../components/LoginModal";

const CartPage = () => {
  // 1. Get cart data and functions from our Zustand store
  const { cartItems, removeFromCart, addToCart, getTotalPrice } = useCartStore();
  
  // 2. Get user data from our Auth store
  const user = useAuthStore((state) => state.user); // 👈 Accessing current user state

  // 3. Hydration fix for Next.js
  const [isMounted, setIsMounted] = useState(false);
  
  // 4. State to control the Login Modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent SSR flicker

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5 text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          // EMPTY CART VIEW
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any Lumora products yet.</p>
            <Link href="/products">
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-xl">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          // ACTIVE CART VIEW
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 relative">
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={20} />
                  </button>

                  {/* Product Image Placeholder */}
                  <div className="w-24 h-24 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                     <Image src={item.image || "/12.jpeg"} alt={item.name} width={80} height={80} className="object-cover rounded-lg" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Size: <span className="font-semibold text-gray-700">{item.size}</span></p>
                    <p className="text-pink-600 font-bold">₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-full border border-gray-200">
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-gray-600 hover:text-pink-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item, item.size, 1)} 
                      className="text-gray-600 hover:text-pink-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Order Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-3 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-pink-500 font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 mb-8">
                <span>Total</span>
                <span>₹{getTotalPrice()}</span>
              </div>

              {/* 👇 Smart Checkout Button Logic 👇 */}
              <button 
                onClick={() => {
                  if (user) {
                    router.push("/checkout"); // 👈 Actually sends them to the new page!
                  } else {
                      setIsLoginModalOpen(true);
                    }
                }}
                className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition hover:shadow-lg"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
            </div>

          </div>
        )}

        {/* THE LOGIN MODAL COMPONENT */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />

      </div>
    </div>
  );
};

export default CartPage;