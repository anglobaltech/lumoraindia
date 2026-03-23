"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Droplets, HeartPulse, RefreshCcw, ShieldCheck, PackageCheck, Ban, Phone } from "lucide-react";

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

      {/* why choose lumora */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Women Love This </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="p-5 rounded-2xl shadow hover:scale-105 transition">
              <p className="text-pink-500 text-2xl">🌸</p>
              <p className="mt-2 font-medium">Rash-Free Comfort</p>
            </div>

            <div className="p-5 rounded-2xl shadow hover:scale-105 transition">
              <p className="text-pink-500 text-2xl">💧</p>
              <p className="mt-2 font-medium">High Absorption</p>
            </div>

            <div className="p-5 rounded-2xl shadow hover:scale-105 transition">
              <p className="text-pink-500 text-2xl">🌿</p>
              <p className="mt-2 font-medium">Skin Friendly</p>
            </div>

            <div className="p-5 rounded-2xl shadow hover:scale-105 transition">
              <p className="text-pink-500 text-2xl">🕒</p>
              <p className="mt-2 font-medium">8 Hours Protection</p>
            </div>

          </div>
        </div>
      </section>

      {/* review  */}
<section className="py-16 bg-pink-50 max-w-7xl mx-auto text-center">
  <div className="">
    <h2 className="text-3xl font-bold mb-10">Customer Love 💬</h2>

    <div className="grid md:grid-cols-3 gap-6">

      {/* Review Card */}
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

      {/* Review Card */}
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

      {/* Review Card */}
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
