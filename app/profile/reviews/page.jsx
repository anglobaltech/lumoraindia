"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Edit2, Check, X, Loader2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { toast } from "react-toastify";

export default function ReviewsPage() {
  const user = useAuthStore((state) => state.user);
  
  // Initialize with empty array, we will populate it in useEffect
  const [myReviews, setMyReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load reviews from the user object (or use dummy data if they don't have any yet)
  useEffect(() => {
    if (user?.reviews && user.reviews.length > 0) {
      setMyReviews(user.reviews);
    } else {
      // Fallback dummy data if no reviews exist in DB yet
      setMyReviews([
        {
          id: 1,
          productName: "Lumora Premium Soft Pads",
          date: "14 Oct 2024",
          rating: 5,
          reviewText: "Absolutely love these! Extremely comfortable and no leakage during heavy flow days.",
          image: "/12.jpeg" 
        }
      ]);
    }
  }, [user]);

  if (!user) return <div className="p-8 text-center bg-white rounded-2xl shadow-sm">Please log in.</div>;

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditContent(review.reviewText);
  };

  const handleSaveClick = async (id) => {
    setIsSaving(true);
    try {
      // 1. Create the updated array of reviews
      const updatedReviews = myReviews.map(review => 
        review.id === id ? { ...review, reviewText: editContent } : review
      );

      // 2. Update Firebase (Assuming reviews are stored in an array on the user doc)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        reviews: updatedReviews
      });

      // 3. Update local UI state
      setMyReviews(updatedReviews);
      
      // 4. Update global Zustand store so it's in sync
      useAuthStore.setState({ user: { ...user, reviews: updatedReviews } });

      toast.success("Review updated successfully!");
      setEditingReviewId(null);
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">My Reviews</h2>
      
      {myReviews.length > 0 ? (
        <div className="space-y-6">
          {myReviews.map((review) => (
            <div key={review.id} className="border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row gap-5 relative group transition-all hover:border-pink-200 shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <Image src={review.image || "/placeholder.jpg"} alt={review.productName} width={80} height={80} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">{review.productName}</h3>
                  
                  {/* Action Buttons */}
                  {editingReviewId !== review.id ? (
                    <button onClick={() => handleEditClick(review)} className="text-pink-600 hover:text-pink-800 transition flex items-center gap-1 text-sm font-bold cursor-pointer bg-pink-50 px-3 py-1.5 rounded-lg">
                      <Edit2 size={14} /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setEditingReviewId(null)} disabled={isSaving} className="text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-lg cursor-pointer disabled:opacity-50 transition">
                        <X size={16} />
                      </button>
                      <button onClick={() => handleSaveClick(review.id)} disabled={isSaving} className="text-white bg-green-500 hover:bg-green-600 p-2 rounded-lg cursor-pointer disabled:opacity-50 transition flex items-center justify-center min-w-[36px]">
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="text-xs font-semibold text-gray-500 ml-2">{review.date}</span>
                </div>
                
                {/* Text Area Toggle */}
                {editingReviewId === review.id ? (
                  <textarea 
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    disabled={isSaving}
                    className="w-full mt-3 p-3 border-2 border-pink-100 rounded-xl outline-none focus:border-pink-400 text-sm font-medium text-gray-800 resize-none transition-all disabled:bg-gray-50"
                    rows="3"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-600 italic mt-2">"{review.reviewText}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">You haven't reviewed any products yet.</p>
        </div>
      )}
    </div>
  );
}