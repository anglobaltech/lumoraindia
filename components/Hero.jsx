"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Activity, ChevronDown, Droplets, HeartPulse, ShieldCheck, Smile, Sparkles, Zap,
  ShoppingCart, Ruler, Minus, Plus, Heart, Star, CheckCircle
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { toast } from "react-toastify";

// Global Store & Components
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import PincodeChecker from "./PincodeChecker";
import { doc, updateDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

const images = ["/1.png", "/4.jpeg", "/8.jpeg", "/4.jpeg"];

// Why choose lumora india
const features = [
  { icon: <ShieldCheck size={42} />, title: "Advanced Leak Protection", desc: "Lumora sanitary napkins use multi-layer absorbent technology to prevent leakage and keep you dry and comfortable throughout the day." },
  { icon: <HeartPulse size={42} />, title: "Skin Friendly Cotton", desc: "Soft breathable cotton surface protects sensitive skin and ensures irritation-free comfort during long hours of use." },
  { icon: <Droplets size={42} />, title: "High Absorbency Core", desc: "Deep absorbent layers quickly lock moisture and help maintain hygiene while preventing odor and wetness." },
  { icon: <Sparkles size={42} />, title: "Trusted Hygiene Quality", desc: "Lumora India focuses on premium women's hygiene products designed for safety, comfort and confidence every day." },
];

// Benefits
const benefits = [
  { icon: <Smile className="w-8 h-8 text-pink-500" />, title: "Stay Confident All Day", desc: "Feel fresh and confident wherever you go, without worries." },
  { icon: <ShieldCheck className="w-8 h-8 text-pink-500" />, title: "No Irritation", desc: "Soft cotton layer keeps your skin rash-free and comfortable." },
  { icon: <Droplets className="w-8 h-8 text-pink-500" />, title: "Long-lasting Dryness", desc: "Advanced absorption technology keeps you dry for hours." },
  { icon: <Activity className="w-8 h-8 text-pink-500" />, title: "Freedom to Move", desc: "Move freely with leak-proof protection and perfect fit." },
];

// Customer reviews
const testimonials = [
  { name: "Priya Sharma", review: "I feel so confident using Lumora. No irritation at all and super soft. Totally love it." },
  { name: "Anjali Verma", review: "Very comfortable and reliable. Works really well for long hours and feels light." },
  { name: "Riya Gupta", review: "Best product I’ve used. I can move freely all day without any tension." },
  { name: "Neha Singh", review: "Good quality and no rashes. It feels very soft and safe for daily use." },
  { name: "Sneha Kapoor", review: "Super soft and breathable. I barely feel it throughout the day." },
  { name: "Pooja Yadav", review: "Absorption is great and no leakage issues. Perfect for busy days." },
  { name: "Kavya Nair", review: "Finally something that doesn’t cause itching. Feels premium and safe." },
  { name: "Meera Joshi", review: "Very comfortable overall. I can wear it for hours without worry." },
  { name: "Ishita Malhotra", review: "No discomfort, no stress. It keeps me fresh and confident all day." },
  { name: "Tanvi Arora", review: "Nice product, soft and reliable. Definitely better than many others I’ve tried." },
];

// --- MAIN PRODUCT DATA ---
const MAIN_PRODUCT = {
  id: "lumora-premium-pads",
  name: "Lumora Premium Soft Pads",
  description: "Experience ultra-thin, rash-free protection for your active days. Made with a 100% organic cotton top sheet and advanced leak-lock technology.",
  sizes: ["M", "L", "XL", "XXL"],
  images: [
    "/12.jpeg",
    "/product2.jpeg",
    "/8.jpeg",
    "/13.jpeg",
    "/lumora2.jpeg",
    "/11.jpeg"
  ]
};

const PRICE_MAP = { m: 89, l: 99, xl: 199, xxl: 349 };

const Hero = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);

  // STRICTLY DYNAMIC: Initialized as empty array so section collapses if no FAQs exist
  const [dynamicFaqs, setDynamicFaqs] = useState([]);

  // --- REAL CART & PRODUCT STATE ---
  const { cartItems, addToCart, updateQuantity } = useCartStore();
  const { user } = useAuthStore();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedPack, setSelectedPack] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [loadingIds, setLoadingIds] = useState(new Set());

  // Image Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Dynamic Pricing Logic
  const basePrice = PRICE_MAP[selectedSize.toLowerCase()] || 89;
  const getDiscountTier = (q) => {
    if (q === 7) return 0.75;
    if (q === 5) return 0.80;
    if (q === 3) return 0.85;
    return 1;
  };

  const discountMultiplier = getDiscountTier(selectedPack);
  const originalPrice = selectedPack === 1 ? Math.floor(basePrice * 1.2) : basePrice * selectedPack;
  const totalPrice = selectedPack === 1 ? basePrice : Math.floor(basePrice * selectedPack * discountMultiplier);
  const discount = selectedPack === 1
    ? `${Math.floor(((originalPrice - basePrice) / originalPrice) * 100)}% OFF`
    : `${Math.round((1 - discountMultiplier) * 100)}% OFF`;

  // Cart Status Check
  const cartItem = cartItems.find(item => item.id === MAIN_PRODUCT.id && item.size === selectedSize && item.pack === selectedPack);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Fetch Live FAQs from Firebase
  useEffect(() => {
    const fetchLiveFaqs = async () => {
      try {
        const faqsRef = collection(db, "faqs");
        let querySnapshot;

        try {
          // Attempt to fetch ordered by date
          const q = query(faqsRef, orderBy("createdAt", "asc"));
          querySnapshot = await getDocs(q);
        } catch (indexError) {
          // Fallback if index isn't ready
          querySnapshot = await getDocs(faqsRef);
        }

        // Filter out empty docs
        const fetchedFaqs = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(faq => faq.question && faq.answer);

        setDynamicFaqs(fetchedFaqs);
      } catch (error) {
        console.error("Error fetching live FAQs:", error);
        setDynamicFaqs([]);
      }
    };

    fetchLiveFaqs();
  }, []);

  // Handlers
  const handleAddToCart = () => {
    const productToAdd = { ...MAIN_PRODUCT, price: totalPrice, originalPrice: originalPrice, image: MAIN_PRODUCT.images[0] };
    addToCart(productToAdd, selectedSize, selectedPack, 1);
    toast.success(`Added ${selectedPack} Pack of Size ${selectedSize} to cart!`, { position: "top-right", autoClose: 2000 });
  };

  // const handleBuyNow = () => {
  //   if (quantityInCart === 0) handleAddToCart();
  //   router.push("/checkout"); 
  // };

  const handleBuyNow = () => {
    console.log("handleBuyNow called, redirecting to cart");
    if (quantityInCart === 0) {
      handleAddToCart();
    }
    // FIXED: Now correctly redirects to Cart page instead of checkout or home
    try {
      router.push("/cart");
    } catch (error) {
      console.error("Router push failed:", error);
      window.location.href = "/cart";
    }
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // --- WISHLIST LOGIC ---
  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }

    if (loadingIds.has(product.id)) return;
    setLoadingIds(prev => new Set(prev).add(product.id));

    try {
      const userRef = doc(db, "users", user.uid);
      let updatedWishlist = user.wishlist ? [...user.wishlist] : [];
      const isInWishlist = updatedWishlist.some(item => item.id === product.id);

      if (isInWishlist) {
        updatedWishlist = updatedWishlist.filter(item => item.id !== product.id);
        toast.info("Removed from wishlist");
      } else {
        updatedWishlist.push({
          id: product.id,
          name: product.name,
          image: product.images[0] || "/12.jpeg",
          price: product.price || 89
        });
        toast.success("Added to wishlist! ❤️");
      }

      await updateDoc(userRef, { wishlist: updatedWishlist });
      useAuthStore.setState({ user: { ...user, wishlist: updatedWishlist } });

    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const scrollToReviews = () => {
    const section = document.getElementById("customer-reviews");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Smoother AOS settings for better scroll performance
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50
    });
  }, []);

  return (
    <div className="bg-white text-gray-800">

      {/* 1. TOP HERO SECTION 
          FIXED: Reduced padding from pt-32 to pt-8/pt-12 to create exactly a 1-1.5cm gap below the sticky navbar. */}
      <section className="bg-gradient-to-br from-pink-100 via-white to-pink-50 w-full pt-8 lg:pt-12 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 grid lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">

          {/* LEFT SIDE: Text and Stats */}
          <div className="space-y-4 sm:space-y-5 w-full relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-pink-100 text-pink-600 text-[10px] sm:text-xs font-bold w-fit animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-pink-500"></span>
              </span>
              India's #1 Organic Hygiene Brand
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              <span className="block">Comfort & Confidence</span>
              <span className="text-pink-500 block mt-1">Every Single Day</span>
            </h1>

            <div className="text-gray-600 text-base sm:text-lg xl:text-xl leading-relaxed max-w-lg xl:max-w-xl space-y-2">
              <p>Lumora India offers premium sanitary pads made with breathable cotton and advanced leak-proof technology.</p>
              <p className="hidden sm:block">We know that your period days can be hard. That is why our pads are made to be super soft and safe for your skin. They lock the wetness away instantly, so you stay dry and fresh all day long.</p>
              <p className="font-medium text-pink-600">Move freely, sleep peacefully, and forget about leaks and rashes!</p>
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs font-semibold pt-1">
              {["Ultra Thin", "Odor Control", "Skin Friendly", "High Absorbency"].map((item, i) => (
                <span key={i} className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 text-gray-700 cursor-default">{item}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-3">
              <Link href="/products" className="bg-pink-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold shadow-md shadow-pink-200 hover:bg-pink-700 hover:scale-105 transition-all cursor-pointer">
                Shop Now
              </Link>
              <Link href="/about-us" className="bg-white text-gray-900 border border-gray-200 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold hover:bg-gray-50 hover:border-gray-300 hover:scale-105 transition-all cursor-pointer shadow-sm">
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm pt-4">
              {["Dermatologically Tested", "100% Rash Free", "Leak Protection", "Breathable Cotton Layer"].map((item, i) => (
                <div key={i} className="bg-white px-3 py-2.5 rounded-xl shadow-sm border border-gray-50 hover:shadow-md hover:-translate-y-0.5 transition cursor-default font-semibold text-gray-700 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500 shrink-0" /> {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-10 xl:gap-12 pt-6 border-t border-gray-100 mt-6">
              {[
                { value: "50K+", label: "Happy Women" },
                { value: "100%", label: "Organic Cotton" },
                { value: "4.9/5", label: "Average Rating" },
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <h3 className="text-xl sm:text-2xl xl:text-3xl font-black text-gray-900 group-hover:text-pink-600 transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Image Slider & bg2.jpg */}
          <div className="flex flex-col items-center lg:items-end relative w-full mt-10 lg:mt-0">
            <div className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-lg xl:max-w-[500px] h-[280px] sm:h-[360px] lg:h-[400px] xl:h-[440px]">

              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-purple-200 blur-3xl rounded-full opacity-40 transform scale-95" />

              <Swiper
                modules={[Autoplay, EffectFade]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                effect="fade"
                loop={true}
                className="h-full rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl cursor-grab active:cursor-grabbing border-4 border-white relative z-10"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative bg-white h-full flex items-center justify-center p-3">
                      <Image src={img} alt="Product" fill className="object-contain p-4" />
                      <div className="absolute top-4 left-4 bg-pink-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                        Bestseller
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                onClick={scrollToReviews}
                className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-2.5 sm:p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-20 flex items-center gap-3 border border-gray-100 w-max cursor-pointer hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 delay-300"
              >
                <div className="flex -space-x-2 shrink-0">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">P</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">A</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">S</div>
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-extrabold text-gray-900 whitespace-nowrap">Loved by Thousands</p>
                  <div className="flex text-yellow-400 mt-0.5 gap-0.5">
                    <Star size={12} className="fill-yellow-400" />
                    <Star size={12} className="fill-yellow-400" />
                    <Star size={12} className="fill-yellow-400" />
                    <Star size={12} className="fill-yellow-400" />
                    <Star size={12} className="fill-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-10 relative w-full max-w-[320px] sm:max-w-md lg:max-w-lg xl:max-w-[500px] h-[120px] sm:h-[140px] xl:h-[160px] rounded-2xl overflow-hidden shadow-sm border border-pink-100 group flex items-center justify-center bg-white/40 backdrop-blur-sm">
              <Image
                src="/bg2.jpg"
                alt="Lumora Comfort"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-700 p-2"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="bg-pink-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl pb-1 font-bold text-gray-800">
              About <span className="text-pink-500">Lumora India</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-4 max-w-5xl mx-auto leading-relaxed">
              Lumora India is dedicated to empowering women with high-quality sanitary hygiene products designed for comfort, protection, and confidence. Our mission is to provide safe, reliable, and affordable menstrual care solutions for every woman.
            </p>
          </div>
          <div className="grid md:grid-cols-2 mt-16 items-center gap-10">
            <div className="flex justify-center md:justify-start">
              <Image src="/2.png" alt="Lumora Sanitary Napkins" height={400} width={400} className="w-full max-w-sm md:max-w-md border border-gray-200 rounded-3xl shadow-lg object-contain bg-white" />
            </div>
            <div>
              <h3 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Our Lumora India Commitment
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                At Lumora India, we believe menstrual hygiene should be comfortable, reliable, and accessible to every woman. Our products are designed with advanced absorbent technology that ensures long-lasting protection and comfort throughout the day.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                We focus on innovation, quality materials, and eco-friendly practices to create products that not only support women&apos;s health but also care for the environment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Superior Comfort", desc: "Soft materials designed for daily comfort." },
                  { title: "High Protection Safety", desc: "Advanced absorbent technology for safety." },
                  { title: "Skin Friendly", desc: "Dermatologically safe materials." },
                  { title: "Eco Conscious", desc: "Sustainable and responsible production." },
                ].map((item) => (
                  <div key={item.title} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default border border-gray-100">
                    <h4 className="font-bold text-pink-600 text-base">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE LUMORA INDIA */}
      <section className="relative py-20 bg-pink-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Choose <span className="text-pink-500 italic">Lumora India</span>
            </h2>
            <h3 className="text-blue-600 font-bold italic mt-2 text-xl md:text-2xl">Organic Sanitary Napkin</h3>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Lumora India provides premium women hygiene products designed for comfort, protection, and confidence during every stage of your day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div key={index} data-aos="zoom-in" data-aos-delay={index * 100} className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-500 hover:-translate-y-2 cursor-default">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex justify-center mb-6 text-pink-500 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="relative z-10 text-xl font-bold text-gray-800 mb-3 text-center">{item.title}</h3>
                <p className="relative z-10 text-gray-600 text-sm text-center leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE WORKING PRODUCT SHOWCASE */}
      <section className="py-20 bg-white flex items-center border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Explore Our <span className="text-pink-500">Comfort Collection</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              Discover Lumora&apos;s range of high-quality sanitary napkins designed for comfort, protection, and confidence throughout the day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 text-center">
            {[
              { title: "Ultra Absorbent", desc: "Keeps you dry for longer hours." },
              { title: "Rash Free", desc: "Soft breathable cotton layer." },
              { title: "Leak Protection", desc: "Strong side barrier protection." },
              { title: "Skin Friendly", desc: "Safe for sensitive skin." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-pink-50/50 border border-pink-100 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default">
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">{feature.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-100 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 lg:gap-16" data-aos="fade-up">

            <div className="w-full md:w-1/2 flex flex-col gap-5 relative">
              <div className="relative w-full aspect-square md:h-[500px] bg-pink-50 rounded-3xl overflow-hidden flex items-center justify-center border border-pink-100/50">
                <Image
                  src={MAIN_PRODUCT.images[activeImageIndex]}
                  alt={MAIN_PRODUCT.name}
                  fill
                  className="object-contain p-8 transition-opacity duration-300 drop-shadow-md"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(MAIN_PRODUCT);
                  }}
                  disabled={loadingIds.has(MAIN_PRODUCT.id)}
                  className={`absolute top-5 right-5 p-3.5 rounded-full bg-white shadow-lg transition-all transform hover:scale-110 cursor-pointer z-10 ${loadingIds.has(MAIN_PRODUCT.id) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  <Heart
                    size={24}
                    className={`transition-colors ${user?.wishlist?.some(item => item.id === MAIN_PRODUCT.id)
                        ? "text-pink-500 fill-pink-500"
                        : "text-gray-400 hover:text-pink-500"
                      }`}
                  />
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {MAIN_PRODUCT.images.map((img, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveImageIndex(idx)}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 snap-start rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${activeImageIndex === idx
                        ? "border-pink-600 ring-4 ring-pink-100"
                        : "border-gray-100 hover:border-pink-300"
                      }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col space-y-6 justify-center">
              <div>
                <span className="bg-pink-100 text-pink-600 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">Bestseller</span>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-5 tracking-tight">{MAIN_PRODUCT.name}</h3>
                <p className="text-gray-500 mt-3 text-lg leading-relaxed">{MAIN_PRODUCT.description}</p>
              </div>

              <div className="flex items-end gap-3 border-b border-gray-100 pb-5">
                <span className="text-4xl font-black text-pink-600">₹{totalPrice}</span>
                <span className="text-xl text-gray-400 line-through mb-1">₹{originalPrice}</span>
                <span className="text-sm font-bold text-emerald-600 mb-1.5 border border-emerald-200 bg-emerald-50 px-2.5 py-1 rounded-lg">{discount}</span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-gray-900">Select Size: <span className="text-pink-600">{selectedSize}</span></p>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-sm text-pink-600 flex items-center gap-1.5 hover:underline font-bold cursor-pointer bg-pink-50 px-3 py-1.5 rounded-lg"
                  >
                    <Ruler size={16} /> Size Guide
                  </button>
                </div>
                <div className="flex gap-3">
                  {MAIN_PRODUCT.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-2xl font-black text-lg border-2 transition-all cursor-pointer ${selectedSize === size
                          ? "border-pink-600 bg-pink-50 text-pink-600 shadow-sm scale-105"
                          : "border-gray-200 text-gray-500 hover:border-pink-300 hover:bg-pink-50/50"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-900 mb-3">Select Pack <span className="text-xs text-emerald-600 font-bold ml-1 bg-emerald-50 px-2 py-0.5 rounded">(Save More!)</span></p>
                <div className="flex flex-wrap gap-3">
                  {[1, 3, 5, 7].map((pack) => (
                    <button
                      key={pack}
                      onClick={() => setSelectedPack(pack)}
                      className={`px-5 py-2.5 rounded-xl border-2 font-bold transition-all cursor-pointer ${selectedPack === pack
                          ? "border-pink-600 bg-pink-600 text-white shadow-md shadow-pink-200"
                          : "border-gray-200 text-gray-600 bg-white hover:border-pink-300 hover:bg-pink-50"
                        }`}
                    >
                      {pack} Pack
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-2">
                <PincodeChecker />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                {quantityInCart > 0 ? (
                  <div className="flex-1 flex items-center justify-between border-2 border-pink-600 rounded-xl px-4 py-3 bg-pink-50">
                    <button
                      onClick={() => updateQuantity(MAIN_PRODUCT.id, selectedSize, selectedPack, -1)}
                      className="w-12 h-12 flex items-center justify-center bg-white border border-pink-200 rounded-xl text-pink-600 hover:bg-pink-100 transition shadow-sm cursor-pointer"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="font-black text-2xl text-gray-900">{quantityInCart}</span>
                    <button
                      onClick={() => updateQuantity(MAIN_PRODUCT.id, selectedSize, selectedPack, 1)}
                      className="w-12 h-12 flex items-center justify-center bg-white border border-pink-200 rounded-xl text-pink-600 hover:bg-pink-100 transition shadow-sm cursor-pointer"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1 cursor-pointer"
                  >
                    <ShoppingCart size={22} /> Add to Cart
                  </button>
                )}

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:from-pink-700 hover:to-pink-600 transition-all shadow-xl shadow-pink-200 hover:-translate-y-1 cursor-pointer"
                >
                  <Zap size={22} fill="currentColor" /> Buy Now
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Benefits of Using <span className="text-pink-500">Lumora</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 hover:-translate-y-2 cursor-default">
                <div className="mb-6 p-4 bg-pink-50 rounded-2xl text-pink-500">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="customer-reviews" className="py-20 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-14">What Our <span className="text-pink-500">Customers Say</span></h2>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12 cursor-grab active:cursor-grabbing"
          >
            {testimonials.map((testi, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-pink-50/50 p-8 rounded-3xl border border-pink-100 text-left h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-yellow-400 mb-5">
                      <Star size={18} className="fill-yellow-400" />
                      <Star size={18} className="fill-yellow-400" />
                      <Star size={18} className="fill-yellow-400" />
                      <Star size={18} className="fill-yellow-400" />
                      <Star size={18} className="fill-yellow-400" />
                    </div>
                    <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{testi.review}"</p>
                  </div>
                  <h4 className="font-bold text-gray-900">- {testi.name}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 7. UPGRADED & DYNAMIC FAQ SECTION - Renders ONLY if DB has FAQs */}
      {dynamicFaqs.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-white to-pink-50/30 relative overflow-hidden border-t border-gray-100">

          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-100/40 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/40 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10" data-aos="fade-up">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Frequently Asked <span className="text-pink-600">Questions</span>
              </h2>
              <p className="mt-4 text-gray-500 font-medium text-lg">
                Clear your common doubts — feel confident & safe.
              </p>
            </div>

            <div className="space-y-5">
              {dynamicFaqs.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={faq.id || index}
                    className={`group bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm ${isActive ? "border-pink-300 shadow-pink-100 shadow-lg" : "border-pink-50 hover:border-pink-200 hover:shadow-md"
                      }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center transition cursor-pointer"
                    >
                      <span className={`pr-4 font-bold text-base sm:text-lg transition-colors duration-300 flex items-center gap-3 ${isActive ? 'text-pink-600' : 'text-gray-800 group-hover:text-pink-500'}`}>
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${isActive ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-600'}`}>Q</span>
                        {faq.question}
                      </span>
                      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-pink-50' : 'bg-gray-50 group-hover:bg-pink-50'}`}>
                        <ChevronDown className={`transition-transform duration-500 ${isActive ? "rotate-180 text-pink-600" : "text-gray-400 group-hover:text-pink-500"}`} size={20} />
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                        <div className="pt-5 border-t border-gray-100 flex gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm bg-blue-50 text-blue-500 font-bold">A</span>
                          <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-1">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SIZE CHART MODAL */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Ruler className="text-pink-600" /> Size Guide
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest">
                    <th className="p-4 border-b border-r border-gray-200">Size</th>
                    <th className="p-4 border-b border-r border-gray-200">Length (mm)</th>
                    <th className="p-4 border-b border-gray-200">Length (inch)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-medium">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900 border-r border-gray-100">M</td>
                    <td className="p-4 border-r border-gray-100">240 mm</td>
                    <td className="p-4">9.4"</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-gray-50/50">
                    <td className="p-4 font-bold text-gray-900 border-r border-gray-100">L</td>
                    <td className="p-4 border-r border-gray-100">280 mm</td>
                    <td className="p-4">11.0"</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900 border-r border-gray-100">XL</td>
                    <td className="p-4 border-r border-gray-100">320 mm</td>
                    <td className="p-4">12.6"</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900 border-r border-gray-100">XXL</td>
                    <td className="p-4 border-r border-gray-100">360 mm</td>
                    <td className="p-4">14.1"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs font-bold text-gray-400 mt-5 text-center uppercase tracking-wider">Measure for your ideal flow and comfort fit.</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Hero;