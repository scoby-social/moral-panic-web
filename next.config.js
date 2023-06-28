/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@esotericsoftware/spine-player",
    "@esotericsoftware/spine-core",
    "@esotericsoftware/spine-webgl",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  images: {
    domains: ["storage.googleapis.com", "shdw-drive.genesysgo.net"],
    minimumCacheTTL: 1500000,
  },
  crossOrigin: "anonymous",
};

module.exports = nextConfig;
