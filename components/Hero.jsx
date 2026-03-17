"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Droplets, HeartPulse, ShieldCheck, Sparkles,Star } from "lucide-react";


// why choose lumora india
  const features = [
    {
      icon: <ShieldCheck size={42} />,
      title: "Advanced Leak Protection",
      desc: "Lumora sanitary napkins use multi-layer absorbent technology to prevent leakage and keep you dry and comfortable throughout the day.",
    },
    {
      icon: <HeartPulse size={42} />,
      title: "Skin Friendly Cotton",
      desc: "Soft breathable cotton surface protects sensitive skin and ensures irritation-free comfort during long hours of use.",
    },
    {
      icon: <Droplets size={42} />,
      title: "High Absorbency Core",
      desc: "Deep absorbent layers quickly lock moisture and help maintain hygiene while preventing odor and wetness.",
    },
    {
      icon: <Sparkles size={42} />,
      title: "Trusted Hygiene Quality",
      desc: "Lumora India focuses on premium women's hygiene products designed for safety, comfort and confidence every day.",
    },
  ];

// products
const products = [
  {
    id: 1,
    name: "Ultra Comfort Sanitary Pads",
    price: "₹199",
    oldPrice: "₹249",
    image: "/product1.png",
  },
  {
    id: 2,
    name: "Extra Long Night Protection",
    price: "₹249",
    oldPrice: "₹299",
    image: "/product2.png",
  },
  {
    id: 3,
    name: "Cotton Soft Day Pads",
    price: "₹179",
    oldPrice: "₹219",
    image: "/product3.png",
  },
  {
    id: 4,
    name: "Rash Free Hygiene Pads",
    price: "₹199",
    oldPrice: "₹249",
    image: "/product4.png",
  },
];


