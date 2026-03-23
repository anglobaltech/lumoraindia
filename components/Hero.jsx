"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Activity,
  ChevronDown,
  Droplets,
  HeartPulse,
  Quote,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

const images = ["/1.png", "/4.jpeg", "/8.jpeg", "/4.jpeg"];

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

// FAQ section
const faqs = [
  {
    id: "1",
    question: "Does it cause rashes?",
    answer:
      "No, Lumora pads are dermatologically tested. They come with an ultra-soft cotton layer that is gentle on the skin and helps minimize the risk of rashes.",
  },
  {
    id: "2",
    question: "How many hours can I use it?",
    answer:
      "It is safe to use one pad for 4–6 hours. During heavy flow, it is recommended to change every 3–4 hours to maintain proper hygiene.",
  },
  {
    id: "3",
    question: "Does it provide leak protection?",
    answer:
      "Yes, it features an advanced absorbent core that quickly locks in liquid and provides reliable protection against side leakage.",
  },
  {
    id: "4",
    question: "Is it safe for sensitive skin?",
    answer:
      "Absolutely, it is specially designed for sensitive skin and offers a comfortable, irritation-free experience.",
  },
  {
    id: "5",
    question: "Is it suitable for heavy flow days?",
    answer:
      "Yes, Lumora pads are designed with high absorbency to handle heavy flow, keeping you dry and protected for longer hours.",
  },
  {
    id: "6",
    question: "Does it have wings for better support?",
    answer:
      "Yes, the pads come with strong adhesive wings that keep them securely in place and prevent shifting or leakage.",
  },
  {
    id: "7",
    question: "Is it easy to carry while traveling?",
    answer:
      "Yes, each pad is individually wrapped, making it hygienic, compact, and easy to carry in your bag while traveling.",
  },
  {
    id: "8",
    question: "Does it control odor?",
    answer:
      "Yes, it is designed with odor-control technology that helps you stay fresh and confident throughout the day.",
  },
];

// benefits
const benefits = [
  {
    icon: <Smile className="w-8 h-8 text-pink-500" />,
    title: "Stay Confident All Day",
    desc: "Feel fresh and confident wherever you go, without worries.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-pink-500" />,
    title: "No Irritation",
    desc: "Soft cotton layer keeps your skin rash-free and comfortable.",
  },
  {
    icon: <Droplets className="w-8 h-8 text-pink-500" />,
    title: "Long-lasting Dryness",
    desc: "Advanced absorption technology keeps you dry for hours.",
  },
  {
    icon: <Activity className="w-8 h-8 text-pink-500" />,
    title: "Freedom to Move",
    desc: "Move freely with leak-proof protection and perfect fit.",
  },
];

// customer reviews

const testimonials = [
  {
    name: "Priya Sharma",
    review:
      "I feel so confident using Lumora. No irritation at all and super soft. Totally love it.",
  },
  {
    name: "Anjali Verma",
    review:
      "Very comfortable and reliable. Works really well for long hours and feels light.",
  },
  {
    name: "Riya Gupta",
    review:
      "Best product I’ve used. I can move freely all day without any tension.",
  },
  {
    name: "Neha Singh",
    review:
      "Good quality and no rashes. It feels very soft and safe for daily use.",
  },
  {
    name: "Sneha Kapoor",
    review: "Super soft and breathable. I barely feel it throughout the day.",
  },
  {
    name: "Pooja Yadav",
    review: "Absorption is great and no leakage issues. Perfect for busy days.",
  },
  {
    name: "Kavya Nair",
    review:
      "Finally something that doesn’t cause itching. Feels premium and safe.",
  },
  {
    name: "Meera Joshi",
    review: "Very comfortable overall. I can wear it for hours without worry.",
  },
  {
    name: "Ishita Malhotra",
    review:
      "No discomfort, no stress. It keeps me fresh and confident all day.",
  },
  {
    name: "Tanvi Arora",
    review:
      "Nice product, soft and reliable. Definitely better than many others I’ve tried.",
  },
];

const sizes = [
  { label: "L", desc: "7 Pads" },
  { label: "XL", desc: "14 Pads" },
  { label: "XXL", desc: "28 Pads" },
];

