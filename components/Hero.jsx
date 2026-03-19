"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Activity, ChevronDown, Droplets, HeartPulse, Quote, ShieldCheck, Smile, Sparkles, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";


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
    review:
      "Super soft and breathable. I barely feel it throughout the day.",
  },
  {
    name: "Pooja Yadav",
    review:
      "Absorption is great and no leakage issues. Perfect for busy days.",
  },
  {
    name: "Kavya Nair",
    review:
      "Finally something that doesn’t cause itching. Feels premium and safe.",
  },
  {
    name: "Meera Joshi",
    review:
      "Very comfortable overall. I can wear it for hours without worry.",
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




const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);


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

          <div className="space-y-8 pl-10">

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

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-pink-500 text-white px-7 py-3 rounded-lg font-semibold shadow-md hover:bg-pink-600 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                View Products
              </Link>

              <Link
                href="/about-us"
                className="border border-pink-500 text-pink-500 px-7 py-3 rounded-lg font-semibold hover:bg-pink-200 hover:shadow-md hover:-translate-y-1 transition duration-300"
              >
                Learn More
              </Link>
            </div>

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

          <div className="relative flex justify-center">

            <div
              className="relative bg-white p-8 rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-500 group"
            >
              <Image
                src="/1.png"
                alt="Lumora Sanitary Napkins"
                width={420}
                height={420}
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute -top-4 -left-4 bg-pink-500 text-white text-xs px-4 py-1 rounded-full shadowgroup-hover:scale-110 transition">
                Bestseller
              </div>

            </div>

          </div>

        </div>
      </section>
      {/* About Section */}
      <section className="bg-pink-50 py-10">
        <div className="max-w-7xl mx-auto px-6  sm:px-8 lg:px-12">

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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Our Products
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-base md:text-lg">
              Discover Lumora&apos;s range of high-quality sanitary napkins designed
              for comfort, protection, and confidence throughout the day.
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
                <div className="flex justify-center mb-4">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    height={200}
                    width={200}
                    className="h-44 w-full object-contain group-hover:scale-110 cursor-pointer transition duration-300"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm text-center mt-2 flex-1">
                  {product.desc}
                </p>

                <div className="flex justify-center mt-5">
                  <Link href="/products">
                    <button className="bg-pink-500 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-pink-600 hover:shadow-md transition">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* benefit section */}
      <section className="bg-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why You&apos;ll Love <span className="text-pink-500 italic">Lumora India</span>
            </h2>
            <p className="text-white mt-3 text-lg">
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

                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* FAQ Section */}
      <section className="bg-linear-to-r from-pink-50 to-pink-100 py-16 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
              Frequently Asked <span className="text-pink-500">Questions</span>
            </h2>
            <p className="text-gray-600 mt-3">
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
                    className={`shrink-0 transition-transform duration-300 ${activeIndex === index
                      ? "rotate-180 text-pink-500"
                      : "text-gray-400"
                      }`}
                    size={20}
                  />
                </button>

                <div
                  className={`px-5  overflow-hidden border-t border-gray-300 transition-all duration-300 ${activeIndex === index
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Experience <span className="text-pink-500">Loved</span>  & Trusted
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              See why women trust Lumora for soft, leak-proof protection, all-day comfort, and irritation-free periods.
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
