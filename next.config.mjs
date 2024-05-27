/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      "pk_test_Y2xvc2UtY3JhYi0xMC5jbGVyay5hY2NvdW50cy5kZXYk",
    CLERK_SECRET_KEY: "sk_test_lN4ZhuNg3U7hWLImu57cbS67KWMVSTsNqzynqwregv",
    TMDB_AUTHORIZED_TOKEN:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTE3MDM5NWJlOWNjMzI1MGFiOTIyMTQyODc3YTJhNyIsInN1YiI6IjY1Y2UzMzc5YTI3NTAyMDE2Mzk1ZWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MRTkU82T43poLSKotP9Fcvd0wQi-YnP1VazH46QSy5s",
  },
};

export default nextConfig;
