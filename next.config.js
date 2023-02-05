/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
 
  images: {
    domains: ["openweathermap.org"],
  },
}

module.exports = nextConfig
