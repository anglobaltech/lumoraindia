"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

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
      value: "Monday – Saturday",
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

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Special handler for phone to only allow numbers and max 10 digits
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      setForm({ ...form, phone: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation (Keep your existing validation)
    if (!form.name || !form.email || !form.phone || !form.message) {
      setStatus({ type: "error", message: "Please fill all fields ⚠️" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus({ type: "error", message: "Invalid email format ⚠️" });
      return;
    }
    if (form.phone.length !== 10) {
      setStatus({ type: "error", message: "Enter a valid 10-digit number ⚠️" });
      return;
    }

    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      // 2. FIXED: Corrected the URL and changed 'formData' to 'form'
      const response = await fetch("/api/contact-by-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // Use 'form' here, not 'formData'
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: "success",
          message: "Thanks! Your inquiry has been sent to our team ",
        });
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to send");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setTimeout(() => setStatus({ type: "", message: "" }), 6000);
    }
  };

  // Helper to clear status messages after 5 seconds
  const clearStatusTimer = () => {
    setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, 5000);
  };

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {/* LEFT SIDE MAP */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-pink-100">
            <iframe
              src="https://www.google.com/maps?q=Urbtech%20NPX%20Sector%20153%20Noida&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-3xl"
            ></iframe>
          </div>

          {/* Form */}
          <div className="relative rounded-3xl p-px bg-linear-to-br from-pink-200 via-pink-100 to-white shadow-lg">
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-8 h-full">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
                    Contact With Us
                  </h1>

                  <p className="text-center text-gray-500 text-sm sm:text-base">
                    Fill out the form and our team will get back to you within
                    24 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Name */}
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

                    {/* Phone with +91 fixed */}
                    <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl bg-white/70 shadow-sm focus-within:ring-2 focus-within:ring-pink-300 focus-within:border-pink-300 transition overflow-hidden">
                      <span className="pl-3 pr-2 py-2 text-gray-500 font-medium border-r border-gray-200 bg-gray-50 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="10-digit number"
                        className="w-full px-3 py-2 bg-transparent focus:outline-none"
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
                      className={`text-sm font-medium text-center ${status.type === "success"
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
                    className="cursor-pointer w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition duration-300"
                  >
                    Submit Message
                  </button>
                </form>
                <div className="mt-6 text-center text-xs sm:text-sm text-gray-500">
                  🔒 Your information is safe with us. We respect your privacy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section className="bg-white py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Why Reach Out to <span className="text-pink-500">Lumora?</span>
          </h2>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Our team is here to support you with product guidance, bulk orders,
            and any questions about feminine hygiene care.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {[
              "Product Recommendations",
              "Bulk / Wholesale Orders",
              "Customer Support",
              "Hygiene Awareness Queries",
              "Partnership Opportunities",
              "Order Tracking Help",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-pink-50 border border-pink-100 p-5 rounded-xl 
          hover:shadow-lg hover:-translate-y-1 transition"
              >
                🌸 {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;