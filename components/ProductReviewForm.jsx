"use client";
import React, { useState } from "react";
import { Star, Loader2, Send } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";

export default function ProductReviewForm({ productId = "master_product", productName = "Lumora Master Product" }) {
  const user = useAuthStore((state) => state.user);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) return toast.error("Please log in to leave a review.");
    if (rating === 0) return toast.error("Please select a star rating.");
    if (!comment.trim()) return toast.error("Please write a short review.");

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "reviews"), {
        productId: productId,
        productName: productName,
        userId: user.uid,
        userName: user.displayName || "Lumora Customer",
        rating: rating,
        comment: comment.trim(),
        isPublished: false, // Goes to Admin Panel for approval first
        createdAt: new Date().toISOString()
      });

      toast.success("Thank you! Your review has been submitted for approval.");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl text-center">
        <h3 className="font-bold text-gray-900 mb-2">Write a Review</h3>
        <p className="text-sm text-gray-500">You must be logged in to review {productName}.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <h3 className="text-xl font-extrabold text-gray-900 mb-1">Write a Review</h3>
      <p className="text-sm text-gray-500 mb-6">Share your experience with {productName}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating System */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Overall Rating</label>
          <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star 
                  size={28} 
                  className={(hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Written Review */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike? What did you use this product for?"
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none bg-gray-50 font-medium text-gray-800 resize-none transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}