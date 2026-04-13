"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User } from "lucide-react";

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

    // Close mobile menu automatically when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    // HIDES HEADER ON CHECKOUT, PROFILE, AND ADMIN PAGES
    if (pathname === '/cart' || pathname?.startsWith('/profile') || pathname?.startsWith('/admin') || pathname?.startsWith('/checkout')) {
        return null;
    }
    
    return (
        <>
            <header className="bg-gray-900 text-white px-5 py-3 sticky top-0 z-50 shadow-md">
                <div className="max-w-[1600px] mx-auto flex justify-between items-center">

                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/logo2.png"
                            alt="Lumora India Logo"
                            height={200}
                            width={200}
                            className="h-12 w-auto cursor-pointer"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:block font-semibold text-[15px]">
                        <ul className="flex gap-8 items-center tracking-wide">
                            <li><Link href="/" className="hover:text-pink-400 transition-colors cursor-pointer">Home</Link></li>
                            <li><Link href="/about-us" className="hover:text-pink-400 transition-colors cursor-pointer">About Us</Link></li>
                            <li><Link href="/products" className="hover:text-pink-400 transition-colors cursor-pointer">Products</Link></li>
                            <li><Link href="/contact-us" className="hover:text-pink-400 transition-colors cursor-pointer">Contact Us</Link></li>
                        </ul>
                    </nav>

                    {/* Right Side: Icons & Mobile Hamburger */}
                    <div className="flex items-center gap-5 md:gap-6">

                        {/* USER PROFILE ICON (Desktop & Mobile) */}
                        {isMounted && user ? (
                            <Link href="/profile" className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors cursor-pointer text-pink-400 border border-gray-700">
                                <User size={18} />
                            </Link>
                        ) : (
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gray-800 rounded-full transition-colors text-white cursor-pointer border border-transparent hover:border-gray-700"
                            >
                                <User size={18} />
                            </button>
                        )}

                        {/* CART ICON */}
                        <Link href="/cart" className="relative cursor-pointer flex items-center transition-transform hover:scale-105">
                            <ShoppingCart className="w-[22px] h-[22px] text-white hover:text-pink-400 transition-colors" />
                            {isMounted && totalItems > 0 && (
                                <span className="absolute -top-2.5 -right-2.5 bg-pink-500 text-white text-[10px] font-black w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm animate-in zoom-in duration-300">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* MOBILE HAMBURGER MENU BUTTON */}
                        <button
                            className="md:hidden text-white cursor-pointer hover:text-pink-400 transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800 shadow-2xl animate-in slide-in-from-top-2 duration-200 z-50">
                        <ul className="flex flex-col text-base font-semibold">
                            <li><Link href="/" className="block px-6 py-4 border-b border-gray-800 hover:bg-gray-800 hover:text-pink-400 transition-colors">Home</Link></li>
                            <li><Link href="/about-us" className="block px-6 py-4 border-b border-gray-800 hover:bg-gray-800 hover:text-pink-400 transition-colors">About Us</Link></li>
                            <li><Link href="/products" className="block px-6 py-4 border-b border-gray-800 hover:bg-gray-800 hover:text-pink-400 transition-colors">Products</Link></li>
                            <li><Link href="/contact-us" className="block px-6 py-4 border-b border-gray-800 hover:bg-gray-800 hover:text-pink-400 transition-colors">Contact Us</Link></li>

                            {/* Mobile Auth Links */}
                            {isMounted && user ? (
                                <li>
                                    <Link href="/profile" className="flex items-center gap-3 px-6 py-4 text-pink-400 hover:bg-gray-800 transition-colors">
                                        <User size={18} /> My Dashboard
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            setIsLoginModalOpen(true);
                                        }}
                                        className="flex items-center gap-3 w-full text-left px-6 py-4 text-pink-400 hover:bg-gray-800 transition-colors cursor-pointer"
                                    >
                                        <User size={18} /> Login / Sign Up
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