import { MainNavigation } from "@/components/main-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { MoviePreviewModal } from "@/components/movie-preview-modal";
import { SearchPageWrapper } from "@/components/search-page-wrapper";
import { TVShowPreviewModal } from "@/components/tv-show-preview-modal";
import React, { PropsWithChildren } from "react";

export default async function MainLayout({ children }: PropsWithChildren) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flex: "1 1 0%",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      <MainNavigation />
      <SearchPageWrapper>{children}</SearchPageWrapper>
      <MoviePreviewModal />
      <TVShowPreviewModal />
      <MobileNavigation />
    </main>
  );
}
