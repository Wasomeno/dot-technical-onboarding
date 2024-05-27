import { HeroSection } from "@/components/home/hero-section";
import { MoviesSection } from "@/components/movies-section";

type HomeProps = {
  searchParams: { movieId: string };
};

export default async function Home() {
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
      <MoviesSection title="Action Movies" genreName="action" />
      <MoviesSection title="Animation Movies" genreName="animation" />
      <MoviesSection title="Drama Movies" genreName="drama" />
    </main>
  );
}
