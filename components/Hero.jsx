import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-pink-100 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Comfort & Confidence
              <span className="text-pink-500"> Every Day</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Lumora India provides high-quality sanitary napkins designed for
              maximum comfort, protection, and hygiene. Stay confident and
              active every day with safe and reliable feminine care.
            </p>

            <p className="mt-6 text-gray-600 text-lg">
              Lumora India is a well established platform for the sanitary
              napkins.
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
              src="/1.png"
              alt="Lumora Sanitary Napkins"
              className="w-80 md:w-96 rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/*About Section */}
      <section className="bg-pink-100 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl pb-1 font-bold text-gray-800">
              About Lumora India
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-5xl mx-auto">
              Lumora India is dedicated to empowering women with high-quality
              sanitary hygiene products designed for comfort, protection, and
              confidence. Our mission is to provide safe, reliable, and
              affordable menstrual care solutions for every woman.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src="/2.png"
                alt="Lumora Sanitary Napkins"
                className="w-80 md:w-96 border border-gray-200 rounded-2xl shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Lumora India Commitment
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                At Lumora India, we believe menstrual hygiene should be
                comfortable, reliable, and accessible to every woman. Our
                products are designed with advanced absorbent technology that
                ensures long-lasting protection and comfort throughout the day.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                We focus on innovation, quality materials, and eco-friendly
                practices to create products that not only support womens
                health but also care for the environment.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h4 className="font-semibold text-pink-600 group-hover:text-pink-700">
                    Superior Comfort
                  </h4>
                  <p className="text-sm text-gray-600">
                    Soft materials designed for daily comfort.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h4 className="font-semibold text-pink-600">
                    High Protection Safety
                  </h4>
                  <p className="text-sm text-gray-600">
                    Advanced absorbent technology for safety.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h4 className="font-semibold text-pink-600">Skin Friendly</h4>
                  <p className="text-sm text-gray-600">
                    Dermatologically safe materials.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h4 className="font-semibold text-pink-600">Eco Conscious</h4>
                  <p className="text-sm text-gray-600">
                    Sustainable and responsible production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Product Section */}
      <section className="py-16 bg-pink-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
              Our Products
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Discover Lumora’s range of high-quality sanitary napkins designed
              for comfort, protection, and confidence throughout the day.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {/* Product 1 */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 group">
              <div className="flex justify-center mb-4">
                <img
                  src="/product.jpeg"
                  alt="Lumora Regular Pads"
                  className="h-48 object-contain group-hover:scale-105 transition"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Lumora Regular Pads
              </h3>

              <p className="text-gray-600 text-sm text-center mt-2">
                Comfortable everyday protection with soft breathable layers.
              </p>

              <div className="flex justify-center mt-4">
                <button className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition">
                  View Product
                </button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 group">
              <div className="flex justify-center mb-4">
                <img
                  src="/product1.jpeg"
                  alt="Lumora XL Pads"
                  className="h-48 object-contain group-hover:scale-105 transition"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Lumora XL Protection
              </h3>

              <p className="text-gray-600 text-sm text-center mt-2">
                Extra-long pads designed for overnight safety and maximum
                absorption.
              </p>

              <div className="flex justify-center mt-4">
                <button className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition">
                  View Product
                </button>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 group">
              <div className="flex justify-center mb-4">
                <img
                  src="/product2.jpeg"
                  alt="Lumora Ultra Pads"
                  className="h-48 object-contain group-hover:scale-105 transition"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Lumora Ultra Comfort
              </h3>

              <p className="text-gray-600 text-sm text-center mt-2">
                Ultra-thin sanitary pads with superior absorbency and comfort.
              </p>

              <div className="flex justify-center mt-4">
                <button className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition">
                  View Product
                </button>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 group">
              <div className="flex justify-center mb-4">
                <img
                  src="/product3.jpeg"
                  alt="Lumora Ultra Pads"
                  className="h-48 object-contain group-hover:scale-105 transition"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Lumora Ultra Comfort
              </h3>

              <p className="text-gray-600 text-sm text-center mt-2">
                Ultra-thin sanitary pads with superior absorbency and comfort.
              </p>

              <div className="flex justify-center mt-4">
                <button className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition">
                  View Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
