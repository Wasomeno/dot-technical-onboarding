import { TVShowsSection } from "@/components/tv-shows-section";
import React from "react";

const TVShowsPage = () => {
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
      <TVShowsSection
        title="Action & Adventure Shows"
        genreName="action & adventure"
      />
      <TVShowsSection title="Animation Shows" genreName="animation" />
      <TVShowsSection title="Drama Shows" genreName="drama" />
      <TVShowsSection title="Comedy Shows" genreName="comedy" />
      <TVShowsSection title="Family Shows" genreName="family" />
    </main>
  );
};

export default TVShowsPage;
