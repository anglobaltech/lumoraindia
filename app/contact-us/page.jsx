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
      sub: "Mon–Sat, 10am–6pm IST",
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
      sub: "10:00 AM – 6:00 PM IST",
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
        message: "Please fill all fields ⚠️",
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
        "service_ui1v6r4",
        "template_j8bgske",
        templateParams,
        "umJ95Yvy1wxcOO8xG"
      )
      .then(
        () => {
          setStatus({
            type: "success",
            message: "Thanks for reaching out! Your message has been sent successfully✅. We’ll connect with you shortly.",
          });

          setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        () => {
          setStatus({
            type: "error",
            message: "Failed to send message ❌",
          });
        }
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

    {/* map and contact form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-10">
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

          <div className="rounded-2xl  border border-pink-100 shadow-sm bg-linear-to-b from-pink-50 to-white">
              <div className="max-w-3xl mx-auto">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
                >
                  <h1 className="text-2xl font-bold items-center text-center">Contact With Us</h1>
                  <div className="flex flex-row items-center gap-4 justify-center">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full border border-gray-200 rounded-xl  px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>

                    <div className="flex-1">
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full border border-gray-200 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>

                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full border border-gray-200 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      rows="3"
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How Can We Help You?"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    ></textarea>
                  </div>

                  {status.message && (
                    <p
                      className={`text-sm text-left font-medium ${status.type === "success" ? "text-green-600" : "text-red-500"
                        }`}
                    >
                      {status.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-pink-500 cursor-pointer text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition duration-300 shadow-md"
                  >
                    Submit
                  </button>
                </form>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;