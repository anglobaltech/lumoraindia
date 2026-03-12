"use client";
import React, { useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const Page = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactItems = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 7782069184",
      sub: "Mon–Sat, 10am–6pm IST",
      color: "from-rose-400 to-pink-500",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "info@anglobalservices.com",
      sub: "We reply within 24 hours",
      color: "from-pink-400 to-fuchsia-500",
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "S-63, 7th Floor, Urbtech NPX",
      sub: "Sector-153, Noida, UP – 201310",
      color: "from-fuchsia-400 to-pink-400",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .contact-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f8f8f8;
          color: #111;
        }

        /* Hero */
        .c-hero {
          background: #fff;
          padding: 36px 40px 32px;
          text-align: center;
          border-bottom: 1px solid #ececec;
          position: relative;
          overflow: hidden;
        }
        .c-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% -10%, rgba(244,63,94,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .c-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #e11d48;
          margin-bottom: 10px;
          padding: 5px 12px;
          border: 1px solid rgba(225,29,72,0.2);
          border-radius: 100px;
          background: rgba(225,29,72,0.04);
        }
        .c-hero-eyebrow span {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #e11d48;
          display: inline-block;
        }
        .c-hero h1 {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          color: #111;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .c-hero p {
          max-width: 420px;
          margin: 0 auto;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 400;
        }

        /* Grid */
        .c-grid {
          max-width: 1040px;
          margin: 0 auto;
          padding: 32px 32px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .c-grid { grid-template-columns: 1fr; padding: 20px 16px; gap: 20px; }
        }

        /* Left col */
        .c-left h2 {
          font-size: 18px;
          font-weight: 700;
          color: #111;
          margin-bottom: 3px;
        }
        .c-left .c-subtitle {
          color: #4b5563;
          font-size: 13px;
          margin-bottom: 16px;
        }

        .c-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid #ececec;
          transition: all 0.2s;
        }
        .c-card:last-of-type { border-bottom: none; }
        .c-card:hover .c-icon { transform: scale(1.08); }

        .c-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .c-icon svg { color: white; }

        .c-card-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 2px;
        }
        .c-card-value {
          font-size: 13px;
          font-weight: 600;
          color: #111;
          margin-bottom: 1px;
        }
        .c-card-sub {
          font-size: 12px;
          color: #4b5563;
        }

        .c-note {
          margin-top: 16px;
          padding: 14px 16px;
          background: #fff;
          border: 1px solid #ececec;
          border-radius: 10px;
        }
        .c-note p {
          font-size: 13px;
          color: #4b5563;
          line-height: 1.6;
        }
        .c-note strong { color: #111; font-weight: 600; }

        /* Form card */
        .c-form-card {
          background: #fff;
          border-radius: 14px;
          padding: 28px 26px;
          box-shadow: 0 1px 20px rgba(0,0,0,0.07);
          border: 1px solid #ececec;
          position: relative;
          overflow: hidden;
        }
        .c-form-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f43f5e, #e879f9, #f43f5e);
          background-size: 200% 100%;
          animation: c-shimmer 3s linear infinite;
        }
        @keyframes c-shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        .c-form-card h2 {
          font-size: 18px;
          font-weight: 700;
          color: #111;
          margin-bottom: 3px;
        }
        .c-form-sub {
          font-size: 13px;
          color: #4b5563;
          margin-bottom: 20px;
        }

        .c-field { margin-bottom: 16px; }
        .c-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 5px;
          display: block;
          transition: color 0.2s;
        }
        .c-label.active { color: #e11d48; }

        .c-input, .c-textarea {
          width: 100%;
          background: #fafafa;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 9px 11px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          color: #111;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          resize: none;
          box-sizing: border-box;
        }
        .c-input:focus, .c-textarea:focus {
          border-color: #f43f5e;
          background: #fff;
        }
        .c-input::placeholder, .c-textarea::placeholder { color: #9ca3af; }

        .c-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 500px) { .c-row2 { grid-template-columns: 1fr; } }

        .c-submit {
          width: 100%;
          background: #111;
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 9px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
          margin-top: 4px;
        }
        .c-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f43f5e, #e879f9);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .c-submit:hover::before { opacity: 1; }
        .c-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(244,63,94,0.28); }
        .c-submit span, .c-submit svg { position: relative; z-index: 1; }

        /* Success */
        .c-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 240px;
          gap: 10px;
        }
        .c-success-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f43f5e, #e879f9);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .c-success-icon svg { color: white; }
        .c-success h3 { font-size: 20px; font-weight: 700; color: #111; }
        .c-success p { color: #4b5563; font-size: 13px; }
        .c-reset {
          background: none;
          border: 1.5px solid #f43f5e;
          color: #f43f5e;
          padding: 8px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.2s;
          margin-top: 2px;
        }
        .c-reset:hover { background: #f43f5e; color: #fff; }
      `}</style>

      <div className="contact-page">
        {/* Hero */}
        <section className="c-hero">
          <div className="c-hero-eyebrow">
            <span></span> Lumora India
          </div>
          <h1>Contact Us</h1>
          <p>
            Questions about our products or partnership opportunities? Our team
            is ready to help.
          </p>
        </section>

        {/* Grid */}
        <div className="c-grid">
          {/* Left */}
          <div className="c-left">
            <h2>Get in Touch</h2>
            <p className="c-subtitle">We'd love to hear from you</p>

            {contactItems.map(({ icon: Icon, label, value, sub, color }) => (
              <div className="c-card" key={label}>
                <div className={`c-icon bg-gradient-to-br ${color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="c-card-label">{label}</p>
                  <p className="c-card-value">{value}</p>
                  <p className="c-card-sub">{sub}</p>
                </div>
              </div>
            ))}

            <div className="c-note">
              <p>
                <strong>Lumora India</strong> responds to all enquiries within
                one business day. For urgent matters, please call us directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="c-form-card">
            {submitted ? (
              <div className="c-success">
                <div className="c-success-icon">
                  <CheckCircle size={22} />
                </div>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out. We'll be in touch within 24 hours.
                </p>
                <button
                  className="c-reset"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2>Send a Message</h2>
                <p className="c-form-sub">
                  Fill in the details and we'll get back to you shortly
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="c-row2">
                    <div className="c-field">
                      <label
                        className={`c-label ${focused === "name" ? "active" : ""}`}
                      >
                        Full Name
                      </label>
                      <input
                        className="c-input"
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div className="c-field">
                      <label
                        className={`c-label ${focused === "email" ? "active" : ""}`}
                      >
                        Email
                      </label>
                      <input
                        className="c-input"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, email: e.target.value }))
                        }
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div className="c-field">
                    <label
                      className={`c-label ${focused === "subject" ? "active" : ""}`}
                    >
                      Subject
                    </label>
                    <input
                      className="c-input"
                      type="text"
                      placeholder="Product enquiry / Partnership"
                      required
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, subject: e.target.value }))
                      }
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div className="c-field">
                    <label
                      className={`c-label ${focused === "message" ? "active" : ""}`}
                    >
                      Message
                    </label>
                    <textarea
                      className="c-textarea"
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      required
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <button type="submit" className="c-submit">
                    <span>Send Message</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
