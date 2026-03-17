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
  { imageUrl: "/8.jpeg", alt: "cotton pads" }
];

const packs = [
  { label: "7 Pads", price: 99, oldPrice: 149 },
  { label: "14 Pads", price: 199, oldPrice: 299 },
  { label: "28 Pads", price: 349, oldPrice: 499 }
];

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedPack, setSelectedPack] = useState(packs[1]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="py-16 px-6 bg-[#f8f6f3]">

      {/* TOP TITLE */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Ultra Soft Sanitary Napkins
        </h1>
        <p className="text-pink-500 text-lg mt-2 font-medium">
          Rash Free • Leak Protection Pads
        </p>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div className="flex gap-6" data-aos="fade-right">

          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {images.map((item, index) => (
              <Image
                key={index}
                src={item.imageUrl}
                alt={item.alt}
                width={80}
                height={80}
                onClick={() => setSelectedImage(item)}
                className={`rounded-xl cursor-pointer border transition
                ${selectedImage.imageUrl === item.imageUrl ? "border-pink-500" : "border-transparent"}`}
              />
            ))}
          </div>

          {/* Main Image with Zoom */}
          <div className="bg-white p-6 rounded-2xl shadow-md overflow-hidden">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.alt}
              width={400}
              height={400}
              className="rounded-xl object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5" data-aos="fade-left">

          <h2 className="text-2xl md:text-3xl font-bold">
            Lumora Ultra Soft Sanitary Pads
          </h2>

          {/* Rating */}
          <div className="text-yellow-500">★★★★☆ (4.8 • 120 Reviews)</div>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ₹{selectedPack.price}
            </span>
            <span className="line-through text-gray-400">
              ₹{selectedPack.oldPrice}
            </span>
            <span className="text-green-600 text-sm font-medium">
              {Math.round(
                ((selectedPack.oldPrice - selectedPack.price) /
                  selectedPack.oldPrice) *
                  100
              )}
              % OFF
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
                  className={`px-4 py-2 text-sm rounded-md cursor-pointer transition
                  ${selectedPack.label === pack.label
                      ? "bg-pink-500 text-white shadow"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {pack.label}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">

            <button className="flex-1 text-sm bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition">
              Add to Cart
            </button>

            <button className="flex-1 text-sm bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 hover:scale-105 transition">
              Buy Now
            </button>

          </div>

          {/* EXTRA INFO */}
          <div className="text-sm text-gray-500 mt-3">
            🚚 Free Delivery • 💖 Skin Friendly • 🌿 Rash Free • 🔒 Safe Use
          </div>

        </div>

      </div>

      {/* DESCRIPTION + FEATURES */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mt-16">

        {/* LEFT - DESCRIPTION */}
        <div data-aos="fade-right">
          <h2 className="text-2xl mb-5 font-semibold">Description</h2>

          <p className="mb-5 text-gray-600 leading-relaxed">
            Lumora Ultra Soft Sanitary Pads are designed for all-day comfort with a soft,
            skin-friendly top layer that helps prevent irritation and rashes. The highly
            absorbent core quickly locks in moisture, keeping you dry and comfortable
            throughout your day.
          </p>

          <p className="text-gray-600 leading-relaxed">
            With a leak-proof design and breathable material, these pads provide reliable
            protection even during heavy flow. The odor control technology and secure fit
            ensure you stay fresh, confident, and worry-free wherever you go.
          </p>
        </div>

        {/* RIGHT - FEATURES */}
        <div data-aos="fade-left">
          <h2 className="text-2xl font-semibold mb-5">Key Features</h2>

          <div className="flex flex-col gap-4 text-gray-700">

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:scale-105 transition">
              <ShieldCheck className="text-pink-500" />
              <p>Dermatologically tested for safe and rash-free use</p>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:scale-105 transition">
              <HeartPulse className="text-pink-500" />
              <p>Ultra soft cotton surface for maximum comfort</p>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:scale-105 transition">
              <Droplets className="text-pink-500" />
              <p>High absorbent core for all-day dryness</p>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:scale-105 transition">
              <ShieldCheck className="text-pink-500" />
              <p>Leak-proof protection even during heavy flow</p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}