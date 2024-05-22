import { HeroSection } from "@/components/home/hero-section";
import { MoviesSection } from "@/components/home/movies-section";

export default function Home() {
  return (
    <main
      style={{
        flex: "1 1 0%",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      <HeroSection />
      <MoviesSection title="Box Office Movies" />
      <MoviesSection title="Western TV Shows" />
      <MoviesSection title="K-Dramas" />
    </main>
  );
}
