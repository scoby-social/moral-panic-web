/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@esotericsoftware/spine-player",
    "@esotericsoftware/spine-core",
    "@esotericsoftware/spine-webgl",
  ],
  images: {
    domains: ["storage.googleapis.com", "shdw-drive.genesysgo.net"],
    minimumCacheTTL: 1500000,
  },
  crossOrigin: "anonymous",
};

module.exports = nextConfig;
