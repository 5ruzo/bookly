/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/public/images/**",
        search: "",
      },
    ],
  }
};

export default nextConfig;
