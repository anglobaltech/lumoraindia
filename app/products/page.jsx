"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, CheckCircle } from "lucide-react";
// 1. Import our global cart store using RELATIVE paths to avoid build errors
import { useCartStore } from "../../store/cartStore"; 
// 2. Import the Pincode Checker
import PincodeChecker from "../../components/PincodeChecker";

// Temporary Static Data (Until we pull from Firebase later)
const PRODUCTS = [
  {
    id: "lumora-01",
    name: "Lumora Premium Soft Pads",
    price: 199,
    description: "Ultra-thin, rash-free experience for your active days. 100% organic cotton top sheet.",
    sizes: ["L", "XL", "XXL"],
    image: "/12.jpeg" // Using your existing hardcoded image
  },
  {
    id: "lumora-02",
    name: "Lumora Overnight Protection",
    price: 249,
    description: "Extra long, wider back for 100% leak-proof peaceful nights. Heavy flow control.",
    sizes: ["XL", "XXL"],
    image: "/13.jpeg" // Using your existing hardcoded image
  }
];

const ProductsPage = () => {
  // Extract the addToCart function from our Zustand store
  const addToCart = useCartStore((state) => state.addToCart);
  
  // State to track which size the user selected for each product
  const [selectedSizes, setSelectedSizes] = useState({});
  // State to show a temporary "Added!" animation on the button
  const [addedStates, setAddedStates] = useState({});

  // Function to handle size selection
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  // Function to handle adding to cart
  const handleAddToCart = (product) => {
    // If user didn't click a size, default to the first available size
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    
    // Send to global cart
    addToCart(product, chosenSize, 1);

    // Show temporary "Added to Cart" UI feedback
    setAddedStates((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-5">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Premium Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the ultimate comfort and protection with Lumora. Designed for every woman, for every day.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0];
            const isAdded = addedStates[product.id];

            return (
              <div key={product.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
                
                {/* Product Image */}
                <div className="relative w-full h-64 bg-pink-50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center shrink-0">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="text-2xl font-black text-pink-600 mb-6">₹{product.price}</div>

                {/* Size Selector */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Select Size:</p>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(product.id, size)}
                        className={`w-12 h-12 rounded-full font-bold border-2 transition-all ${
                          currentSize === size
                            ? "border-pink-600 bg-pink-50 text-pink-600"
                            : "border-gray-200 text-gray-500 hover:border-pink-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 👇 PINCODE CHECKER ADDED HERE 👇 */}
                <div className="mb-6 border-t border-gray-100 pt-4 mt-auto">
                  <PincodeChecker />
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isAdded}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isAdded 
                      ? "bg-green-500 text-white shadow-lg shadow-green-200" 
                      : "bg-gray-900 text-white hover:bg-black hover:shadow-xl"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={22} /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={22} /> Add to Cart
                    </>
                  )}
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;