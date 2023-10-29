/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode:false,
  webpack: (
    config, 
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // do stuff
    return config;
  }
}

module.exports = nextConfig
