/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // 404 pages — redirect to relevant content
      {
        source: '/blog/top-content-marketing-tools-seo-2025-guide',
        destination: '/blog/top-seo-analysis-tools-2025-best-seo-ai-tool',
        permanent: true,
      },
      {
        source: '/blog/understanding-search-intent',
        destination: '/blog/why-content-not-ranking',
        permanent: true,
      },
      {
        source: '/en-US',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      // Legacy pages that no longer exist
      {
        source: '/blog/ai-content-blueprint-tool-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/sample-implementation',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/index-old',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Block admin pages from indexing as defense-in-depth
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
}

export default nextConfig