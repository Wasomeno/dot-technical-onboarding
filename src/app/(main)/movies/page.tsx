import { MoviesSection } from "@/components/movies-section";
import React from "react";

const MoviesPage = () => {
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
      <MoviesSection title="Action Movies" genreName="action" />
      <MoviesSection title="Animation Movies" genreName="animation" />
      <MoviesSection title="Drama Movies" genreName="drama" />
      <MoviesSection title="Comedy Movies" genreName="comedy" />
      <MoviesSection title="Horror Movies" genreName="horror" />
    </main>
  );
};

export default MoviesPage;
