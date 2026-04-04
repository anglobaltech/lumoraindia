"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  // Mock data for Phase 4
  const myReviews = [
    {
      id: 1,
      productName: "Lumora Premium Soft Pads",
      date: "14 Oct 2024",
      rating: 5,
      reviewText: "Absolutely love these! Extremely comfortable and no leakage during heavy flow days.",
      image: "/12.jpeg"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">My Reviews</h2>
      
      {myReviews.length > 0 ? (
        <div className="space-y-6">
          {myReviews.map((review) => (
            <div key={review.id} className="border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row gap-5">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <Image src={review.image} alt={review.productName} width={80} height={80} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{review.productName}</h3>
                <div className="flex items-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600 italic">"{review.reviewText}"</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-xl">
          <p className="text-gray-500">You haven't reviewed any products yet.</p>
        </div>
      )}
    </div>
  );
}