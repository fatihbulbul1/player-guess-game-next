/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/users",
        destination: "https://benevolent-longma-c3cf58.netlify.app/:path*",
      },
    ];
  },
};
