"use client"
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const slides = [
  {
    id: 1,
    title: "Healthier Community For Women",
    desc: "Premium sanitary napkins designed for modern women, offering superior comfort, leak protection, and breathable cotton layers that keep you fresh, confident, and protected throughout the day..",
    image: "/4.jpeg",
    features: [
      "Dermatologically Tested",
      "Ultra Soft Cotton Layer",
      "Leak Lock Protection",
      "Breathable Comfort",
    ],
  },
  {
    id: 2,
    title: "Comfort & Protection Technology",
    desc: "Advanced absorbent sanitary pads with leak-lock technology and odor control that provide long-lasting dryness, rash-free comfort, and reliable protection during heavy flow and everyday use.",
    image: "/12.jpeg",
    features: [
      "Super Absorbent Core",
      "Odor Control Layer",
      "Rash Free Design",
      "All Day Freshness",
    ],
  },
  {
    id: 3,
    title: "Innovation In Women Hygiene",
    desc: "Innovative women hygiene products crafted with skin-friendly materials, antibacterial protection, and extra-long coverage to ensure safe, comfortable, and confident protection during every menstrual cycle.",
    image: "/15.jpeg",
    features: [
      "Skin Friendly Material",
      "Anti Bacterial Protection",
      "Secure Fit Design",
      "Extra Long Coverage",
    ],
  },
];
const page = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [current, setCurrent] = useState(0);
  
    const nextSlide = () => {
      setCurrent((prev) => (prev + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
  
      AOS.init({
        duration: 1000,
        once: false,
      });
  
      const slider = setInterval(() => {
        nextSlide();
      }, 5000);
  
      return () => clearInterval(slider);
  
    }, []);
  
    const slide = slides[current];


  return (
    <div className="bg-pink-100 text-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About us Lumora India
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering women through comfort, confidence, and care. Our mission
            is to create innovative hygiene solutions that ensure protection,
            comfort, and wellbeing every day.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Journey!</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Our journey began with a simple but powerful idea — to create
              sanitary products that provide exceptional protection while
              improving women’s health and confidence.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We focus on innovation, quality materials, and thoughtful design
              to ensure that every woman feels comfortable and secure during
              menstruation.
            </p>
          </div>

          <div>
            <Image
              src="/lumora.jpg"
              alt="about The lumoraindia"
              height={600}
              width={600}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

<section className="py-20 ">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Our Mission
      </h2>

      <p className="mt-6 text-gray-600  leading-relaxed">
        At <span className="font-semibold text-pink-500">Lumora India</span>,
        our mission is to provide women with safe, comfortable, and reliable
        menstrual care products. We are committed to designing sanitary
        napkins that offer superior protection, skin-friendly materials,
        and long-lasting comfort so women can live confidently every day.
      </p>

      <p className="mt-4 text-gray-600  leading-relaxed">
        We believe that every woman deserves access to hygienic and affordable
        feminine care. Through innovation, quality, and awareness, we strive
        to make menstrual health simple, safe, and empowering for women
        across India.
      </p>

    </div>

    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        What Drives Us
      </h3>

      <ul className="space-y-4 text-gray-600">

        <li className="flex items-start gap-3">
          <span className="text-pink-500 text-xl">✔</span>
          Safe and hygienic menstrual care products
        </li>

        <li className="flex items-start gap-3">
          <span className="text-pink-500 text-xl">✔</span>
          Comfortable protection for every woman
        </li>

        <li className="flex items-start gap-3">
          <span className="text-pink-500 text-xl">✔</span>
          Affordable feminine hygiene solutions
        </li>

        <li className="flex items-start gap-3">
          <span className="text-pink-500 text-xl">✔</span>
          Promoting awareness about menstrual health
        </li>

      </ul>
    </div>

  </div>
</section>

      {/* Products */}

<section className="relative py-16  bg-linear-to-b from-pink-50 via-white to-purple-50 overflow-hidden">

      <div className="max-w-7xl mx-auto p-10 md:p-0 grid md:grid-cols-2 items-center">
        <div key={slide.image} data-aos="fade-right">
          <div className="rounded-3xl overflow-hidden shadow-2xl   md:h-135 md:w-135 border border-pink-100">
            <Image
              src={slide.image}
              alt="women hygiene"
              width={300}
              height={250}
              className="object-cover w-full h-full "
            />
          </div>
        </div>

        <div key={slide.title} className="space-y-8" data-aos="fade-left">

          {/* <div className="flex items-center  text-gray-500">
            <span className="text-4xl font-bold text-pink-600">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span>/ {slides.length}</span>
          </div> */}

          <h2 className="text-3xl pt-9 md:p-0 md:text-5xl font-semibold text-gray-800 leading-tight">
            {slide.title}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            {slide.desc}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {slide.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-lg border border-white/40 px-4 py-3 rounded-xl shadow-sm hover:shadow-lg transition"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                ✔ {feature}
              </div>

            ))}
          </div>
          <div className="flex gap-4 pt-2">
            <Link href="/contact">
            <button className="px-8 py-3 bg-pink-500 cursor-pointer text-white rounded-full shadow-lg hover:scale-105 transition">
              Contact For Order
            </button>
            </Link>
            <Link href="/products">
            <button className="px-8 py-3 cursor-pointer border border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition">
              View Products
            </button>
            </Link>

          </div>

          {/* Controls */}

          <div className="flex gap-4 pt-4">

            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-pink-100"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-pink-100"
            >
              →
            </button>

          </div>

        </div>

      </div>

    </section>

      {/* why choose lumoraindia page */}

      <section className="py-16 bg-pink-50">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">
        Why Choose Lumora India?
      </h2>
      <p className="text-gray-600 mt-3">
        Designed for comfort, hygiene and all-day protection
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">🛡️</div>
        <h3 className="font-semibold text-lg">Leak Proof Protection</h3>
        <p className="text-gray-600 text-sm mt-2">
          Advanced absorbent layers keep you dry and protected during heavy flow.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">🌸</div>
        <h3 className="font-semibold text-lg">Ultra Soft Comfort</h3>
        <p className="text-gray-600 text-sm mt-2">
          Soft cotton surface ensures maximum comfort for sensitive skin.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">🦠</div>
        <h3 className="font-semibold text-lg">Anti-Bacterial Layer</h3>
        <p className="text-gray-600 text-sm mt-2">
          Helps prevent bacteria growth and reduces unwanted odour.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">💧</div>
        <h3 className="font-semibold text-lg">High Absorption</h3>
        <p className="text-gray-600 text-sm mt-2">
          Multiple absorbent layers quickly lock in fluid and prevent leakage.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">🌿</div>
        <h3 className="font-semibold text-lg">Skin Friendly</h3>
        <p className="text-gray-600 text-sm mt-2">
          Breathable materials keep skin irritation free and comfortable.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">📏</div>
        <h3 className="font-semibold text-lg">Extra Long Pads</h3>
        <p className="text-gray-600 text-sm mt-2">
          Extra coverage gives confidence and protection day and night.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* Sustainability */}
      <section className="py-8" >
        <div className="max-w-5xl py-5 mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Commitment to Sustainability
          </h2>

          <p className="text-gray-600">
            We are dedicated to reducing our environmental footprint through
            eco-friendly materials and sustainable packaging. Our goal is to
            create products that care for both women and the planet.
          </p>
        </div>
         {/* Community */}
                <div className="max-w-5xl py-10 mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Empowering Women</h2>

          <p className="text-gray-600">
            Through education, awareness campaigns, and partnerships, we work to
            break the stigma around menstruation and promote a supportive
            environment where women feel confident and empowered.
          </p>
        </div>
      </section>

    </div>
  );
};

export default page;
