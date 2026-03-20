"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Droplets,
  HeartPulse,
  RefreshCcw,
  ShieldCheck,
  PackageCheck,
  Ban,
  Phone,
} from "lucide-react";

const images = [
  { imageUrl: "/product1.jpeg", alt: "Soft Pads" },
  { imageUrl: "/product2.jpeg", alt: "Absorbent Pads" },
  { imageUrl: "/product3.jpeg", alt: "Leak Protection" },
  { imageUrl: "/product.jpeg", alt: "Safe Hygiene" },
  { imageUrl: "/8.jpeg", alt: "cotton pads" },
];

const packs = [
  { label: "7 Pads", price: 99, oldPrice: 119 },
  { label: "14 Pads", price: 199, oldPrice: 249 },
  { label: "28 Pads", price: 349, oldPrice: 459 },
];

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedPack, setSelectedPack] = useState(packs[1]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <main className=" bg-[#f8f6f3]">
      {/* TOP TITLE */}
      <section className="bg-linear-to-b from-pink-100 to-white py-16 px-6 h-50 w-full">
        <div className="max-w-7xl mx-auto  text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Explore Our Premium
          </h1>
          <p className="text-pink-500 text-4xl mt-2 font-medium">
            Hygiene Products
          </p>
        </div>
      </section>

      {/* product section */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
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
                ${selectedImage.imageUrl === item.imageUrl ? "border-pink-500" : "border-transparent"}`}
              />
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md overflow-hidden">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.alt}
              width={400}
              height={400}
              className="rounded-xl object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div data-aos="fade-left" className="flex flex-col gap-5">
          <h2 className="text-2xl md:text-2xl font-semibold text-gray-900">
            Lumora Ultra Soft Sanitary Pads, Rash-Free Comfort
          </h2>

          <div className="flex items-center gap-2">
            <div className="text-yellow-500 text-lg">★★★★☆</div>
            <p className="text-sm text-gray-600">(4.8 • 120 Reviews)</p>
          </div>

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
                  100,
              )}
              % OFF
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Select Pack</h3>

            <div className="flex gap-3">
              {packs.map((pack, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPack(pack)}
                  className={`px-4 py-2 text-sm rounded-md cursor-pointer transition
                  ${
                    selectedPack.label === pack.label
                      ? "bg-pink-500 text-white shadow"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pack.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button className="w-36 text-sm cursor-pointer bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition">
              Add to Cart
            </button>

            <button className="w-36 text-sm bg-pink-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-pink-700 hover:scale-105 transition-all duration-200">
              Buy Now
            </button>
          </div>

          <div className="text-sm text-gray-500 mt-3">
            🚚 Free Delivery • 💖 Skin Friendly • 🌿 Rash Free • 🔒 Safe Use
          </div>
        </div>
      </section>

      {/*product description and feature*/}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mt-16">
        <div data-aos="fade-right">
          <h2 className="text-2xl mb-5 font-semibold">Description</h2>

          <p className="mb-5 text-gray-600 leading-relaxed">
            Lumora Ultra Soft Sanitary Pads are designed for all-day comfort
            with a soft, skin-friendly top layer that helps prevent irritation
            and rashes. The highly absorbent core quickly locks in moisture,
            keeping you dry and comfortable throughout your day.
          </p>

          <p className="text-gray-600 leading-relaxed">
            With a leak-proof design and breathable material, these pads provide
            reliable protection even during heavy flow. The odor control
            technology and secure fit ensure you stay fresh, confident, and
            worry-free wherever you go.
          </p>
        </div>

        <div>
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
      </section>

      <section className="max-w-7xl mx-auto mt-20 px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug pb-5 text-center">
          Why Choose <span className="text-pink-500">Lumora</span>?
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "💖", text: "Skin Friendly Material" },
            { icon: "🛡️", text: "Leak-Proof Protection" },
            { icon: "🌿", text: "Breathable Cotton Layer" },
            { icon: "🚚", text: "Fast Delivery" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <p className="text-3xl mb-2">{item.icon}</p>
              <p className="text-sm font-medium text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
            Designed for <span className="text-pink-500">Modern Women</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Lumora sanitary pads are thoughtfully engineered to support your
            active lifestyle with superior comfort, protection, and hygiene.
            Feel confident every day with advanced technology designed for you.
          </p>

          {/* FEATURES LIST */}
          <ul className="space-y-3 text-sm sm:text-base">
            {[
              "Keeps you dry for long hours",
              "Prevents rashes and irritation",
              "Odor control for freshness",
              "Secure fit for all-day confidence",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg shadow-sm 
          hover:shadow-md hover:-translate-y-1 hover:bg-pink-50 
          transition-all duration-300 cursor-pointer group"
              >
                <span className="text-pink-500 text-lg group-hover:scale-110 transition">
                  ✔
                </span>
                <span className="text-gray-700 group-hover:text-gray-900">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className="flex justify-center py-10">
          <div className="relative group w-full max-w-sm sm:max-w-md">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-pink-400/20 blur-2xl rounded-3xl opacity-70 group-hover:opacity-100 transition duration-500" />

            {/* Card */}
            <div
              className="relative bg-white p-6 rounded-3xl shadow-md 
      hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              <Image
                src="/product1.jpeg"
                alt="Benefits"
                width={320}
                height={320}
                className="mx-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow">
                Premium Quality
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
