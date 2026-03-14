import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MessageCircle } from "lucide-react";

const Page = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Product Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10">
          Ultra Soft Sanitary Napkins
          <span className="block text-pink-500 text-lg md:text-xl mt-2">
            Rash Free • Leak Protection Pads
          </span>
        </h1>

        {/* Product Layout */}
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/product1.jpeg"
              alt="Ultra Soft Sanitary Napkins"
              width={500}
              height={500}
              className="rounded-3xl shadow-lg hover:scale-105 transition duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 text-gray-900">

            <h2 className="text-2xl font-bold mb-2">
              Ultra Soft Cotton Sanitary Napkins
            </h2>

            <p className="text-gray-600 mb-3">
              Anti-Bacteria Extra Long 290mm
            </p>

            {/* Rating */}
            <p className="text-yellow-500 font-semibold mb-4">
              ⭐⭐⭐⭐⭐ 4.8/5 (120 Reviews)
            </p>

            {/* Description */}
            <p className="mb-3">
              This sanitary napkin keeps you completely safe from leakage and
              discomfort during heavy flow days.
            </p>

            <p className="mb-5">
              Designed with Deep Absorbent Core Technology that prevents
              leakage and provides 99.9% protection from odor causing bacteria.
            </p>

            {/* Pack Options */}
            <h3 className="font-bold mb-3">Available Packs</h3>

            <div className="flex gap-4 mb-6 flex-wrap">

              <div className="border px-6 py-3 rounded-xl bg-pink-400 text-white cursor-pointer">
                7 Pads
              </div>

              <div className="px-4 py-3 bg-pink-100 rounded-xl font-semibold">
                14 Pads
              </div>

              <div className="px-4 py-3 bg-pink-100 rounded-xl font-semibold">
                28 Pads
              </div>

            </div>

            {/* Order Button */}
            <Link
              href="https://wa.me/7782069184"
              target="_blank"
            >


<button className="flex items-center cursor-pointer gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 hover:scale-105 transition">
<MessageCircle size={20}/>
Contact for Order
</button>
            </Link>

            {/* Features */}
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>✔ Dermatologically Tested</li>
              <li>✔ 100% Safe & Rash Free</li>
              <li>✔ Breathable Cotton Material</li>
              <li>✔ Long Lasting Protection</li>
            </ul>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Page;