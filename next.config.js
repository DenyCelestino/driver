/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
  httpAgentOptions: {
    keepAlive: true,
  },
};
// next.config.js

module.exports = {
  async rewrites() {
    return [
      // Roteamento para o frontend
      {
        source: "/:path*",
        destination: "https://trafegotop.app/:path*", // Substitua pelo endereço correto do seu frontend
      },
      // Roteamento para o backend (subdomínio api)
      {
        source: "/trafegotop/api/:path*",
        destination: "https://api.trafegotop.app/:path*", // Substitua pelo endereço correto do seu backend
      },
    ];
  },
};

module.exports = nextConfig;
