"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, CheckCircle, Ruler, Minus, Plus, Zap } from "lucide-react";
import { toast } from "react-toastify";
import { useCartStore } from "../../store/cartStore"; 
import PincodeChecker from "../../components/PincodeChecker"; 

// Flagship Product Base Info
const MAIN_PRODUCT = {
  id: "lumora-premium-pads",
  name: "Lumora Premium Soft Pads",
  description: "Experience ultra-thin, rash-free protection for your active days. Made with a 100% organic cotton top sheet and advanced leak-lock technology.",
  sizes: ["M", "L", "XL", "XXL"],
  image: "/12.jpeg" 
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
  
  // 1. Set Default Size to 'M'
  const [selectedSize, setSelectedSize] = useState("M"); 
  
  // 2. Add Pack Selection State
  const [selectedPack, setSelectedPack] = useState(1); 
  
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // --- DYNAMIC PRICING LOGIC ---
  const basePrice = PRICE_MAP[selectedSize.toLowerCase()] || 89;
  
  const getDiscountTier = (q) => {
    if (q === 7) return 0.75; // 25% off
    if (q === 5) return 0.80; // 20% off
    if (q === 3) return 0.85; // 15% off
    return 1; // 0% off for 1 pack
  };

  const discountMultiplier = getDiscountTier(selectedPack);
  const originalPrice = selectedPack === 1 ? Math.floor(basePrice * 1.2) : basePrice * selectedPack;
  const totalPrice = selectedPack === 1 ? basePrice : Math.floor(basePrice * selectedPack * discountMultiplier);
  const discount = selectedPack === 1 
    ? `${Math.floor(((originalPrice - basePrice) / originalPrice) * 100)}% OFF`
    : `${Math.round((1 - discountMultiplier) * 100)}% OFF`;
  // -----------------------------

  // Check if this EXACT Size + Pack combo is in the cart
  const cartItem = cartItems.find(
    item => item.id === MAIN_PRODUCT.id && item.size === selectedSize && item.pack === selectedPack
  );
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    // Create a dynamic product object holding the specific calculated price
    const productToAdd = {
      ...MAIN_PRODUCT,
      price: totalPrice,
      originalPrice: originalPrice
    };

    addToCart(productToAdd, selectedSize, selectedPack, 1);
    toast.success(`Added ${selectedPack} Pack of Size ${selectedSize} to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleBuyNow = () => {
    if (quantityInCart === 0) {
      handleAddToCart();
    }
    router.push("/checkout"); 
  };

  return (
    <div className="min-h-screen bg-white py-12 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Product Image */}
        <div className="relative w-full h-[500px] md:h-[600px] bg-pink-50 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center sticky top-24">
          <Image 
            src={MAIN_PRODUCT.image} 
            alt={MAIN_PRODUCT.name} 
            fill
            className="object-cover"
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col space-y-6">
          
          <div>
            <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Bestseller</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">{MAIN_PRODUCT.name}</h1>
            <p className="text-gray-500 mt-3 text-lg">{MAIN_PRODUCT.description}</p>
          </div>

          <div className="flex items-end gap-3 border-b border-gray-100 pb-6">
            <span className="text-4xl font-black text-pink-600">₹{totalPrice}</span>
            <span className="text-xl text-gray-400 line-through mb-1">₹{originalPrice}</span>
            <span className="text-sm font-bold text-green-500 mb-2 border border-green-200 bg-green-50 px-2 py-1 rounded">{discount}</span>
          </div>

          {/* Size Selector & Size Chart */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900">Select Size: <span className="text-pink-600">{selectedSize}</span></span>
              <button 
                onClick={() => setIsSizeChartOpen(true)}
                className="text-sm text-pink-600 flex items-center gap-1 hover:underline font-medium cursor-pointer"
              >
                <Ruler size={16} /> Size Chart
              </button>
            </div>
            
            <div className="flex gap-3">
              {MAIN_PRODUCT.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-xl font-bold border-2 transition-all cursor-pointer ${
                    selectedSize === size
                      ? "border-pink-600 bg-pink-50 text-pink-600 shadow-md"
                      : "border-gray-200 text-gray-500 hover:border-pink-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Pack Selector */}
          <div>
            <p className="font-semibold text-gray-900 mb-3">Select Pack <span className="text-sm text-green-600 font-bold ml-2">(Save More!)</span></p>
            <div className="flex flex-wrap gap-3">
              {[1, 3, 5, 7].map((pack) => (
                <button
                  key={pack}
                  onClick={() => setSelectedPack(pack)}
                  className={`px-5 py-3 rounded-xl border-2 font-bold transition-all cursor-pointer ${
                    selectedPack === pack
                      ? "border-pink-600 bg-pink-600 text-white shadow-md"
                      : "border-gray-200 text-gray-600 bg-white hover:border-pink-300 hover:bg-pink-50"
                  }`}
                >
                  {pack} Pack
                </button>
              ))}
            </div>
          </div>

          {/* Pincode Checker */}
          <div className="py-2 border-t border-gray-100 mt-4 pt-6">
             <PincodeChecker />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            
            {/* Dynamic Add To Cart / Quantity Toggle */}
            {quantityInCart > 0 ? (
              <div className="flex-1 flex items-center justify-between border-2 border-pink-600 rounded-xl px-4 py-3 bg-pink-50">
                <button 
                  onClick={() => updateQuantity(MAIN_PRODUCT.id, selectedSize, selectedPack, -1)}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100 transition shadow-sm cursor-pointer"
                >
                  <Minus size={20} />
                </button>
                <span className="font-bold text-xl text-gray-900">{quantityInCart}</span>
                <button 
                  onClick={() => updateQuantity(MAIN_PRODUCT.id, selectedSize, selectedPack, 1)}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100 transition shadow-sm cursor-pointer"
                >
                  <Plus size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-black transition-all shadow-md hover:shadow-xl cursor-pointer"
              >
                <ShoppingCart size={22} /> Add to Cart
              </button>
            )}

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-pink-600 text-white hover:bg-pink-700 transition-all shadow-md hover:shadow-xl shadow-pink-200 cursor-pointer"
            >
              <Zap size={22} fill="currentColor" /> Buy Now
            </button>

          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Ruler className="text-pink-600" /> Size Chart
            </h3>
            
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                    <th className="p-4 font-bold border-b border-r border-gray-200">Size</th>
                    <th className="p-4 font-bold border-b border-r border-gray-200">Length (mm)</th>
                    <th className="p-4 font-bold border-b">Length (inch)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-bold text-gray-900 border-r border-gray-100">M</td>
                    <td className="p-4 border-r border-gray-100">240 mm</td>
                    <td className="p-4">9.4"</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td className="p-4 font-bold text-gray-900 border-r border-gray-100">L</td>
                    <td className="p-4 border-r border-gray-100">280 mm</td>
                    <td className="p-4">11.0"</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-bold text-gray-900 border-r border-gray-100">XL</td>
                    <td className="p-4 border-r border-gray-100">320 mm</td>
                    <td className="p-4">12.6"</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-gray-900 border-r border-gray-100">XXL</td>
                    <td className="p-4 border-r border-gray-100">360 mm</td>
                    <td className="p-4">14.1"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Measure for your ideal flow and comfort fit.</p>
          </div>
        </div>
      )}
    </div>
  );
}