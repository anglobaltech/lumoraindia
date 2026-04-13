"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart, CheckCircle, Ruler, Minus, Plus, Zap, Star,
  MessageSquare, Loader2, UserCircle, Heart, ArrowLeft
} from "lucide-react";
import { toast } from "react-toastify";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import PincodeChecker from "../../components/PincodeChecker";
import LoginModal from "../../components/LoginModal";

// Firebase Imports
import { collection, addDoc, query, where, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Flagship Product Base Info
const MAIN_PRODUCT = {
  id: "lumora-premium-pads",
  name: "Lumora Premium Soft Pads",
  description: "Experience ultra-thin, rash-free protection for your active days. Made with a 100% organic cotton top sheet and advanced leak-lock technology.",
  sizes: ["M", "L", "XL", "XXL"],
  images: [
    "/12.jpeg",
    "/product2.jpeg",
    "/8.jpeg",
    "/13.jpeg",
    "/lumora2.jpeg",
    "/11.jpeg"
  ]
};

// Pricing Dictionary
const PRICE_MAP = {
  m: 89,
  l: 99,
  xl: 199,
  xxl: 349,
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { cartItems, addToCart, updateQuantity } = useCartStore();
  const { user } = useAuthStore();

  // Product Selection States
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedPack, setSelectedPack] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  
  // Login Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Review States
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Wishlist State
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const isInWishlist = user?.wishlist?.some(item => item.id === MAIN_PRODUCT.id);

  // --- DYNAMIC PRICING LOGIC ---
  const basePrice = PRICE_MAP[selectedSize.toLowerCase()] || 89;

  const getDiscountTier = (q) => {
    if (q === 7) return 0.75;
    if (q === 5) return 0.80;
    if (q === 3) return 0.85;
    return 1;
  };

  const discountMultiplier = getDiscountTier(selectedPack);
  const originalPrice = selectedPack === 1 ? Math.floor(basePrice * 1.2) : basePrice * selectedPack;
  const totalPrice = selectedPack === 1 ? basePrice : Math.floor(basePrice * selectedPack * discountMultiplier);
  const discount = selectedPack === 1
    ? `${Math.floor(((originalPrice - basePrice) / originalPrice) * 100)}% OFF`
    : `${Math.round((1 - discountMultiplier) * 100)}% OFF`;

  // Cart Logic
  const cartItem = cartItems.find(
    item => item.id === MAIN_PRODUCT.id && item.size === selectedSize && item.pack === selectedPack
  );
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    const productToAdd = {
      ...MAIN_PRODUCT,
      price: totalPrice,
      originalPrice: originalPrice,
      image: MAIN_PRODUCT.images[0]
    };

    addToCart(productToAdd, selectedSize, selectedPack, 1);
    toast.success(`Added ${selectedPack} Pack of Size ${selectedSize} to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleBuyNow = () => {
    console.log("handleBuyNow called, redirecting to cart");
    if (quantityInCart === 0) {
      handleAddToCart();
    }
    try {
      router.push("/cart");
    } catch (error) {
      console.error("Router push failed:", error);
      window.location.href = "/cart";
    }
  };

  // --- WISHLIST LOGIC ---
  const toggleWishlist = async () => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist.");
      setIsLoginModalOpen(true);
      return;
    }

    if (isWishlistLoading) return;
    setIsWishlistLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);
      let updatedWishlist = user.wishlist ? [...user.wishlist] : [];

      if (isInWishlist) {
        updatedWishlist = updatedWishlist.filter(item => item.id !== MAIN_PRODUCT.id);
        toast.info("Removed from wishlist");
      } else {
        updatedWishlist.push({
          id: MAIN_PRODUCT.id,
          name: MAIN_PRODUCT.name,
          image: MAIN_PRODUCT.images[0],
          price: basePrice
        });
        toast.success("Added to wishlist! ❤️");
      }

      await setDoc(userRef, { wishlist: updatedWishlist }, { merge: true });
      useAuthStore.setState({ user: { ...user, wishlist: updatedWishlist } });

    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  // --- REVIEWS LOGIC ---
  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("productId", "==", MAIN_PRODUCT.id),
      where("isPublished", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetchedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(fetchedReviews);
    }, (error) => {
      console.error("Error fetching reviews:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to leave a review.");
    if (!newReviewText.trim()) return toast.error("Please write a comment for your review.");

    setIsSubmittingReview(true);
    const reviewerName = user.name || user.displayName || (user.email ? user.email.split('@')[0] : "User");

    try {
      await addDoc(collection(db, "reviews"), {
        productId: MAIN_PRODUCT.id,
        productName: MAIN_PRODUCT.name,
        userId: user.uid,
        userName: reviewerName,
        rating: newReviewRating,
        comment: newReviewText,
        isPublished: false,
        createdAt: new Date().toISOString()
      });

      setNewReviewText("");
      setNewReviewRating(5);
      toast.success("Review submitted! It will appear once approved by our team.");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 pb-12 relative font-sans overflow-hidden">

      {/* ---------------- PRODUCT TOP SECTION ---------------- */}
      <div className="w-full max-w-[1400px] mx-auto pt-8 md:pt-10 lg:pt-12 mb-12">
        
        {/* ---------------- BACK TO HOME BUTTON ---------------- */}
        <div className="px-4 sm:px-6 lg:px-10 mb-6 md:mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-pink-200 text-pink-600 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:bg-pink-600 hover:text-white hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm cursor-pointer"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* LEFT COLUMN: RESPONSIVE IMAGE GALLERY */}
          <div className="w-full flex flex-col gap-4 relative px-0 sm:px-6 lg:px-10">

            <div className="relative w-full group">
              {/* Desktop Main Image - Increased width automatically by moving thumbnails below, and increased height to 500px */}
              <div className="hidden md:block relative w-full h-[400px] lg:h-[500px] bg-white rounded-[1.5rem] overflow-hidden border border-pink-100 shadow-lg transition-all duration-500">
                <Image
                  src={MAIN_PRODUCT.images[activeImageIndex]}
                  alt={MAIN_PRODUCT.name}
                  fill
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                />

                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(); }}
                  disabled={isWishlistLoading}
                  className={`absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur shadow-md transition-all transform hover:scale-110 cursor-pointer z-10 ${isWishlistLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  <Heart
                    size={22}
                    className={`transition-colors ${isInWishlist ? "text-pink-500 fill-pink-500" : "text-gray-400 hover:text-pink-500"
                      }`}
                  />
                </button>
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden relative w-full sm:mt-0">
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(); }}
                  disabled={isWishlistLoading}
                  className={`absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur shadow-md transition-all transform active:scale-95 cursor-pointer z-10 ${isWishlistLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${isInWishlist ? "text-pink-500 fill-pink-500" : "text-gray-400"
                      }`}
                  />
                </button>

                <div
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[320px] sm:h-[380px] w-full bg-white shadow-sm border-y border-pink-100"
                  onScroll={(e) => {
                    const scrollPosition = e.target.scrollLeft;
                    const itemWidth = e.target.offsetWidth;
                    const currentIndex = Math.round(scrollPosition / itemWidth);
                    setActiveImageIndex(currentIndex);
                  }}
                >
                  {MAIN_PRODUCT.images.map((img, idx) => (
                    <div key={idx} className="min-w-full snap-center relative h-full flex items-center justify-center">
                      <Image src={img} alt={`${MAIN_PRODUCT.name} ${idx}`} fill className="object-contain p-4" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-1.5 mt-3 flex-wrap absolute bottom-3 left-0 right-0 z-10">
                  {MAIN_PRODUCT.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${activeImageIndex === idx ? "w-6 bg-pink-600 shadow-sm" : "w-1.5 bg-gray-300/80 backdrop-blur"
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Thumbnails - Moved to Bottom horizontally */}
            <div className="hidden md:flex flex-row gap-3 w-full overflow-x-auto scrollbar-hide py-1">
              {MAIN_PRODUCT.images.map((img, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setActiveImageIndex(idx)}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer bg-white ${activeImageIndex === idx
                      ? "border-pink-600 shadow-sm scale-105"
                      : "border-transparent hover:border-pink-300"
                    }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: PRODUCT DETAILS CARD */}
          <div className="w-full px-4 sm:px-6 lg:px-10 lg:pr-14">
            <div className="bg-white/80 backdrop-blur-xl border border-pink-100 shadow-xl rounded-[1.5rem] p-5 lg:p-6 flex flex-col space-y-4 relative overflow-hidden">

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-pink-600"></div>

              <div>
                <span className="inline-block bg-pink-100 text-pink-600 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-1.5">Bestseller</span>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 leading-tight tracking-tight">{MAIN_PRODUCT.name}</h1>

                {reviews.length > 0 && (
                  <div 
                    className="flex items-center gap-1.5 mt-2 bg-gray-50 w-fit px-2.5 py-1 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth' })}
                  >
                    <div className="flex">{renderStars(Math.round(reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length))}</div>
                    <span className="text-xs font-semibold text-gray-700 hover:text-pink-600 transition">
                      {reviews.length} Reviews
                    </span>
                  </div>
                )}

                <p className="text-gray-600 mt-2 text-sm leading-relaxed font-medium">{MAIN_PRODUCT.description}</p>
              </div>

              {/* Pricing */}
              <div className="flex items-end gap-2.5 border-b border-gray-100 pb-4 pt-1">
                <span className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500">₹{totalPrice}</span>
                <span className="text-lg text-gray-400 line-through mb-1 font-semibold">₹{originalPrice}</span>
                <span className="text-xs font-semibold text-white mb-1.5 bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm px-2 py-0.5 rounded-md animate-pulse">{discount}</span>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Size: <span className="text-pink-600">{selectedSize}</span></span>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-[11px] text-pink-600 flex items-center gap-1 hover:underline font-semibold cursor-pointer bg-pink-50 px-2 py-1 rounded-md"
                  >
                    <Ruler size={14} /> Chart
                  </button>
                </div>

                <div className="flex gap-2.5">
                  {MAIN_PRODUCT.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center ${selectedSize === size
                          ? "bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-md shadow-pink-200 scale-105 border-none"
                          : "bg-white border-2 border-gray-200 text-gray-600 hover:border-pink-300 hover:bg-pink-50"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pack Selection */}
              <div>
                <p className="font-semibold text-gray-700 mb-3">Select Pack <span className="text-xs text-green-600 font-semibold ml-1">(Save More!)</span></p>
                <div className="flex flex-wrap gap-2.5">
                  {[1, 3, 5, 7].map((pack) => (
                    <button
                      key={pack}
                      onClick={() => setSelectedPack(pack)}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${selectedPack === pack
                          ? "bg-gray-700 text-white shadow-md scale-105 border-none"
                          : "bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-700 hover:text-gray-700"
                        }`}
                    >
                      {pack} Pack
                    </button>
                  ))}
                </div>
              </div>

              {/* Pincode Check */}
              <div className="pt-1">
                <PincodeChecker />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {quantityInCart > 0 ? (
                  <div className="flex-1 flex items-center justify-between border-2 border-pink-500 rounded-xl px-3 py-2 bg-gradient-to-r from-pink-50 to-white shadow-inner">
                    <button onClick={() => updateQuantity(MAIN_PRODUCT.id, selectedSize, selectedPack, -1)} className="w-8 h-8 flex items-center justify-center bg-white border border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100 hover:scale-105 transition-all shadow-sm cursor-pointer">
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold text-lg text-gray-700">{quantityInCart}</span>
                    <button onClick={() => updateQuantity(MAIN_PRODUCT.id, selectedSize, selectedPack, 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100 hover:scale-105 transition-all shadow-sm cursor-pointer">
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button onClick={handleAddToCart} className="flex-1 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 bg-white border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                    <ShoppingCart size={18} /> Add Cart
                  </button>
                )}

                <button onClick={handleBuyNow} className="flex-1 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:from-pink-700 hover:to-pink-600 transition-all duration-300 shadow-md shadow-pink-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                  <Zap size={18} fill="currentColor" /> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- REVIEWS BOTTOM SECTION ---------------- */}
      <div id="reviews-section" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 border-t border-pink-100 pt-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
            <MessageSquare className="text-pink-600" size={20} fill="currentColor" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 tracking-tight">
            Customer Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          <div className="lg:col-span-2 space-y-5">
            {reviews.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center flex flex-col items-center shadow-sm">
                <MessageSquare className="text-pink-300 mb-3" size={40} />
                <h3 className="text-base font-semibold text-gray-700">No reviews yet</h3>
                <p className="text-gray-500 mt-1 text-sm font-medium">Be the first to share your experience with Lumora!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center text-pink-700 font-semibold shadow-inner">
                        {review.userName ? review.userName.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 text-sm">{review.userName || "User"}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-[10px] text-gray-400 font-semibold">• {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <CheckCircle size={12} /> Verified Buyer
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed font-medium bg-gray-50/50 p-3 rounded-xl border border-gray-50">"{review.comment}"</p>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white shadow-xl shadow-gray-100/50 p-6 rounded-[1.5rem] border border-gray-100 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">Write a Review</h3>

              {!user ? (
                <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-100">
                  <UserCircle size={48} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm font-semibold mb-5 px-4">Log in to share your thoughts.</p>
                  
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} 
                    className="w-full max-w-[180px] mx-auto py-2.5 bg-gradient-to-r from-gray-700 to-gray-600 text-white text-sm rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    Log In / Sign Up
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Rate your experience</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="cursor-pointer transition-all hover:scale-110 active:scale-95"
                        >
                          <Star
                            size={28}
                            className={(hoverRating || newReviewRating) >= star ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Review</label>
                    <textarea
                      required
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="What did you love about this product?"
                      rows="3"
                      className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all resize-none text-sm font-medium bg-gray-50 focus:bg-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl font-semibold text-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmittingReview ? <Loader2 size={20} className="animate-spin" /> : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- SIZE CHART MODAL ---------------- */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 bg-gray-900/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[1.5rem] p-6 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors cursor-pointer font-semibold"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2.5">
              <div className="bg-pink-100 p-1.5 rounded-lg text-pink-600"><Ruler size={20} /></div> Size Chart
            </h3>

            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider font-semibold">
                    <th className="p-3 border-b border-r border-gray-200">Size</th>
                    <th className="p-3 border-b border-r border-gray-200">Length (mm)</th>
                    <th className="p-3 border-b border-gray-200">Length (inch)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 font-medium">
                  <tr className="border-b border-gray-100 hover:bg-pink-50/50 transition-colors">
                    <td className="p-3 font-semibold text-gray-700 border-r border-gray-100">M</td>
                    <td className="p-3 border-r border-gray-100">240 mm</td>
                    <td className="p-3">9.4"</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30 hover:bg-pink-50/50 transition-colors">
                    <td className="p-3 font-semibold text-gray-700 border-r border-gray-100">L</td>
                    <td className="p-3 border-r border-gray-100">280 mm</td>
                    <td className="p-3">11.0"</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-pink-50/50 transition-colors">
                    <td className="p-3 font-semibold text-gray-700 border-r border-gray-100">XL</td>
                    <td className="p-3 border-r border-gray-100">320 mm</td>
                    <td className="p-3">12.6"</td>
                  </tr>
                  <tr className="hover:bg-pink-50/50 transition-colors">
                    <td className="p-3 font-semibold text-gray-700 border-r border-gray-100">XXL</td>
                    <td className="p-3 border-r border-gray-100">360 mm</td>
                    <td className="p-3">14.1"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs font-medium text-gray-500 mt-4 text-center bg-gray-50 py-2 rounded-lg border border-gray-100">Measure for your ideal flow and comfort fit.</p>
          </div>
        </div>
      )}

      {/* ---------------- LOGIN MODAL ---------------- */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

    </div>
  );
}