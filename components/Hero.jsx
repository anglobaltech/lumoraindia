import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-pink-50 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Comfort & Confidence
            <span className="text-pink-500"> Every Day</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Lumora India provides high-quality sanitary napkins designed for
            maximum comfort, protection, and hygiene. Stay confident and active
            every day with safe and reliable feminine care.
          </p>

          <p className="mt-6 text-gray-600 text-lg">
            Lumora India provides high-quality sanitary napkins designed for
            maximum comfort, protection, and hygiene. Stay confident and active
            every day with safe and reliable feminine care.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/products"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
            >
              View Products
            </Link>
            <Link
              href="/about-us"
              className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-100"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/sanitary-napkin.png"
            alt="Lumora Sanitary Napkins"
            className="w-80 md:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;