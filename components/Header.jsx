import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-8 py-4">
      <div className="flex justify-between items-center">
        
        <Link href="/">
          <h1 className="text-pink-400 text-xl font-extrabold cursor-pointer hover:text-pink-500 transition">
            Lumora India
          </h1>
        </Link>

        <nav>
          <ul className="flex gap-8 text-green-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link href="/about-us" className="hover:text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
            </li>

            <li>
              <Link href="/contact-us" className="hover:text-white">
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
