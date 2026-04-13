"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Edit2, Check, X, Loader2, Package, CheckCircle, MessageSquare } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { toast } from "react-toastify";

export default function ReviewsPage() {
  const user = useAuthStore((state) => state.user);
  const [myReviews, setMyReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "reviews"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetched.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMyReviews(fetched);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching user reviews:", error);
      toast.error("Failed to load your reviews.");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-gray-500 font-semibold animate-pulse text-lg tracking-wide">Loading your reviews...</p>
    </div>
  );

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditContent(review.comment); 
  };

  const handleSaveClick = async (id) => {
    if (!editContent.trim()) return toast.error("Review cannot be empty!");
    setIsSaving(true);
    try {
      const reviewRef = doc(db, "reviews", id);
      await updateDoc(reviewRef, {
        comment: editContent,
        isPublished: false 
      });

      toast.success("Review updated successfully!");
      setEditingReviewId(null);
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-pink-500 mb-5" size={48} />
        <p className="text-gray-500 font-semibold text-sm tracking-widest uppercase">Fetching your reviews...</p>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      
      {/* MAIN PAGE CONTENT */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-pink-100/50 border border-pink-100 relative overflow-hidden">
        
        {/* Subtle Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 to-pink-600"></div>

        <div className="mb-8 pb-6 border-b border-pink-100/50">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 tracking-tight">My Reviews</h2>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">View and manage the feedback you've shared.</p>
        </div>

        {myReviews.length > 0 ? (
          <div className="space-y-6">
            {myReviews.map((review) => (
              <div key={review.id} className="group bg-white border-2 border-pink-50 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 hover:border-pink-200 transition-all duration-300 flex flex-col gap-4 relative">
                <div className="flex-1 w-full">
                  
                  {/* Responsive Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    
                    {/* Left Side: Product Name & Stars */}
                    <div className="w-full flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2 text-sm sm:text-base">
                          <div className="p-1.5 bg-pink-50 rounded-lg text-pink-500">
                             <Package size={18} className="shrink-0" /> 
                          </div>
                          <span className="truncate">{review.productName}</span>
                        </h3>
                        
                        {review.isPublished ? (
                          <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm">
                            <CheckCircle size={12} /> Verified
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm">
                            <CheckCircle size={12} /> Saved
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mb-2 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" : "text-gray-300"} />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-gray-400 ml-2 border-l border-gray-200 pl-3">
                          {new Date(review.createdAt).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Action Buttons */}
                    <div className="shrink-0 self-start w-full sm:w-auto mt-2 sm:mt-0">
                      {editingReviewId !== review.id ? (
                        <button onClick={() => handleEditClick(review)} className="w-full sm:w-auto text-pink-600 hover:text-pink-700 transition flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer bg-pink-50 hover:bg-pink-100 px-4 py-2.5 rounded-xl border border-pink-100">
                          <Edit2 size={16} /> Edit Review
                        </button>
                      ) : (
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button onClick={() => setEditingReviewId(null)} disabled={isSaving} className="flex-1 sm:flex-none text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl cursor-pointer disabled:opacity-50 transition font-semibold text-sm flex items-center justify-center gap-1">
                            <X size={16} /> Cancel
                          </button>
                          <button onClick={() => handleSaveClick(review.id)} disabled={isSaving} className="flex-1 sm:flex-none text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-4 py-2.5 rounded-xl cursor-pointer disabled:opacity-50 transition flex items-center justify-center gap-1 font-semibold text-sm shadow-md">
                            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Text Area / Review Content */}
                  {editingReviewId === review.id ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      disabled={isSaving}
                      className="w-full mt-4 p-4 bg-gray-50 border-2 border-pink-200 rounded-xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 text-sm font-semibold text-gray-700 resize-none transition-all disabled:opacity-70 shadow-inner"
                      rows="4"
                    />
                  ) : (
                    <p className="text-sm sm:text-base font-medium text-gray-600 mt-4 leading-relaxed bg-gray-50/80 p-4 rounded-2xl border border-gray-100 italic">
                      "{review.comment}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-pink-50/30 rounded-[2rem] border-2 border-dashed border-pink-100">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-pink-100 mb-5">
                <MessageSquare size={36} className="text-pink-300" />
             </div>
             <h3 className="text-lg font-semibold text-gray-700 mb-2">No reviews yet</h3>
             <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto">Share your experience with products you've purchased to help others.</p>
          </div>
        )}
      </div>
    </div>
  );
}