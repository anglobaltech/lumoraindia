"use client";

import Image from "next/image";
import React, { useState } from "react";

const images = [
  { alt: "product1", url: "/product1.jpeg" },
  { alt: "product2", url: "/product2.jpeg" },
  { alt: "product3", url: "/product3.jpeg" },
  { alt: "product4", url: "/product.jpeg" },
];

// 💰 Pack Price Data
const packData = {
  "7 Pads": { price: 119, oldPrice: 149 },
  "14 Pads": { price: 199, oldPrice: 299 },
  "28 Pads": { price: 349, oldPrice: 599 },
};

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(images[0].url);
  const [selectedPack, setSelectedPack] = useState("7 Pads");

  const currentPack = packData[selectedPack];

  return (
    <div>
      {/* Header */}
      <section className="py-16 bg-linear-to-b from-pink-50 to-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Explore Our Premium
            <span className="text-pink-500 block">Hygiene Products</span>
          </h1>

          <div className="mt-6 flex justify-center">
            <div className="h-1 w-24 bg-pink-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16 px-6 bg-[#f8f6f3]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="flex gap-6">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {images.map((item, index) => (
                <Image
                  key={index}
                  src={item.url}
                  alt={item.alt}
                  width={80}
                  height={80}
                  onClick={() => setSelectedImage(item.url)}
                  className={`rounded-xl object-cover cursor-pointer border transition
                    ${
                      selectedImage === item.url
                        ? "border-pink-500 scale-105"
                        : "hover:border-pink-400"
                    }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <Image
                src={selectedImage}
                alt="Selected Product"
                width={400}
                height={400}
                className="rounded-xl object-contain transition duration-300"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">
            {/* Title */}
            <h2 className="text-2xl md:text-2xl font-semibold text-gray-900">
              Lumora Ultra Soft Sanitary Pads, Rash-Free Comfort
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="text-yellow-500 text-lg">★★★★☆</div>
              <p className="text-sm text-gray-600">(4.8 • 120 Reviews)</p>
            </div>

            {/* 💰 Dynamic Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-gray-900">
                ₹{currentPack.price}
              </span>

              <span className="text-gray-400 line-through">
                ₹{currentPack.oldPrice}
              </span>

              <span className="text-green-600 text-sm font-medium">
                {Math.round(
                  ((currentPack.oldPrice - currentPack.price) /
                    currentPack.oldPrice) *
                    100,
                )}
                % OFF
              </span>
            </div>

            {/* Pack Options */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Select Pack</h3>

              <div className="flex gap-3">
                {Object.keys(packData).map((pack) => (
                  <button
                    key={pack}
                    onClick={() => setSelectedPack(pack)}
                    className={`px-4 py-1.5 text-sm rounded-md cursor-pointer transition
                      
                      ${
                        selectedPack === pack
                          ? "bg-pink-500 text-white shadow-md scale-105"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {pack}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="w-36 text-sm cursor-pointer bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition">
                Add to Cart
              </button>

              <button className="w-36 text-sm bg-pink-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-pink-700 hover:scale-105 transition-all duration-200">
                Buy Now
              </button>
            </div>

            {/* Extra Info */}
            <div className="text-sm text-gray-500 mt-3">
              🚚 Free Delivery • 💖 Skin Friendly • 🌿 Rash Free • 🔒 Safe Use
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
