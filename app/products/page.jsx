"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShieldCheck, Droplets, HeartPulse } from "lucide-react";

const images = [
  { imageUrl: "/product1.jpeg", alt: "Soft Pads" },
  { imageUrl: "/product2.jpeg", alt: "Absorbent Pads" },
  { imageUrl: "/product3.jpeg", alt: "Leak Protection" },
  { imageUrl: "/product.jpeg", alt: "Safe Hygiene" },
  { imageUrl: "/8.jpeg", alt: "Cotton Pads" }
];

const packs = [
  { label: "7 Pads", price: 99, oldPrice: 119 },
  { label: "14 Pads", price: 199, oldPrice: 249 },
  { label: "28 Pads", price: 349, oldPrice: 499 }
];

export default function Page() {

  // ✅ FIX 1: store full object
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // ✅ FIX 2: store full pack object
  const [selectedPack, setSelectedPack] = useState(packs[1]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <main className="py-16 px-6 bg-[#f8f6f3]">

      {/* TITLE */}
      <section className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Our Premium
        </h1>
        <p className="text-pink-500 text-4xl mt-2 font-medium">
          Hygiene Products
        </p>
      </section>

      {/* PRODUCT */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="flex gap-6">

          <div className="flex flex-col gap-4" data-aos="fade-right">
            {images.map((item, index) => (
              <Image
                key={index}
                src={item.imageUrl}
                alt={item.alt}
                width={80}
                height={80}
                onClick={() => setSelectedImage(item)}
                className={`rounded-xl cursor-pointer border transition
                ${selectedImage.imageUrl === item.imageUrl
                    ? "border-pink-500 scale-105"
                    : "border-transparent hover:border-pink-400"
                  }`}
              />
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.alt}
              width={400}
              height={400}
              className="rounded-xl object-contain hover:scale-105 transition"
            />
          </div>

        </div>

        {/* RIGHT */}
        <div data-aos="fade-left" className="flex flex-col gap-5">

          <h2 className="text-2xl font-semibold text-gray-900">
            Lumora Ultra Soft Sanitary Pads, Rash-Free Comfort
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="text-yellow-500">★★★★☆</div>
            <p className="text-sm text-gray-600">(4.8 • 120 Reviews)</p>
          </div>

          {/* ✅ PRICE FIXED */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">
              ₹{selectedPack.price}
            </span>

            <span className="line-through text-gray-400">
              ₹{selectedPack.oldPrice}
            </span>

            <span className="text-green-600 text-sm">
              {Math.round(
                ((selectedPack.oldPrice - selectedPack.price) /
                  selectedPack.oldPrice) * 100
              )}% OFF
            </span>
          </div>

          {/* PACK SELECT */}
          <div>
            <h3 className="font-semibold mb-2">Select Pack</h3>

            <div className="flex gap-3">
              {packs.map((pack, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPack(pack)}
                  className={`px-4 py-2 text-sm rounded-md transition
                  ${selectedPack.label === pack.label
                      ? "bg-pink-500 text-white shadow scale-105"
                      : "border border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {pack.label}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button className="w-36 bg-pink-100 text-pink-700 py-2 rounded-lg hover:bg-pink-200">
              Add to Cart
            </button>

            <button className="w-36 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 hover:scale-105 transition">
              Buy Now
            </button>
          </div>

          <div className="text-sm text-gray-500 mt-3">
            🚚 Free Delivery • 💖 Skin Friendly • 🌿 Rash Free • 🔒 Safe Use
          </div>

        </div>
      </section>
    </main>
  );
}