const priceMap = {
  l: 99,
  xl: 199,
  xxl: 349,
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [size, setSize] = useState("XL");
  const [quantity, setQuantity] = useState(1);

  const basePrice = priceMap[size.toLowerCase()] || 0;

  const totalPrice =
    quantity === 3 ? Math.floor(basePrice * 3 * 0.85) : basePrice;

  const originalPrice =
    quantity === 3 ? basePrice * 3 : Math.floor(basePrice * 1.2);

  const discount =
    quantity === 3
      ? "15% OFF"
      : `${Math.floor(((originalPrice - basePrice) / originalPrice) * 100)}% OFF`;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="bg-white text-gray-800">
      <section className="bg-linear-to-br from-pink-100 via-white to-pink-50 min-h-screen flex items-start pt-16 pb-6">
        <div className="max-w-8xl mx-auto  sm:px-6 grid md:grid-cols-2 gap-25 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-5 md:space-y-6 max-w-xl">
            {/* HEADING */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
              <span className="whitespace-nowrap">Comfort & Confidence</span>
              <span className="text-pink-500 block">Every Day</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
              Lumora India offers premium sanitary solutions crafted with
              breathable cotton layers and advanced absorbent technology for
              all-day comfort and hygiene.
            </p>

            {/* MINI BENEFITS (NEW - COMPACT) */}
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              {[
                "Ultra Thin",
                "Odor Control",
                "Skin Friendly",
                "High Absorbency",
              ].map((item, i) => (
                <span
                  key={i}
                  className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/products"
                className="bg-pink-500 text-white px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-pink-600 hover:scale-105 transition"
              >
                Shop Now
              </Link>

              <Link
                href="/about-us"
                className="border border-pink-500 text-pink-500 px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold hover:bg-pink-100 hover:scale-105 transition"
              >
                Learn More
              </Link>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2">
              {[
                "Dermatologically Tested",
                "100% Rash Free",
                "Leak Protection",
                "Breathable Cotton Layer",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  ✔ {item}
                </div>
              ))}
            </div>

            {/* TRUST STRIP (NEW - SMALL & CLEAN) */}
            <div className="flex flex-wrap gap-3 pt-2 text-xs text-gray-500">
              <span className="bg-white px-3 py-1 rounded-full shadow-sm">
                ISO Certified
              </span>
              <span className="bg-white px-3 py-1 rounded-full shadow-sm">
                100% Safe
              </span>
              <span className="bg-white px-3 py-1 rounded-full shadow-sm">
                Made in India
              </span>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-6 pt-3">
              {[
                { value: "10K+", label: "Customers" },
                { value: "99%", label: "Protection" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <h3 className="text-lg sm:text-xl font-bold text-pink-500 group-hover:scale-110 transition">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE SLIDER */}
          <div className="flex justify-center mt-6 md:mt-0">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-65 sm:h-80 md:h-105">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-pink-400/10 blur-xl rounded-full" />

              <Swiper
                modules={[Autoplay, EffectFade]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                effect="fade"
                loop={true}
                className="h-full rounded-2xl"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative bg-white h-full rounded-2xl shadow-md flex items-center justify-center p-4">
                      <Image src={img} alt="Product" fill />

                      {/* Badge */}
                      <div className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow">
                        Bestseller
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-pink-50 py-10">
        <div className="max-w-7xl mx-auto px-6  sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-3xl pb-1 font-bold text-gray-800">
              About <span className="text-pink-500">Lumora India</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-4 max-w-5xl mx-auto">
              Lumora India is dedicated to empowering women with high-quality
              sanitary hygiene products designed for comfort, protection, and
              confidence. Our mission is to provide safe, reliable, and
              affordable menstrual care solutions for every woman.
            </p>
          </div>

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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Why Choose{" "}
              <span className="text-pink-500 italic">Lumora India</span>
            </h2>
            <h2 className="text-blue-600 font-bold italic py-2 text-2xl">
              Organic Sanitary Napkin
            </h2>

            <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-lg">
              Lumora India provides premium women hygiene products designed for
              comfort, protection, and confidence during every stage of your
              day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 cursor-pointer lg:grid-cols-4 gap-10">
            {features.map((item, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 150}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-3"
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
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800">
              Our Products
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-base md:text-md">
              Discover Lumora&apos;s range of high-quality sanitary napkins
              designed for comfort, protection, and confidence throughout the
              day.
            </p>
          </div>

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
          <section className="py-10 ">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
              <div className="relative">
                <div className="bg-white rounded-3xl p-6 shadow-xl">
                  <Image
                    src="/product.jpeg"
                    alt="product-image"
                    height={200}
                    width={200}
                    className="rounded-2xl w-full object-cover"
                  />
                </div>

                <span className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-1 rounded-full text-xs shadow">
                  BEST SELLER
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
                  Ultra Thin Sanitary Pads
                </h2>

                <p className="text-gray-500">
                  Soft. Rash-free. Designed for all-day comfort.
                </p>

                <div className="flex items-center gap-2 text-orange-500 text-sm">
                  ⭐⭐⭐⭐⭐{" "}
                  <span className="text-gray-500">1,000+ Reviews</span>
                </div>

                <div className="mt-5">
                  <p className="font-sm mb-1">Select Size</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sizes.map((s, i) => (
                      <div
                        key={i}
                        onClick={() => setSize(s.label.trim())}
                        className={`cursor-pointer rounded-xl text-center border transition-all duration-200
                    ${
                      size === s.label
                        ? "border-pink-500 bg-pink-50"
                        : "hover:border-gray-400"
                    }`}
                      >
                        <p className="font-semibold">{s.label}</p>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-1">
                  <p className="font-medium mb-3">Select Quantity</p>

                  <div className="flex gap-3">
                    {[1, 3].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuantity(q)}
                        className={`px-4 py-2 rounded-full border transition
                    ${
                      quantity === q
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-white text-gray-700 hover:border-pink-400"
                    }`}
                      >
                        {q} Pack {q === 3 && "'s"}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-3xl font-bold text-gray-900">
                  ₹{totalPrice}
                </p>

                <p className="line-through text-gray-400">₹{originalPrice}</p>

                <span className="text-green-600 font-medium text-sm">
                  {discount}
                </span>

                <div className="mt-2 flex gap-4">
                  <button className="w-1/4 border border-gray-300 py-3 rounded-full text-gray-800 hover:bg-gray-100 transition">
                    Add to Cart
                  </button>

                  <button className="w-1/5 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full shadow-md transition">
                    Buy Now
                  </button>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <p>💧 Leak-proof</p>
                  <p>🌿 Rash-free</p>
                  <p>🚫 No fragrance</p>
                  <p>🧪 Chemical free</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* benefit section */}
      <section className="bg-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Why You&apos;ll Love{" "}
              <span className="text-pink-500 italic">Lumora India</span>
            </h2>
            <p className="text-white mt-3 text-md">
              Comfort, protection, and confidence — all in one.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group"
              >
                <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-pink-100 group-hover:bg-pink-200 transition">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-linear-to-r from-pink-50 to-pink-100 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Frequently Asked <span className="text-pink-500">Questions</span>
            </h2>
            <p className="text-gray-600 mt-3 text-md">
              Clear your common doubts — feel confident & safe
            </p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-2xl shadow-md  border-2 border-pink-100 transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex cursor-pointer items-center gap-4 p-3 text-left"
                >
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold">
                    {faq.id}
                  </span>

                  <h3 className="flex-1 text-base sm:text-lg font-semibold text-gray-800 leading-tight">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`shrink-0 transition-transform duration-300 ${
                      activeIndex === index
                        ? "rotate-180 text-pink-500"
                        : "text-gray-400"
                    }`}
                    size={20}
                  />
                </button>

                <div
                  className={`px-5  overflow-hidden border-t border-gray-300 transition-all duration-300 ${
                    activeIndex === index
                      ? "max-h-40 py-3 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600   leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* customer reviews */}

      <section className="py-20 bg-linear-to-b from-pink-50 via-white to-pink-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-" data-aos="fade-up">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
              Experience <span className="text-pink-500">Loved</span> & Trusted
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              See why women trust Lumora for soft, leak-proof protection,
              all-day comfort, and irritation-free periods.
            </p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, index) => {
              const firstLetter = item.name.charAt(0);

              return (
                <SwiperSlide key={index}>
                  <div
                    data-aos="zoom-in"
                    className="h-full backdrop-blur-lg bg-white/70 border my-10 border-pink-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-500"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-200 text-pink-700 font-bold text-lg">
                        {firstLetter}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <span className="text-xs text-green-600 font-medium">
                          ✔ Verified Purchase
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {item.review}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Hero;
