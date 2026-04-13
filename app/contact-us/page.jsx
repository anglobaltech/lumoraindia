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
      value: "mail@anglobalservices.com",
      sub: "info@anglobalservices.com",
      href: "mailto:mail@anglobalservices.com",
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
    AOS.init({ duration: 800, once: true, offset: 50 });
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
    <div className="bg-pink-50 text-gray-800 w-full overflow-hidden">
      
      {/* 1. HERO + MAP & FORM SECTION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-12 pb-12 lg:pb-16 flex flex-col">
        
        <div className="text-center mb-10 shrink-0 animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="inline-block text-[10px] sm:text-xs font-bold tracking-widest uppercase text-pink-500 border border-pink-300 bg-white px-4 py-1.5 rounded-full mb-4 shadow-sm">
            Lumora India
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
            Get in <span className="text-pink-500">Touch</span>
          </h1>

          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about our products or partnership opportunities? Our
            team is ready to help you with product information, bulk orders, and
            business inquiries.
          </p>
        </div>

        {/* Map & Form Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 flex-1">
          
          {/* LEFT SIDE MAP */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-pink-100 min-h-[400px] sm:min-h-[500px] w-full" data-aos="fade-right">
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
          <div className="relative rounded-3xl p-px bg-gradient-to-br from-pink-200 via-pink-100 to-white shadow-lg w-full h-full flex flex-col" data-aos="fade-left" data-aos-delay="100">
            <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-8 lg:p-10 h-full flex flex-col justify-center">
              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                      Send a Message
                    </h2>
                    <p className="text-gray-500 text-sm mt-2 font-medium">
                      We’d love to hear from you. Fill out the form below.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Name */}
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full border-2 border-pink-50 rounded-xl px-5 py-3.5 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 transition-all shadow-sm font-bold text-gray-900 placeholder-gray-400"
                      />
                    </div>

                    {/* Phone with +91 fixed */}
                    <div className="flex-1 relative flex items-center border-2 border-pink-50 rounded-xl bg-white shadow-sm focus-within:ring-4 focus-within:ring-pink-500/10 focus-within:border-pink-400 transition-all overflow-hidden">
                      <span className="pl-5 pr-4 py-3.5 text-gray-500 text-sm font-black border-r border-gray-100 bg-gray-50 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="10-digit number"
                        className="w-full px-4 py-3.5 bg-transparent text-sm focus:outline-none font-bold text-gray-900 placeholder-gray-400"
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
                      className="w-full border-2 border-pink-50 rounded-xl px-5 py-3.5 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 transition-all shadow-sm font-bold text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      name="message"
                      rows="4"
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full border-2 border-pink-50 rounded-xl px-5 py-4 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 transition-all shadow-sm resize-none font-bold text-gray-900 placeholder-gray-400 custom-scrollbar"
                    ></textarea>
                  </div>

                  {/* Status Messages */}
                  {status.message && (
                    <p
                      className={`text-sm font-bold text-center animate-in fade-in zoom-in-95 duration-300 ${
                        status.type === "success"
                          ? "text-emerald-600 bg-emerald-50 py-3 rounded-xl border border-emerald-200"
                          : "text-red-500 bg-red-50 py-3 rounded-xl border border-red-200"
                      }`}
                    >
                      {status.message}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="cursor-pointer w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-pink-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status.type === "loading" ? "Sending..." : "Submit Message"}
                  </button>
                </form>
                <div className="mt-6 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  🔒 Your information is safe with us. We respect your privacy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CARDS SECTION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-12 lg:pb-16 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {contactItems.map(({ icon: Icon, label, value, sub, href }, index) => (
            <div
              key={label}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-200 hover:-translate-y-1 transition-all duration-300 group cursor-default"
            >
              <div className="flex flex-col items-start gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-extrabold text-gray-900 hover:text-pink-600 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-base sm:text-lg font-extrabold text-gray-900">
                      {value}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1 font-medium">{sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY REACH OUT TO LUMORA SECTION */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-20 lg:pb-24">
        <div 
          data-aos="fade-up"
          className="bg-pink-100/60 border border-pink-200/60 rounded-[2.5rem] p-8 lg:p-14 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16 shadow-sm relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-300/30 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Left Text Content */}
          <div className="lg:w-5/12 space-y-6 text-center lg:text-left relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Why Reach Out to <span className="text-pink-600 block sm:inline mt-1 sm:mt-0">Lumora?</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
              Our team is here to support you with product guidance, bulk orders, and any questions about feminine hygiene care.
            </p>
          </div>

          {/* Right Grid Content */}
          <div className="lg:w-7/12 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 relative z-10">
            {reasonItems.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-pink-200 cursor-default"
              >
                <div className="text-xl sm:text-2xl drop-shadow-sm flex-shrink-0">🌸</div>
                <span className="text-gray-800 font-extrabold text-sm sm:text-base tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;