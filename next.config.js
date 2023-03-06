/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/users",
        destination: "https://player-guess-game-next.vercel.app/:path*",
      },
    ];
  },
};
