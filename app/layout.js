import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";
import GoogleTranslate from "@/components/GoogleTranslate";
import AuthInit from "@/components/AuthInit"; // We will create this below

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        
        {/* SEO Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* 1. Initializes Auth Listener so you don't get logged out on back/refresh */}
        <AuthInit />

        {/* 2. Safe Google Translate */}
        <GoogleTranslate />
        
        <Header />
        
        <AuthProvider>
          {children}
        </AuthProvider>
        
        <ToastContainer position="top-right" />
        <Footer />
      </body>
    </html>
  );
}