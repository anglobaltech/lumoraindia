"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";

import { useCartStore } from "../../store/cartStore"; 
import { useAuthStore } from "../../store/authStore"; 
import LoginModal from "../../components/LoginModal";

// FIXED: Imported setDoc instead of updateDoc
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const CartPage = () => {
  const router = useRouter(); 

  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  
  const user = useAuthStore((state) => state.user); 
  const [isMounted, setIsMounted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !user || !user.uid) return;

    const syncCartToDB = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        // FIXED: Using setDoc with merge: true guarantees the document is created if missing
        await setDoc(userRef, { cart: cartItems }, { merge: true });
        console.log("Cart successfully synced to Firebase!");
      } catch (error) {
        console.error("Failed to sync cart to Firebase:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      syncCartToDB();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [cartItems, user, isMounted]);

  if (!isMounted) return null; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 pb-16 relative text-gray-700 font-sans">
      
      <div className="absolute top-0 right-0 w-full max-w-2xl h-[400px] bg-pink-300/20 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 md:pt-10 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">

        <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-pink-200 text-pink-600 px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-pink-600 hover:text-white hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm cursor-pointer"
          >
            <ArrowLeft size={18} /> Back to Store
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center text-pink-600 shadow-inner">
            <ShoppingBag size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 tracking-tight">
            Your Shopping Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl p-12 md:p-20 text-center border border-pink-100 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <ShoppingBag size={40} className="text-pink-300" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 text-lg mb-8 font-medium">Looks like you haven't added any Lumora products yet.</p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            
            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.pack}`} className="bg-white/90 backdrop-blur-xl p-5 md:p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-pink-100 flex flex-col sm:flex-row items-center gap-6 relative group">
                  
                  <button 
                    onClick={() => removeFromCart(item.id, item.size, item.pack)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors cursor-pointer bg-red-50 p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="w-28 h-28 bg-pink-50/50 rounded-2xl flex items-center justify-center shrink-0 border border-pink-50 p-2">
                     <Image src={item.image || "/12.jpeg"} alt={item.name} width={100} height={100} className="object-contain rounded-xl drop-shadow-sm" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      Size: <span className="font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md mx-1">{item.size}</span> | 
                      Pack: <span className="font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md mx-1">{item.pack}</span>
                    </p>
                    <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500 font-semibold">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 shadow-inner">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.pack, -1)}
                      className="text-gray-400 hover:text-pink-600 hover:bg-white p-1 rounded-md transition-colors cursor-pointer"
                    >
                      <Minus size={18} />
                    </button>
                    
                    <span className="font-semibold text-lg text-gray-700 w-8 text-center">{item.quantity}</span>
                    
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.pack, 1)} 
                      className="text-gray-400 hover:text-pink-600 hover:bg-white p-1 rounded-md transition-colors cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-pink-100 h-fit sticky top-28">
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Order Summary</h3>
              
              <div className="space-y-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-700 text-lg">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Shipping</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-end text-gray-700 mb-8">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500">₹{getTotalPrice()}</span>
              </div>

              <button 
                onClick={() => {
                  if (user) {
                    router.push("/checkout"); 
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              
              <p className="text-center text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-6">
                🔒 Secure and Encrypted Checkout
              </p>
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