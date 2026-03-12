import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-5">
      <div className="flex justify-between items-center">
        <Link href="/">
          <img
            src="/logo2.png"
            alt="Lumora India Logo"
            className="h-20 w-auto cursor-pointer"
          />
        </Link>

        <nav className="font-bold text-lg">
          <ul className="flex gap-8 text-white">
            <li>
              <Link href="/" className="hover:text-pink-300">
                Home
              </Link>
            </li>

            <li>
              <Link href="/about-us" className="hover:text-pink-300">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-pink-300">
                Products
              </Link>
            </li>

            <li>
              <Link href="/contact-us" className="hover:text-pink-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
