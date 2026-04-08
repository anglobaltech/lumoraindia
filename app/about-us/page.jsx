"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const slides = [
  {
    id: 1,
    title: "Healthier Community For Womens",
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
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
    <div className="bg-pink-50 text-gray-800">
      <section className="relative w-full h-56  overflow-hidden">
        <Image
          src="/bg.png"
          alt="About Lumora India"
          fill
          priority
          className="object-cover object-top"
        />
      </section>

      {/* 🌸 ABOUT / JOURNEY */}
      <section className="py-10 bg-linear-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Our <span className="text-pink-500">Journey</span>
            </h2>

            <div className="w-16 h-1 bg-pink-500 mt-4 mb-6 rounded-full"></div>

            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Our journey began with a simple yet powerful vision — to redefine
              feminine hygiene with care, comfort, and confidence.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              At{" "}
              <span className="font-semibold text-pink-500">Lumora India</span>,
              we understand that every woman deserves products that not only
              protect but also empower her to live freely without discomfort or
              worry.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              With innovation, premium materials, and thoughtful design, we
              ensure every product reflects safety, softness, and trust.
            </p>

            {/* Highlight Points */}
            {/* <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                "Dermatologically Safe",
                "Ultra Soft Comfort",
                "Leak Protection",
                "Skin Friendly",
              ].map((item) => (
                <div className="bg-white px-4 py-3 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:shadow-md transition">
                  ✔ {item}
                </div>
              ))}
            </div> */}
          </div>

          {/* Image */}
          <div className="relative group overflow-hidden rounded-3xl">
            {/* Glow Background */}
            <div className="absolute inset-0 bg-pink-200 blur-3xl opacity-30 rounded-full group-hover:opacity-50 transition duration-500"></div>

            {/* Image Container (Fixed Height) */}
            <div className="relative h-87.5 sm:h-112.5 md:h-125 w-full overflow-hidden rounded-3xl">
              <Image
                src="/15.jpeg"
                alt="Lumora India"
                fill
                className="object-cover transition duration-700 ease-in-out 
                 group-hover:scale-110 group-hover:rotate-1"
              />

              {/* Overlay on Hover */}
              <div
                className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition duration-500"
              ></div>

              {/* Text on Hover */}
              <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 transition duration-500">
                <p className="text-lg font-semibold tracking-wide">
                  Lumora India
                </p>
                <p className="text-sm text-gray-200">
                  Comfort • Care • Confidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💖 MISSION */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Left Card */}
          <div className="bg-linear-to-br from-pink-50 to-pink-100 p-10 rounded-3xl shadow-lg border border-pink-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              What Drives Us
            </h3>

            <ul className="space-y-5 text-gray-700">
              {[
                "Safe and hygienic menstrual care products",
                "Comfortable protection for every woman",
                "Affordable feminine hygiene solutions",
                "Spreading awareness about menstrual health",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-pink-500 text-xl">✔</span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Our <span className="text-pink-500">Mission</span>
            </h2>

            <div className="w-16 h-1 bg-pink-500 mt-4 mb-6 rounded-full"></div>

            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              At{" "}
              <span className="font-semibold text-pink-500">Lumora India</span>,
              our mission is to empower women with safe, reliable, and
              comfortable menstrual care solutions.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              We design products that offer superior protection, breathable
              comfort, and skin-friendly materials — so women can feel confident
              every single day.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              We believe menstrual hygiene should never be a barrier. Through
              innovation, accessibility, and awareness, we are committed to
              making feminine care simple, safe, and empowering for every woman
              across India.
            </p>
          </div>
        </div>
      </section>

      {/* trust */}
      <section className="py-10 bg-gradient-to-b from-white to-pink-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADING */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Trusted & <span className="text-pink-500">Empowering Women</span>
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              Certified safety, premium quality, and a mission to break the
              silence around menstrual health.
            </p>
          </div>

          {/* TRUST BADGES */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-8">
            {[
              "Dermatologically Tested",
              "ISO Certified",
              "Chemical Free",
              "Skin Safe Materials",
            ].map((item, i) => (
              <div
                key={i}
                className="group px-4 sm:px-6 py-2.5 sm:py-3 bg-white border border-pink-200 rounded-full 
          text-xs sm:text-sm font-medium text-pink-600 cursor-pointer
          hover:bg-pink-500 hover:text-white hover:scale-105 
          transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ✔ {item}
              </div>
            ))}
          </div>

          {/* AWARENESS SECTION */}
          <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Menstrual Hygiene Awareness",
                desc: "Educating women and young girls about safe and healthy hygiene practices.",
              },
              {
                title: "School & Rural Campaigns",
                desc: "Reaching underserved communities to spread awareness and accessibility.",
              },
              {
                title: "Women Health Education",
                desc: "Promoting confidence and health through knowledge and support.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-pink-100 
          hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* ICON */}
                <div className="text-3xl mb-4 transition group-hover:scale-110">
                  🌸
                </div>
                {/* TITLE */}
                <h3 className="font-semibold text-base sm:text-lg text-gray-800 group-hover:text-pink-500 transition">
                  {item.title}
                </h3>
                {/* DESC */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
                {/* HOVER LINE */}
                <div className="h-[2px] w-0 group-hover:w-full bg-pink-500 transition-all duration-300 mt-3 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="relative py-10 overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
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

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Choose <span className="text-pink-500">Lumora India?</span>
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
                Advanced absorbent layers keep you dry and protected during
                heavy flow.
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
                Multiple absorbent layers quickly lock in fluid and prevent
                leakage.
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

      {/* Our Promise Section */}
      <section className="py-10 bg-linear-to-r from-pink-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Promise to <span className="text-pink-500">Women</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              We are committed to delivering care, comfort, and confidence
              through every product we create.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4 transition group-hover:scale-110">
                💖
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Care & Comfort
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Designed with ultra-soft materials to ensure maximum comfort for
                every woman, every day.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4 transition group-hover:scale-110">
                🔒
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Safety First
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dermatologically tested and made with skin-friendly materials to
                ensure complete hygiene and protection.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4 transition group-hover:scale-110">
                🌸
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Confidence Everyday
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Helping women stay confident, active, and worry-free during
                every phase of their cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center  text-black px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold leading-tight">
          Because You Deserve Better 💖
        </h2>

        <p className="mt-3 sm:mt-4 text-black text-sm sm:text-base max-w-xl mx-auto">
          Switch to Lumora and experience comfort, confidence, and care like
          never before.
        </p>

        {/* BUTTONS */}
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-5">
          {/* Shop Now */}
          <Link href="/products">
            <button
              className="cursor-pointer w-full sm:w-auto px-8 py-3 text-pink-500 rounded-full font-semibold 
      hover:scale-105 hover:bg-pink-300 transition-all duration-300 shadow-md"
            >
              Shop Now
            </button>
          </Link>

          {/* Contact */}
          <Link href="/contact">
            <button
              className="cursor-pointer w-full sm:w-auto px-8 py-3 border text-black rounded-full font-semibold 
      hover:bg-white hover:text-pink-500 transition-all duration-300"
            >
              Contact Us
            </button>
          </Link>
        </div>
        {/* TRUST LINE */}
        <p className="mt-6 text-xs sm:text-sm text-black">
          Trusted by 1000+ women across India 🇮🇳
        </p>
      </section>
    </div>
  );
};

export default page;
