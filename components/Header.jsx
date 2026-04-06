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

    const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    // Distraction-free Cart & Profile Pages (Hides header on checkout)
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
                            <li><Link href="/" className="hover:text-pink-400 transition cursor-pointer">Home</Link></li>
                            <li><Link href="/about-us" className="hover:text-pink-400 transition cursor-pointer">About Us</Link></li>
                            <li><Link href="/products" className="hover:text-pink-400 transition cursor-pointer">Products</Link></li>
                            <li><Link href="/contact-us" className="hover:text-pink-400 transition cursor-pointer">Contact Us</Link></li>
                        </ul>
                    </nav>

                    {/* Right Side: Icons & Mobile Hamburger */}
                    <div className="flex items-center gap-4 md:gap-6">

                        {/* USER PROFILE ICON (Desktop & Mobile) */}
                        {isMounted && user ? (
                            <Link href="/profile" className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition cursor-pointer text-pink-400">
                                <User size={20} />
                            </Link>
                        ) : (
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gray-800 rounded-full transition text-white cursor-pointer"
                            >
                                <User size={20} />
                            </button>
                        )}

                        {/* CART ICON */}
                        <Link href="/cart" className="relative cursor-pointer flex items-center transition hover:scale-105">
                            <ShoppingCart className="w-6 h-6 text-white hover:text-pink-400 transition" />
                            {isMounted && totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* MOBILE HAMBURGER MENU BUTTON */}
                        <button
                            className="md:hidden text-white cursor-pointer hover:text-pink-400 transition"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="md:hidden mt-4 bg-gray-800 rounded-xl p-5 shadow-xl border border-gray-700 animate-slide-up absolute w-[90%] left-[5%]">
                        <ul className="flex flex-col gap-4 text-lg font-medium">
                            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link href="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                            <li><Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
                            <li><Link href="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>

                            <div className="h-px bg-gray-700 my-2"></div> {/* Divider */}

                            {/* Mobile Auth Links */}
                            {isMounted && user ? (
                                <li>
                                    <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-white flex items-center gap-2 cursor-pointer">
                                        <User size={20} className="text-pink-400" /> My Dashboard
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            setIsLoginModalOpen(true);
                                        }}
                                        className="text-white flex items-center gap-2 w-full text-left cursor-pointer"
                                    >
                                        <User size={20} className="text-pink-400" /> Login / Sign Up
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