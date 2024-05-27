"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function useMovieShowPreviewURL(movieId: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearchParams = new URLSearchParams(searchParams);
  urlSearchParams.set("movieId", movieId);

  return `${pathname}?${urlSearchParams.toString()}`;
}

export function useTVShowPreviewURL(showId: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearchParams = new URLSearchParams(searchParams);
  urlSearchParams.set("showId", showId);
  return `${pathname}?${urlSearchParams.toString()}`;
}
