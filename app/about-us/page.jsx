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
    desc: "Premium sanitary napkins designed for modern women, offering superior comfort, leak protection, and breathable cotton layers that keep you fresh, confident, and protected throughout the day.",
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
    <div className="bg-pink-50 text-gray-800 overflow-x-hidden">

      {/* 🌸 ABOUT / JOURNEY */}
      <section className="pt-8 md:pt-10 pb-10 lg:pb-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid md:grid-cols-2 gap-8 lg:gap-16 items-stretch">

          <div data-aos="fade-right" className="flex flex-col justify-between h-full space-y-4 py-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 leading-tight">
                Our <span className="text-pink-500">Journey</span>
              </h2>
              <div className="w-16 h-1 bg-pink-500 mt-4 mb-2 rounded-full"></div>
            </div>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Our journey began with a simple yet powerful vision — to redefine
              feminine hygiene with care, comfort, and confidence.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              At{" "}
              <span className="font-semibold text-pink-500">Lumora India</span>,
              we understand that every woman deserves products that not only
              protect but also empower her to live freely without discomfort or
              worry.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              With innovation, premium materials, and thoughtful design, we
              ensure every product reflects safety, softness, and trust.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We started by talking to women about their real struggles. Many faced
              rashes, leaks, and heavy discomfort during their periods. We knew it was
              time to step up and create a better, softer solution.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We tested the softest cotton and the most advanced leak-proof layers.
              Our goal was to create a pad that keeps you dry, fresh, and happy all day long.
              Today, we are proud to support women everywhere so your period never
              stops you from doing what you love.
            </p>
          </div>

          <div className="relative group overflow-hidden rounded-3xl flex-1 min-h-[400px] md:min-h-full" data-aos="fade-left">
            <div className="absolute inset-0 bg-pink-200 blur-3xl opacity-30 rounded-full group-hover:opacity-50 transition duration-500"></div>

            <div className="relative w-full h-full min-h-[350px] md:min-h-[500px] overflow-hidden rounded-3xl bg-white border border-pink-50 shadow-sm flex items-center justify-center">
              <Image
                src="/15.jpeg"
                alt="Lumora India Journey"
                fill
                className="object-contain p-4 transition duration-700 ease-in-out group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl pointer-events-none"
              ></div>

              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-10">
                <p className="text-lg font-semibold tracking-wide drop-shadow-md">
                  Lumora India
                </p>
                <p className="text-sm text-gray-200 font-medium drop-shadow-md">
                  Comfort • Care • Confidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💖 MISSION */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 sm:p-10 rounded-3xl shadow-lg border border-pink-100" data-aos="zoom-in">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
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
                  <span className="text-pink-500 text-xl shrink-0">✔</span>
                  <span className="text-base sm:text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 leading-tight">
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

      {/* TRUST */}
      <section className="py-16 bg-gradient-to-b from-white to-pink-50">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
              Trusted & <span className="text-pink-500">Empowering Women</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base sm:text-lg">
              Certified safety, premium quality, and a mission to break the
              silence around menstrual health.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-10" data-aos="fade-up" data-aos-delay="100">
            {[
              "Dermatologically Tested",
              "ISO Certified",
              "Chemical Free",
              "Skin Safe Materials",
            ].map((item, i) => (
              <div
                key={i}
                className="group px-5 sm:px-6 py-3 bg-white border border-pink-200 rounded-full 
          text-sm font-semibold text-pink-600 cursor-pointer
          hover:bg-pink-500 hover:text-white hover:scale-105 
          transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ✔ {item}
              </div>
            ))}
          </div>

          <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
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
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="group bg-white p-8 rounded-2xl shadow-sm border border-pink-100 
          hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-5 transition group-hover:scale-110">
                  🌸
                </div>
                <h3 className="font-semibold text-base sm:text-lg text-gray-700 group-hover:text-pink-500 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
                  {item.desc}
                </p>
                <div className="h-[3px] w-0 group-hover:w-full bg-pink-500 transition-all duration-300 mt-4 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SLIDER */}
      <section className="relative py-16 overflow-hidden bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div key={slide.image} data-aos="fade-right" className="w-full flex justify-center md:justify-start">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl h-[350px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-pink-100 bg-pink-50/30 flex items-center justify-center">
              <Image
                src={slide.image}
                alt="women hygiene"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>

          <div key={slide.title} className="space-y-8" data-aos="fade-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 leading-tight">
              {slide.title}
            </h2>

            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
              {slide.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slide.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-pink-50 border border-pink-100 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition font-semibold text-gray-700 flex items-center gap-2 cursor-default"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <span className="text-pink-500">✔</span> {feature}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact-us" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 bg-pink-500 border-2 border-transparent cursor-pointer text-white font-semibold rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-600 hover:scale-105 transition-all">
                  Contact For Order
                </button>
              </Link>
              <Link href="/products" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 cursor-pointer border-2 border-pink-500 text-pink-500 font-semibold rounded-2xl hover:bg-pink-50 hover:scale-105 transition-all">
                  View Products
                </button>
              </Link>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600 transition-all cursor-pointer font-semibold text-xl"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600 transition-all cursor-pointer font-semibold text-xl"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE LUMORA INDIA */}
      <section className="py-16 bg-pink-50">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-14" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700">
              Why Choose <span className="text-pink-500">Lumora India?</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base sm:text-lg">
              Designed for comfort, hygiene and all-day protection.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition hover:-translate-y-1 border border-transparent hover:border-pink-100 cursor-default">
              <div className="text-pink-500 text-4xl mb-4">🛡️</div>
              <h3 className="font-semibold text-lg text-gray-700">Leak Proof Protection</h3>
              <p className="text-gray-600 text-base mt-3 leading-relaxed">
                Advanced absorbent layers keep you dry and protected during heavy flow.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition hover:-translate-y-1 border border-transparent hover:border-pink-100 cursor-default">
              <div className="text-pink-500 text-4xl mb-4">🌸</div>
              <h3 className="font-semibold text-lg text-gray-700">Ultra Soft Comfort</h3>
              <p className="text-gray-600 text-base mt-3 leading-relaxed">
                Soft cotton surface ensures maximum comfort for sensitive skin.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition hover:-translate-y-1 border border-transparent hover:border-pink-100 cursor-default">
              <div className="text-pink-500 text-4xl mb-4">🦠</div>
              <h3 className="font-semibold text-lg text-gray-700">Anti-Bacterial Layer</h3>
              <p className="text-gray-600 text-base mt-3 leading-relaxed">
                Helps prevent bacteria growth and reduces unwanted odour.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition hover:-translate-y-1 border border-transparent hover:border-pink-100 cursor-default">
              <div className="text-pink-500 text-4xl mb-4">💧</div>
              <h3 className="font-semibold text-lg text-gray-700">High Absorption</h3>
              <p className="text-gray-600 text-base mt-3 leading-relaxed">
                Multiple absorbent layers quickly lock in fluid and prevent leakage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition hover:-translate-y-1 border border-transparent hover:border-pink-100 cursor-default">
              <div className="text-pink-500 text-4xl mb-4">🌿</div>
              <h3 className="font-semibold text-lg text-gray-700">Skin Friendly</h3>
              <p className="text-gray-600 text-base mt-3 leading-relaxed">
                Breathable materials keep skin irritation free and comfortable.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition hover:-translate-y-1 border border-transparent hover:border-pink-100 cursor-default">
              <div className="text-pink-500 text-4xl mb-4">📏</div>
              <h3 className="font-semibold text-lg text-gray-700">Extra Long Pads</h3>
              <p className="text-gray-600 text-base mt-3 leading-relaxed">
                Extra coverage gives confidence and protection day and night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROMISE SECTION */}
      <section className="py-16 bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700">
              Our Promise to <span className="text-pink-500">Women</span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
              We are committed to delivering care, comfort, and confidence
              through every product we create.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group bg-pink-50/50 p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 hover:-translate-y-2 cursor-default">
              <div className="text-5xl mb-6 transition group-hover:scale-110">
                💖
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Care & Comfort
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Designed with ultra-soft materials to ensure maximum comfort for
                every woman, every day.
              </p>
            </div>

            <div className="group bg-pink-50/50 p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 hover:-translate-y-2 cursor-default">
              <div className="text-5xl mb-6 transition group-hover:scale-110">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Safety First
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Dermatologically tested and made with skin-friendly materials to
                ensure complete hygiene and protection.
              </p>
            </div>

            <div className="group bg-pink-50/50 p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 hover:-translate-y-2 cursor-default">
              <div className="text-5xl mb-6 transition group-hover:scale-110">
                🌸
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Confidence Everyday
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Helping women stay confident, active, and worry-free during
                every phase of their cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-gray-900 text-white px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight" data-aos="fade-up">
          Because You Deserve Better 💖
        </h2>

        <p className="mt-5 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Switch to Lumora and experience comfort, confidence, and care like never before.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5" data-aos="fade-up" data-aos-delay="200">
          <Link href="/products">
            <button
              className="cursor-pointer w-full sm:w-auto px-7 py-3 border-2 bg-pink-600 text-white rounded-2xl font-semibold text-lg
      hover:scale-105 hover:bg-pink-500 transition-all duration-300 shadow-lg shadow-pink-600/30"
            >
              Shop Now
            </button>
          </Link>

          <Link href="/contact-us">
            <button
              className="cursor-pointer w-full sm:w-auto px-7 py-3 border-2 border-gray-600 text-white rounded-2xl font-semibold text-lg
      hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </button>
          </Link>
        </div>

        <p className="mt-10 text-sm font-semibold text-gray-400 tracking-wide uppercase cursor-default">
          Trusted by 1000+ women across India 🇮🇳
        </p>
      </section>
    </div>
  );
};

export default page;