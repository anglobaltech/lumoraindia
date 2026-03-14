import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MessageCircle, ShieldCheck, Droplets, HeartPulse } from "lucide-react";

const Page = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Product Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ultra Soft Sanitary Napkins
          </h1>

          <p className="text-pink-500 text-lg mt-2 font-medium">
            Rash Free • Leak Protection Pads
          </p>
        </div>

        {/* Product Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Product Image */}
          <div className="flex justify-center">
            <div className="bg-pink-50 p-8 rounded-3xl shadow-md">
              <Image
                src="/product1.jpeg"
                alt="Ultra Soft Sanitary Napkins"
                width={450}
                height={450}
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Ultra Soft Cotton Sanitary Napkins
            </h2>

            <p className="text-gray-600 mb-3">
              Anti-Bacteria • Extra Long 290mm Protection
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="text-gray-600 text-sm">(4.8 / 5 • 120 Reviews)</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4 leading-relaxed">
              Designed for maximum comfort and protection, Lumora Ultra Soft
              Sanitary Napkins help you stay confident throughout the day.
              The deep absorbent core quickly locks moisture and prevents
              leakage even during heavy flow.
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              With breathable cotton material and advanced odor protection,
              these pads keep you fresh, dry, and rash-free.
            </p>

            {/* Pack Options */}
            <h3 className="font-semibold text-gray-900 mb-3">
              Available Packs
            </h3>

            <div className="flex gap-4 mb-8 flex-wrap">
              <button className="px-6 py-3 rounded-xl bg-pink-500 text-white font-medium shadow hover:bg-pink-600 transition">
                7 Pads
              </button>

              <button className="px-6 py-3 rounded-xl bg-pink-100 text-gray-800 font-medium hover:bg-pink-200 transition">
                14 Pads
              </button>

              <button className="px-6 py-3 rounded-xl bg-pink-100 text-gray-800 font-medium hover:bg-pink-200 transition">
                28 Pads
              </button>
            </div>

            {/* Order Button */}
            <Link href="https://wa.me/917782069184" target="_blank">
              <button className="flex items-center gap-2 bg-green-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-green-600 transition shadow-md">
                <MessageCircle size={20} />
                Order on WhatsApp
              </button>
            </Link>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <ShieldCheck className="text-pink-500" size={22} />
                <span className="text-sm text-gray-700">
                  Dermatologically Tested
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <HeartPulse className="text-pink-500" size={22} />
                <span className="text-sm text-gray-700">
                  Rash Free Comfort
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <Droplets className="text-pink-500" size={22} />
                <span className="text-sm text-gray-700">
                  Ultra Absorbent Core
                </span>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <ShieldCheck className="text-pink-500" size={22} />
                <span className="text-sm text-gray-700">
                  Odor Protection
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section> 
  );
};

export default Page;