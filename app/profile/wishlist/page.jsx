"use client";
import React, { useState } from "react";
import { Heart, Trash2, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "../../../store/authStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase"; 
import { toast } from "react-toastify";

export default function WishlistPage() {
  const { user } = useAuthStore();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const wishlistItems = user?.wishlist || [];

  const confirmRemove = async () => {
    if (!itemToRemove || !user) return;
    
    setIsRemoving(true);
    try {
      const updatedWishlist = wishlistItems.filter(item => item.id !== itemToRemove.id);
      const userRef = doc(db, "users", user.uid);
      
      await updateDoc(userRef, { wishlist: updatedWishlist });
      useAuthStore.setState({ user: { ...user, wishlist: updatedWishlist } });
      
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    } finally {
      setIsRemoving(false);
      setItemToRemove(null);
    }
  };

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-gray-500 font-semibold animate-pulse text-lg tracking-wide">Authenticating...</p>
    </div>
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      
      {/* CONFIRMATION MODAL */}
      {itemToRemove && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-sm w-full shadow-2xl shadow-pink-900/20 animate-in zoom-in-95 duration-300 border border-pink-50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Trash2 className="text-red-500 w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Remove Item?</h3>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
              Are you sure you want to remove <span className="font-semibold text-gray-700">"{itemToRemove.name}"</span> from your wishlist?
            </p>
            
            <div className="flex justify-end gap-3 w-full">
              <button 
                onClick={() => setItemToRemove(null)}
                className="flex-1 px-5 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                disabled={isRemoving}
              >
                Cancel
              </button>
              <button 
                onClick={confirmRemove}
                disabled={isRemoving}
                className="flex-1 px-5 py-3 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex justify-center items-center disabled:opacity-70"
              >
                {isRemoving ? <Loader2 size={18} className="animate-spin" /> : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PAGE CONTENT */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-pink-100/50 border border-pink-100 relative overflow-hidden">
        
        {/* Subtle Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 to-pink-600"></div>

        <div className="mb-8 pb-6 border-b border-pink-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 tracking-tight">My Wishlist</h2>
            <p className="text-gray-500 text-sm mt-1.5 font-medium">Products you've saved for later.</p>
          </div>
          <span className="bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border border-pink-100 w-fit">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Saved
          </span>
        </div>

        {/* Conditionally Render Empty State OR List */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-pink-50/30 rounded-[2rem] border-2 border-dashed border-pink-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-pink-100 mb-5">
               <Heart size={36} className="text-pink-300 fill-pink-100" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto mb-8">
              Save items you love here so you can easily find them and buy them later.
            </p>
            <Link href="/products">
              <button className="px-8 py-3.5 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                Explore Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group border-2 border-pink-50 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start bg-white hover:shadow-xl hover:shadow-pink-100/50 hover:border-pink-200 transition-all duration-300 text-center sm:text-left">
                
                <div className="relative w-28 h-28 sm:w-24 sm:h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100 group-hover:scale-105 transition-transform duration-500">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 w-full flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-700 text-base leading-tight line-clamp-2">{item.name}</h3>
                    <p className="text-pink-600 font-semibold mt-1 text-lg">From ₹{item.price}</p>
                  </div>
                  
                  <div className="flex gap-3 mt-4 sm:mt-0 pt-4 sm:pt-4">
                    {/* View Details Routes directly to the Product Page */}
                    <Link href={`/products`} className="flex-1">
                      <button className="w-full py-2.5 bg-pink-50 text-pink-600 text-sm font-semibold rounded-xl hover:bg-pink-100 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <ExternalLink size={16} /> View
                      </button>
                    </Link>
                    
                    {/* Remove Button triggers Confirmation Modal */}
                    <button 
                      onClick={() => setItemToRemove(item)}
                      className="px-4 py-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}