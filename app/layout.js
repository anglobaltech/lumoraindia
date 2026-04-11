import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";
import Script from "next/script"; // 🌟 NEW: Added Next.js Script import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://lumoraindia.com'),
  title: {
    default: 'Lumora India | Premium Feminine Hygiene',
    template: '%s | Lumora India', 
  },
  description: "Lumora India is a leading provider of innovative solutions and services. With a focus on quality, reliability, and customer satisfaction.",
  keywords: ['sanitary pads', 'feminine hygiene', 'rash-free pads', 'Lumora India', 'women health'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Lumora India | Premium Feminine Hygiene',
    description: "Lumora India is a leading provider of innovative solutions and services.",
    url: 'https://lumoraindia.com',
    siteName: 'Lumora India',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Lumora Brand Logo' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumora India | Premium Feminine Hygiene',
    description: "Lumora India is a leading provider of innovative solutions and services.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lumora India',
    url: 'https://lumoraindia.com',
    logo: 'https://lumoraindia.com/logo.png',
    description: 'Lumora India is a leading provider of innovative solutions and services.',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🌟 THE BYPASS: Forces browser to compile Tailwind v4, ignoring Next.js build errors */}
        <Script src="https://unpkg.com/@tailwindcss/browser@4" strategy="beforeInteractive" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        
        {/* Wrap EVERYTHING in AuthProvider to maintain session across reloads */}
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}