"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { Menu, X, ShoppingCart, User, Globe } from "lucide-react";

// Global Stores
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

// Login Modal
import LoginModal from "./LoginModal";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const pathname = usePathname();

  // Get global state
  const cartItems = useCartStore((state) => state.cartItems);
  const user = useAuthStore((state) => state.user); 
  
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // --- LANGUAGE TRANSLATION LOGIC ---
  const allLanguages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "bn", name: "বাংলা (Bengali)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "ml", name: "മലയാളം (Malayalam)" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
    { code: "as", name: "অসমীয়া (Assamese)" },
    { code: "ur", name: "اردو (Urdu)" },
    { code: "sa", name: "संस्कृतम् (Sanskrit)" },
    { code: "mai", name: "मैथिली (Maithili)" },
    { code: "bho", name: "भोजपुरी (Bhojpuri)" },
    { code: "sd", name: "سنڌي (Sindhi)" },
    { code: "ne", name: "नेपाली (Nepali)" },
    { code: "es", name: "Español (Spanish)" },
    { code: "fr", name: "Français (French)" },
    { code: "ar", name: "العربية (Arabic)" }
  ];

  const handleLanguageChange = (langCode) => {
    // 1. Delete existing cookies to prevent conflicts
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
    
    // 2. Set the new language cookie
    if (langCode !== "en") {
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      document.cookie = `googtrans=/en/${langCode}; domain=.${window.location.hostname}; path=/`;
    }

    // 3. Hard reload to apply the translation
    window.location.reload();
  };
  // ----------------------------------

  // Distraction-free Cart & Profile Pages
  if (pathname === '/cart' || pathname.startsWith('/profile')) {
    return null;
  }

  return (
    <>
      <header className="bg-gray-900 text-white px-5 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo2.png"
              alt="Lumora India Logo"
              height={200}
              width={200}
              className="h-12 w-auto cursor-pointer"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:block font-semibold text-lg">
            <ul className="flex gap-8 items-center">
              <li><Link href="/" className="hover:text-pink-400 transition">Home</Link></li>
              <li><Link href="/about-us" className="hover:text-pink-400 transition">About Us</Link></li>
              <li><Link href="/products" className="hover:text-pink-400 transition">Products</Link></li>
              <li><Link href="/contact-us" className="hover:text-pink-400 transition">Contact Us</Link></li>
            </ul>
          </nav>

          {/* Right Side: Icons & Mobile Hamburger */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* 1. DESKTOP LANGUAGE DROPDOWN */}
            <div className="hidden md:flex relative group items-center py-2">
              <button className="flex items-center gap-1 text-sm font-semibold hover:text-pink-400 transition">
                <Globe size={20} />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-[100%] right-0 mt-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                <div className="max-h-64 overflow-y-auto py-2">
                  {allLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition cursor-pointer"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. USER PROFILE ICON (Desktop & Mobile) */}
            {isMounted && user ? (
              <Link href="/profile" className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition cursor-pointer text-pink-400">
                <User size={20} />
              </Link>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gray-800 rounded-full transition text-white"
              >
                <User size={20} />
              </button>
            )}
            
            {/* 3. CART ICON */}
            <Link href="/cart" className="relative cursor-pointer flex items-center transition hover:scale-105">
              <ShoppingCart className="w-6 h-6 text-white hover:text-pink-400 transition" />
              {isMounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* 4. MOBILE HAMBURGER MENU BUTTON */}
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 rounded-xl p-5 shadow-xl border border-gray-700 animate-slide-up">
            <ul className="flex flex-col gap-4 text-lg font-medium">
              <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link href="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li><Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
              <li><Link href="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
              
              <div className="h-px bg-gray-700 my-2"></div> {/* Divider */}

              {/* Mobile Language Selector */}
              <li className="flex flex-col gap-2">
                <label className="text-sm text-pink-400 flex items-center gap-2 font-bold">
                  <Globe size={18}/> Translate Site
                </label>
                <select 
                  onChange={(e) => {
                    handleLanguageChange(e.target.value);
                    setMenuOpen(false);
                  }}
                  className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:border-pink-400 text-sm"
                  defaultValue=""
                >
                  <option value="" disabled>Choose Language...</option>
                  {allLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </li>

              <div className="h-px bg-gray-700 my-2"></div> {/* Divider */}
              
              {/* Mobile Auth Links */}
              {isMounted && user ? (
                <li>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-white flex items-center gap-2">
                    <User size={20} className="text-pink-400"/> My Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }} 
                    className="text-white flex items-center gap-2 w-full text-left"
                  >
                    <User size={20} className="text-pink-400"/> Login / Sign Up
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>

      {/* Global Login Modal Instance */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Header;