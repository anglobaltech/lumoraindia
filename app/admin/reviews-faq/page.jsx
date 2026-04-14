"use client";
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Star, Trash2, CheckCircle, XCircle, MessageSquare, Package, User } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reviews dynamically and listen for real-time changes
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(fetchedReviews);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews. Check console for details.");
      setIsLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Handle deleting a review entirely
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this review?")) return;
    try {
      await deleteDoc(doc(db, "reviews", id));
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    }
  };

  // Toggle whether the review is visible on your main website
  const togglePublishStatus = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "reviews", id), {
        isPublished: !currentStatus
      });
      toast.success(currentStatus ? "Review hidden from website" : "Review published to website!");
    } catch (error) {
      console.error("Error updating review status:", error);
      toast.error("Failed to update status");
    }
  };

  // Helper function to render stars dynamically
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Fetching live customer reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <MessageSquare className="text-pink-600" /> Customer Reviews
        </h1>
        <p className="text-gray-500 text-sm mt-1">Monitor, approve, and manage feedback from your customers.</p>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <MessageSquare size={32} className="text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-700">No reviews yet</h3>
          <p className="text-gray-500 mt-1">When customers leave reviews, they will appear here dynamically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
              
              {/* Reviewer Info & Rating */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 font-semibold uppercase shrink-0">
                    {review.userName ? review.userName.charAt(0) : <User size={18} />}
                  </div>
                  <div>
                    {/* Fetching and displaying the dynamic Username */}
                    <h3 className="font-semibold text-gray-700 truncate max-w-[150px]" title={review.userName}>
                      {review.userName || "User"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-IN') : "Unknown Date"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {renderStars(review.rating || 5)}
                </div>
              </div>

              {/* Product Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg mb-4 w-fit border border-gray-100">
                <Package size={14} />
                {review.productName || "Lumora Master Product"}
              </div>

              {/* Review Content */}
              <p className="text-gray-700 text-sm flex-1 mb-6 italic">
                "{review.comment || "No text provided."}"
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                <button
                  onClick={() => togglePublishStatus(review.id, review.isPublished)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    review.isPublished 
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {review.isPublished ? (
                    <><CheckCircle size={16} /> Published</>
                  ) : (
                    <><XCircle size={16} /> Hidden</>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                  title="Delete Review"
                >
                  <Trash2 size={20} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}