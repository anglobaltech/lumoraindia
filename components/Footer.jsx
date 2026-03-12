import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-5 text-white mt-2">
      <div className="max-w-6xl mx-auto px-5 py-2 grid md:grid-cols-3 gap-8">
        
        {/* Logo / About */}
        <div>
        <Link href="/">
          <img
            src="/logo2.png"
            alt="Lumora India Logo"
            className="h-20 w-auto cursor-pointer"
          />
        </Link>
          <p className="mt-3 text-sm">
            We provide high quality products and services to help grow your
            business and make life easier.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-400">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-400">About Us</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-green-400">Products</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-400">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p>Email: support@mywebsite.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: India</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Lumora India. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;