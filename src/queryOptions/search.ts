import { MOVIE_API_URL, TVSHOW_API_URL } from "@/constants/common";
import { TMovie, TTVShow } from "@/utils/types";
import { queryOptions } from "@tanstack/react-query";

export const searchQueryOptions = (query: string) =>
  queryOptions<[{ results: TMovie[] }, { results: TTVShow[] }]>({
    queryKey: ["search", query],
    queryFn: async () =>
      Promise.all([
        (
          await fetch(MOVIE_API_URL.SEARCH_BY_TITLE(query), {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTE3MDM5NWJlOWNjMzI1MGFiOTIyMTQyODc3YTJhNyIsInN1YiI6IjY1Y2UzMzc5YTI3NTAyMDE2Mzk1ZWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MRTkU82T43poLSKotP9Fcvd0wQi-YnP1VazH46QSy5s",
            },
          })
        ).json(),
        (
          await fetch(TVSHOW_API_URL.SEARCH_BY_TITLE(query), {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTE3MDM5NWJlOWNjMzI1MGFiOTIyMTQyODc3YTJhNyIsInN1YiI6IjY1Y2UzMzc5YTI3NTAyMDE2Mzk1ZWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MRTkU82T43poLSKotP9Fcvd0wQi-YnP1VazH46QSy5s",
            },
          })
        ).json(),
      ]),
  });
