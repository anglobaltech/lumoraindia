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
          src="/bg.jpeg"
          alt="About Lumora India"
          fill
          priority
          className="object-cover object-top"
        />
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
              At{" "}
              <span className="font-semibold text-pink-500">Lumora India</span>,
              our mission is to provide women with safe, comfortable, and
              reliable menstrual care products. We are committed to designing
              sanitary napkins that offer superior protection, skin-friendly
              materials, and long-lasting comfort so women can live confidently
              every day.
            </p>

            <p className="mt-4 text-gray-600  leading-relaxed">
              We believe that every woman deserves access to hygienic and
              affordable feminine care. Through innovation, quality, and
              awareness, we strive to make menstrual health simple, safe, and
              empowering for women across India.
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

      <section className="relative py-16  overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
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

      <section className="py-16">
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
      <section className="py-20 bg-linear-to-r from-pink-50 via-white to-pink-50">
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

          {/* Bottom Highlight */}
          <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-lg text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Because Every Woman Deserves the Best
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At{" "}
              <span className="text-pink-500 font-semibold">Lumora India</span>,
              we believe in empowering women with products that combine
              innovation, comfort, and trust — so you can focus on living your
              life without limits.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Women Say
            </h2>
            <p className="text-gray-600 mt-3">
              Real experiences from women who trust Lumora India
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                “Finally found a product that is super comfortable and
                completely rash-free. I can go all day without worry!”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center font-bold text-pink-600">
                  A
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Anjali Sharma
                  </h4>
                  <span className="text-xs text-gray-500">Delhi</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                “The absorbency is amazing and I feel fresh even during heavy
                flow days. Highly recommended!”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center font-bold text-pink-600">
                  P
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Priya Verma
                  </h4>
                  <span className="text-xs text-gray-500">Mumbai</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                “Soft, safe, and perfect fit. Lumora has truly changed my
                experience during periods.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center font-bold text-pink-600">
                  N
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Neha Gupta
                  </h4>
                  <span className="text-xs text-gray-500">Bangalore</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Join thousands of women who trust Lumora India
            </p>
            <Link href="/products">
              <button className="bg-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-pink-600 hover:scale-105 transition">
                Explore Products
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
