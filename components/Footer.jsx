import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Company Info */}
        <div>
          <Link href="/">
            <img
              src="/logo2.png"
              alt="Lumora India Logo"
              className="h-16 w-auto cursor-pointer"
            />
          </Link>

          <p className="mt-4 text-sm leading-relaxed">
            Lumora India provides premium quality products and reliable
            services designed to support businesses and simplify everyday
            solutions for our customers.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:text-green-400 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-green-400 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-400 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Our Services
          </h3>
          <ul className="space-y-3 text-sm">
            <li>Product Supply</li>
            <li>Quality Assurance</li>
            <li>Business Support</li>
            <li>Customer Assistance</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Contact Us
          </h3>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={18} /> support@lumoraindia.com
            </p>

            <p className="flex items-center gap-2">
              <Phone size={18} /> +91 9876543210
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={18} /> India
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Lumora India. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;