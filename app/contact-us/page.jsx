"use client";
import React from "react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";
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

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      setStatus({
        type: "error",
        message: "Please fill all fields ",
      });
      return;
    }

    const templateParams = {
      user_name: form.name,
      user_email: form.email,
      phone: form.phone,
      message: form.message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus({
            type: "success",
            message:
              "Thanks for reaching out! Your message has been sent successfully ✅. We’ll connect with you shortly.",
          });

          setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          console.error(error);
          setStatus({
            type: "error",
            message: "Failed to send message ",
          });
        },
      );
  };
  const [status, setStatus] = useState({
    type: "", // "success" or "error"
    message: "",
  });
  setTimeout(() => {
    setStatus({ type: "", message: "" });
  }, 6000);

  return (
    <main className="bg-pink-50 min-h-screen text-gray-800">
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
            Have questions about our products or partnership opportunities? Our
            team is ready to help you with product information, bulk orders, and
            business inquiries.
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
                    <p className="text-sm font-semibold text-gray-800">
                      {value}
                    </p>
                  )}

                  <p className="text-sm text-gray-500">{sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* map and contact form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 bg-linear-to-tr from-pink-200/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-10"></div>
            <iframe
              src="https://www.google.com/maps?q=Urbtech+NPX+Sector+153+Noida&output=embed"
              width="100%"
              height="100%"
              className="min-h-100 w-full grayscale-20 group-hover:grayscale-0 transition duration-500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Form */}
          <div className="relative rounded-3xl p-px bg-linear-to-br from-pink-200 via-pink-100 to-white shadow-lg">
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-8 h-full">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h1 className="text-3xl font-bold text-center text-gray-800">
                    Contact With Us
                  </h1>
                  <p className="text-center text-gray-500 text-sm">
                    We’d love to hear from you. Fill out the form below.
                  </p>

                  {/* Name + Phone */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm"
                      />
                    </div>

                    <div className="flex-1 relative">
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      name="message"
                      rows="3"
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm resize-none"
                    ></textarea>
                  </div>

                  {/* Status */}
                  {status.message && (
                    <p
                      className={`text-sm font-medium ${
                        status.type === "success"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {status.message}
                    </p>
                  )}

                  {/* Button */}
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition duration-300"
                  >
                    Submit Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
