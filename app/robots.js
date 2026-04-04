export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow Google from indexing private customer pages and backend APIs
      disallow: ['/profile/', '/checkout/', '/api/', '/cart/'],
    },
    // Tells Google exactly where to find your map of the site
    sitemap: 'https://lumoraindia.com/sitemap.xml',
  }
}