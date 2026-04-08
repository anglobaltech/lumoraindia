/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🌟 TEMPORARILY DISABLED to fix CSS compiling:
  // reactCompiler: true,

   async redirects() {
    return [
      { source: "/:path(.*).html", destination: "/:path", permanent: true },
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
    ];
  },
};

export default nextConfig;