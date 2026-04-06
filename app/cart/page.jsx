"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

import { useCartStore } from "../../store/cartStore"; 
import { useAuthStore } from "../../store/authStore"; 
import LoginModal from "../../components/LoginModal";

const CartPage = () => {
  const router = useRouter(); 

  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  
  const user = useAuthStore((state) => state.user); 
  const [isMounted, setIsMounted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; 

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5 text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any Lumora products yet.</p>
            <Link href="/products">
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-xl cursor-pointer">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.pack}`} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 relative">
                  
                  <button 
                    onClick={() => removeFromCart(item.id, item.size, item.pack)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="w-24 h-24 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                     <Image src={item.image || "/12.jpeg"} alt={item.name} width={80} height={80} className="object-cover rounded-lg" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Size: <span className="font-semibold text-gray-700">{item.size}</span> | 
                      Pack: <span className="font-semibold text-gray-700">{item.pack}</span>
                    </p>
                    <p className="text-pink-600 font-bold">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-full border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.pack, -1)}
                      className="text-gray-600 hover:text-pink-600 cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.pack, 1)} 
                      className="text-gray-600 hover:text-pink-600 cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

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

              <button 
                onClick={() => {
                  if (user) {
                    router.push("/checkout"); 
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition hover:shadow-lg cursor-pointer"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default CartPage;