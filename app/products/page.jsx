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
    <main className=" bg-linear-to-b from-pink-50 via-white to-pink-50">
      {/* Top section */}
      <section className="bg-linear-to-b from-pink-100 to-white py-15 px-6 w-full">
        <div className="max-w-7xl mx-auto  text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Feel Confident Every Day
          </h1>
          <p className="text-pink-500 text-xl mt-3 font-medium">
            Ultra Soft • Rash-Free • All-Day Protection
          </p>
        </div>
      </section>


      {/* product section */}
      <section className="max-w-7xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible" data-aos="fade-right">
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

          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-pink-100">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.alt}
              width={400}
              height={400}
              className="rounded-xl object-contain transition duration-500 hover:scale-110"
            />
          </div>
        </div>

        <div data-aos="fade-left" className="flex flex-col gap-5">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Lumora Ultra Soft Sanitary Pads, Rash-Free Comfort
          </h2>
          <p className="text-gray-500 text-sm">
            Trusted by 10,000+ women across India
          </p>

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

          <p className="text-green-600 text-sm font-medium">
            🔥 Limited stock available — Selling fast!
          </p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Select Pack</h3>

            <div className="flex gap-3">
              {packs.map((pack, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPack(pack)}
                  className={`px-4 py-2 text-sm rounded-xl font-medium shadow-sm cursor-pointer transition
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

          <div className="flex gap-4 mt-6">
            <button className="flex-1 bg-pink-100 text-pink-700 py-3 rounded-xl font-medium hover:bg-pink-200 transition">
              Add to Cart
            </button>

            <button className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-pink-700 transition-all duration-300">
              Buy Now
            </button>
          </div>

          <div className="text-sm text-gray-500 mt-3">
            🚚 Free Delivery • 💖 Skin Friendly • 🌿 Rash Free • 🔒 Safe Use
          </div>
        </div>
      </section>

      {/*product description and feature*/}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 py-16">
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
      {/* wny choose lumora */}
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

      {/* modern women */}
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
                src="/product3.jpeg"
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

      {/* review  */}
      <section className="py-16 bg-pink-50 max-w-7xl mx-auto text-center">
        <div className="">
          <h2 className="text-3xl font-bold mb-10">Customer Love 💬</h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-left">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-lg">
                  P
                </div>
                <p className="font-semibold text-gray-900">Priya</p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Very soft and comfortable. I didn’t feel any irritation even after long hours. Highly recommended!
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-left">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-lg">
                  N
                </div>
                <p className="font-semibold text-gray-900">Neha</p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                The quality is amazing. It absorbs really well and feels very light. Definitely my go-to choice now.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-left">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-lg">
                  A
                </div>
                <p className="font-semibold text-gray-900">Aarti</p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                No leakage issues at all. I feel more confident and stress-free during my periods now.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
