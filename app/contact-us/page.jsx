"use client";
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const contactItems = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 7782069184",
      sub: "Mon–Sat, 09:30 AM – 6:30 PM IST",
      href: "tel:+917782069184",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "info@lumoraindia.com",
      sub: "We reply within 24 hours",
      href: "mailto:info@lumoraindia.com",
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "S-63, 7th Floor, Urbtech NPX",
      sub: "Sector-153, Noida, UP – 201310",
      href: "https://maps.google.com",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon – Saturday",
      sub: "09:30 AM – 6:30 PM IST",
      href: null,
    },
  ];

  return (
    <div className="bg-pink-50 min-h-screen text-gray-800">

      {/* Hero */}
      <section className="bg-pink-100 py-20 border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-500 border border-pink-300 bg-white px-4 py-1.5 rounded-full mb-4">
            Lumora India
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Get in <span className="text-pink-500">Touch</span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
            Have questions about our products or partnership opportunities?
            Our team is ready to help you with product information, bulk
            orders, and business inquiries.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map(({ icon: Icon, label, value, sub, href }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-pink-500" />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
                    {label}
                  </p>

                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-800 hover:text-pink-500"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-gray-800">{value}</p>
                  )}

                  <p className="text-sm text-gray-500">{sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map + Company Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-pink-100 shadow-sm">
            <iframe
              src="https://www.google.com/maps?q=Urbtech+NPX+Sector+153+Noida&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Info Panel */}
          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-8 flex flex-col justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Lumora <span className="text-pink-500">India</span>
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed">
                Lumora India is dedicated to providing premium-quality sanitary
                napkins designed for comfort, hygiene, and protection.  
                Contact us for product inquiries, distribution opportunities,
                or business collaborations.
              </p>
            </div>

            {/* Address */}
            <div className="bg-pink-50 rounded-xl p-5 border border-pink-100 mt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-500 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    S-63, 7th Floor, Urbtech NPX
                  </p>
                  <p className="text-sm text-gray-500">
                    Sector-153, Noida, Uttar Pradesh – 201310
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">
                Follow Us
              </p>

              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "https://instagram.com" },
                  { icon: Facebook, href: "https://facebook.com" },
                  { icon: Twitter, href: "https://twitter.com" },
                ].map(({ icon: Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-pink-200 bg-pink-50 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 hover:text-white text-pink-500 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/products"
              className="mt-8 inline-flex items-center justify-center bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition text-sm"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;