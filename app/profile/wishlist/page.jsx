"use client";
import React, { useState } from "react";
import { Heart, Trash2, ExternalLink } from "lucide-react";
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

  // Fallback to empty array if user or wishlist doesn't exist yet
  const wishlistItems = user?.wishlist || [];

  // Function to remove item from Firebase and Zustand
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

  if (!user) {
    return <div className="p-8 text-center bg-white rounded-2xl shadow-sm">Please log in to view your wishlist.</div>;
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative">
      
      <div className="mb-8 pb-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Wishlist</h2>
          <p className="text-gray-500 text-sm mt-1">Products you've saved for later.</p>
        </div>
        <span className="bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full text-sm font-bold border border-pink-100">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Conditionally Render Empty State OR List */}
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
          <Heart size={48} className="mx-auto mb-4 text-pink-300" />
          <h3 className="text-lg font-bold text-gray-700">Your wishlist is empty</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
            Save items you love here so you can easily find them and buy them later.
          </p>
          <Link href="/products">
            <button className="mt-6 px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition shadow-md cursor-pointer">
              Explore Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border border-gray-100 rounded-2xl p-4 flex gap-4 items-center bg-white hover:shadow-md transition group">
              
              <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                <p className="text-pink-600 font-black mt-1">From ₹{item.price}</p>
                
                <div className="flex gap-3 mt-3">
                  {/* View Details Routes directly to the Product Page */}
                  <Link href={`/products`} className="flex-1">
                    <button className="w-full py-2 bg-pink-50 text-pink-600 text-xs font-bold rounded-lg hover:bg-pink-100 transition flex items-center justify-center gap-1 cursor-pointer">
                      <ExternalLink size={14} /> View Details
                    </button>
                  </Link>
                  
                  {/* Remove Button triggers Confirmation Modal */}
                  <button 
                    onClick={() => setItemToRemove(item)}
                    className="p-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {itemToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Remove Item?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to remove <span className="font-bold text-gray-700">"{itemToRemove.name}"</span> from your wishlist?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setItemToRemove(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition cursor-pointer"
                disabled={isRemoving}
              >
                Cancel
              </button>
              <button 
                onClick={confirmRemove}
                disabled={isRemoving}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition cursor-pointer flex justify-center items-center"
              >
                {isRemoving ? "Removing..." : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}