const Hero = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);


  return (
    <div className="bg-white text-gray-800">

  

<section className="bg-pink-100 min-h-screen flex items-center py-">
  <div className="max-w-8xl mx-auto  sm:px-6  grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT CONTENT */}
    <div className="space-y-8 pl-10">

      {/* Heading */}
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          Comfort & Confidence
          <span className="text-pink-500 block">Every Day</span>
        </h1>

              <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
                Lumora India offers premium quality sanitary napkins designed
                for superior comfort, hygiene, and reliable protection. Crafted
                with breathable cotton layers and advanced absorbent technology.
              </p>

              <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
                Whether it&apos;s daily protection or heavy flow days, Lumora ensures
                rash-free comfort, dryness, and confidence throughout the day.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-pink-500 text-white px-7 py-3 rounded-lg font-semibold shadow-md
          hover:bg-pink-600 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                View Products
              </Link>

              <Link
                href="/about-us"
                className="border border-pink-500 text-pink-500 px-7 py-3 rounded-lg font-semibold
          hover:bg-pink-200 hover:shadow-md hover:-translate-y-1 transition duration-300"
              >
                Learn More
              </Link>
            </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">

        <div className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer">
          ✔ Dermatologically Tested
        </div>

        <div className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer">
          ✔ 100% Rash Free
        </div>

        <div className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer">
          ✔ Leak Protection
        </div>

        <div className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer">
          ✔ Breathable Cotton Layer
        </div>

      </div>

            {/* Stats */}
            <div className="flex gap-10 pt-4">
              <div className="group cursor-pointer">
                <h3 className="text-2xl font-bold text-pink-500 group-hover:scale-110 transition">
                  10K+
                </h3>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>

              <div className="group cursor-pointer">
                <h3 className="text-2xl font-bold text-pink-500 group-hover:scale-110 transition">
                  99%
                </h3>
                <p className="text-sm text-gray-600">Leak Protection</p>
              </div>

              <div className="group cursor-pointer">
                <h3 className="text-2xl font-bold text-pink-500 group-hover:scale-110 transition">
                  24/7
                </h3>
                <p className="text-sm text-gray-600">Support</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center">
            {/* Image Container */}
            <div
              className="relative bg-white p-8 rounded-3xl cursor-pointer shadow-xl 
      hover:shadow-2xl hover:-translate-y-2 transition duration-500 group"
            >
              <Image
                src="/1.png"
                alt="Lumora Sanitary Napkins"
                width={420}
                height={420}
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />

        {/* Bestseller Badge */}
        <div className="absolute -top-4 -left-4 bg-pink-500 text-white text-xs px-4 py-1 rounded-full shadow
        group-hover:scale-110 transition">
          Bestseller
        </div>

      </div>

    </div>

  </div>
</section>
      {/* About Section */}
      <section className="bg-pink-50 py-10">
        <div className="max-w-7xl mx-auto px-6  sm:px-8 lg:px-12">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl pb-1 font-bold text-gray-800">
              About Lumora India
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-4 max-w-5xl mx-auto">
              Lumora India is dedicated to empowering women with high-quality
              sanitary hygiene products designed for comfort, protection, and
              confidence. Our mission is to provide safe, reliable, and
              affordable menstrual care solutions for every woman.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 mt-20  items-center">
            {/* Image */}
            <div className="flex md:justify-start justify-center">
              <Image
                src="/2.png"
                alt="Lumora Sanitary Napkins"
                height={400}
                width={400}
                className="w-70 sm:w-80 md:w-120 border border-gray-200 rounded-2xl shadow-lg object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="px-[-10]">
              <h3 className="text-center md:text-left py-7 text-2xl md:text-3xl md:py-0 font-semibold text-gray-800 mb-4">
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
                practices to create products that not only support women&apos;s
                health but also care for the environment.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Superior Comfort",
                    desc: "Soft materials designed for daily comfort.",
                  },
                  {
                    title: "High Protection Safety",
                    desc: "Advanced absorbent technology for safety.",
                  },
                  {
                    title: "Skin Friendly",
                    desc: "Dermatologically safe materials.",
                  },
                  {
                    title: "Eco Conscious",
                    desc: "Sustainable and responsible production.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <h4 className="font-semibold text-pink-600 text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

{/*   why choose lumora india */}

    <section className="relative py-10 bg-pink-50  overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
      <div className="max-w-7xl mx-auto px-6 relative">

        <div className="text-center mb-16" data-aos="fade-up">
          {/* <h2 className="text-center text-base text-pink-500">Why Lumora India?</h2> */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Why Choose <span className="text-pink-500 italic">Lumora India</span>
          </h2>
          <h2 className="text-blue-600 font-bold italic py-2 text-3xl">Organic Sanitary Napkin</h2>

          <p className="mt-10 text-gray-600 max-w-2xl mx-auto text-lg">
            Lumora India provides premium women hygiene products designed for
            comfort, protection, and confidence during every stage of your day.
          </p>

        </div>

        <div className="grid md:grid-cols-2 cursor-pointer lg:grid-cols-4 gap-10">

          {features.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className="group relative bg-white rounded-3xl p-8 shadow-lg 
              hover:shadow-2xl transition duration-500 hover:-translate-y-3"
            >

              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-10 transition"></div>

              <div className="flex justify-center mb-6 text-pink-500 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm text-center leading-relaxed">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>

      {/* Product Section */}
      <section className="py-16 bg-pink-100 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Our Products
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-base md:text-lg">
              Discover Lumora's range of high-quality sanitary napkins designed
              for comfort, protection, and confidence throughout the day.
            </p>
          </div>

          {/* Product Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 text-center">
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transform transition duration-500 hover:scale-110">
              <h4 className="font-semibold text-gray-800">Ultra Absorbent</h4>
              <p className="text-sm text-gray-600 mt-1">
                Advanced absorption technology keeps you dry for longer hours.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transform transition duration-500 hover:scale-110">
              <h4 className="font-semibold text-gray-800">Rash Free Comfort</h4>
              <p className="text-sm text-gray-600 mt-1">
                Soft breathable cotton layer prevents irritation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transform transition duration-500 hover:scale-110">
              <h4 className="font-semibold text-gray-800">Leak Protection</h4>
              <p className="text-sm text-gray-600 mt-1">
                Side barriers provide strong protection against leaks.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transform transition duration-500 hover:scale-110">
              <h4 className="font-semibold text-gray-800">Skin Friendly</h4>
              <p className="text-sm text-gray-600 mt-1">
                Designed with safe materials suitable for sensitive skin.
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                src: "/product.jpeg",
                alt: "Lumora Regular Pads",
                name: "Lumora Regular Pads",
                desc: "Comfortable everyday protection with soft breathable layers.",
              },
              {
                src: "/product1.jpeg",
                alt: "Lumora XL Pads",
                name: "Lumora XL Protection",
                desc: "Extra-long pads designed for overnight safety and maximum absorption.",
              },
              {
                src: "/product2.jpeg",
                alt: "Lumora Ultra Pads",
                name: "Lumora Ultra Comfort",
                desc: "Ultra-thin sanitary pads with superior absorbency and comfort.",
              },
              {
                src: "/product3.jpeg",
                alt: "Lumora Herbal Pads",
                name: "Lumora Herbal Range",
                desc: "Natural herbal-infused pads for a gentle skin-friendly experience.",
              },
            ].map((product) => (
              <div
                key={product.name}
                className="bg-pink-50 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 group flex flex-col"
              >
                {/* Image */}
                <div className="flex justify-center mb-4">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    height={200}
                    width={200}
                    className="h-44 w-full object-contain group-hover:scale-110 cursor-pointer transition duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm text-center mt-2 flex-1">
                  {product.desc}
                </p>

                {/* Button */}
                <div className="flex justify-center mt-5">
                  <Link href="/products">
                    <button className="bg-pink-500 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-pink-600 hover:shadow-md transition">
                      View Product
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    
    </div>
  );
};

export default Hero;
