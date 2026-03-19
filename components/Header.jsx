"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white px-5 py-3">
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

        {/* Desktop Nav */}
        <nav className="hidden md:block font-semibold text-lg">
          <ul className="flex gap-8">
            <li>
              <Link href="/" className="hover:text-pink-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-pink-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-pink-500 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-pink-500 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-gray-800 rounded-xl p-5">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" onClick={() => setMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={() => setMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact-us" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;