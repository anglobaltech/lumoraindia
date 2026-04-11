"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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

  const reasonItems = [
    "Product Recommendations",
    "Bulk / Wholesale Orders",
    "Customer Support",
    "Hygiene Awareness Queries",
    "Partnership Opportunities",
    "Order Tracking Help",
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
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 10) {
      setForm({ ...form, phone: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await fetch("/api/contact-by-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), 
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

  return (
    <main className="bg-pink-50 min-h-screen text-gray-800 overflow-x-hidden flex flex-col">
      
      {/* 1. HERO + MAP & FORM SECTION */}
      {/* Used pt-20 to clear fixed navbars safely, while keeping lg:h-[calc(100vh-80px)] to fit the screen */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 lg:pt-24 pb-8 flex flex-col lg:h-[calc(100vh-80px)] lg:min-h-[750px]">
        
        {/* CHANGED: Removed AOS from here and used Tailwind animate-in. This fixes the "scroll to see" bug! */}
        <div className="text-center mb-6 shrink-0 animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="inline-block text-[10px] sm:text-xs font-bold tracking-widest uppercase text-pink-500 border border-pink-300 bg-white px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Lumora India
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-2 tracking-tight">
            Get in <span className="text-pink-500">Touch</span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions about our products or partnership opportunities? Our
            team is ready to help you with product information, bulk orders, and
            business inquiries.
          </p>
        </div>

        {/* Map & Form Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 flex-1 items-stretch">
          
          {/* LEFT SIDE MAP */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-pink-100 min-h-[350px] sm:min-h-[400px] lg:min-h-0 lg:h-full w-full" data-aos="fade-right">
            <iframe
              src="https://www.google.com/maps?q=Urbtech%20NPX%20Sector%20153%20Noida&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full object-cover"
            ></iframe>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="relative rounded-3xl p-px bg-gradient-to-br from-pink-200 via-pink-100 to-white shadow-lg lg:h-full flex flex-col" data-aos="fade-left" data-aos-delay="100">
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 lg:p-8 h-full flex flex-col justify-center">
              <div className="max-w-3xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="text-center mb-2 sm:mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                      Send a Message
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      We’d love to hear from you. Fill out the form below.
                    </p>
                  </div>

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
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm font-medium"
                      />
                    </div>

                    {/* Phone with +91 fixed */}
                    <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl bg-white/70 shadow-sm focus-within:ring-2 focus-within:ring-pink-300 focus-within:border-pink-300 transition overflow-hidden">
                      <span className="pl-4 pr-3 py-2.5 sm:py-3 text-gray-500 text-sm font-bold border-r border-gray-200 bg-gray-50 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="10-digit number"
                        className="w-full px-3 py-2.5 sm:py-3 bg-transparent text-sm focus:outline-none font-medium"
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
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm font-medium"
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
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm resize-none font-medium"
                    ></textarea>
                  </div>

                  {/* Status Messages */}
                  {status.message && (
                    <p
                      className={`text-xs sm:text-sm font-bold text-center animate-in fade-in ${
                        status.type === "success"
                          ? "text-green-600 bg-green-50 py-2 rounded-lg border border-green-100"
                          : "text-red-500 bg-red-50 py-2 rounded-lg border border-red-100"
                      }`}
                    >
                      {status.message}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="cursor-pointer w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 sm:py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status.type === "loading" ? "Sending..." : "Submit Message"}
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

      {/* 2. CONTACT CARDS SECTION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-8 lg:pb-12 mt-6 lg:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map(({ icon: Icon, label, value, sub, href }, index) => (
            <div
              key={label}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                  <Icon className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-gray-900 hover:text-pink-600 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-gray-900">
                      {value}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">{sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY REACH OUT TO LUMORA SECTION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-16 lg:pb-20">
        <div 
          data-aos="fade-up"
          className="bg-pink-100/60 border border-pink-200/60 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16 shadow-sm relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/50 rounded-full blur-[80px] pointer-events-none"></div>

          {/* Left Text Content */}
          <div className="lg:w-5/12 space-y-5 text-center lg:text-left relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Why Reach Out to <span className="text-pink-600 block sm:inline mt-1 sm:mt-0">Lumora?</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
              Our team is here to support you with product guidance, bulk orders, and any questions about feminine hygiene care.
            </p>
          </div>

          {/* Right Grid Content */}
          <div className="lg:w-7/12 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 relative z-10">
            {reasonItems.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-transparent hover:border-pink-200 cursor-pointer"
              >
                <div className="text-xl sm:text-2xl drop-shadow-sm">🌸</div>
                <span className="text-gray-800 font-bold text-sm sm:text-base tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;