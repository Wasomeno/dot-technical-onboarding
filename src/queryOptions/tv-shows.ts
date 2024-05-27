import { queryOptions } from "@tanstack/react-query";

import { fetchOption, TVSHOW_API_URL } from "@/constants/common";
import { TGenre, TMovieCredits, TTVShow } from "@/utils/types";

export type TTVShowGenres =
  | "action & adventure"
  | "animation"
  | "crime"
  | "comedy"
  | "drama"
  | "family";

export const getTVShowByIdQueryOptions = ({ id }: { id: string }) =>
  queryOptions<TTVShow & { credits: TMovieCredits }>({
    queryKey: ["tv-shows", id],
    queryFn: async () => {
      const [show, credits] = await Promise.all([
        await (
          await fetch(TVSHOW_API_URL.GET_BY_ID(id).BASE, fetchOption)
        ).json(),
        await (
          await fetch(TVSHOW_API_URL.GET_BY_ID(id).CREDITS, fetchOption)
        ).json(),
      ]);

      const slicedCredits = { ...credits, cast: credits.cast.slice(0, 4) };
      return { ...show, credits: slicedCredits };
    },

    enabled: id !== null,
  });

export const getPopularTVShows = () =>
  queryOptions<{ results: TTVShow[] }>({
    queryKey: ["tv-shows", "popular"],
    queryFn: () =>
      fetch(TVSHOW_API_URL.POPULAR, fetchOption)
        .then((response) => response.json())
        .then((result) => result as { results: TTVShow[] }),
  });

export const getTVShowsByGenreQueryOptions = ({
  genreName,
}: {
  genreName: TTVShowGenres;
}) => {
  return queryOptions<{ results: TTVShow[] }>({
    queryKey: ["tv-shows", genreName],
    queryFn: async () => {
      const genres: { genres: TGenre[] } = await (
        await fetch(TVSHOW_API_URL.GET_GENRES, fetchOption)
      ).json();

      const genreId = genres.genres.find(
        (genre) => (genre.name as string).toLowerCase() === genreName
      )?.id;

      if (!genreId) {
        return [];
      }

      const shows = await (
        await fetch(
          `${TVSHOW_API_URL.GET_BY_GENRE_ID(genreId.toString())}`,
          fetchOption
        )
      ).json();

      const slicedMovies = { ...shows, results: shows.results.slice(0, 8) };
      return slicedMovies;
    },
  });
};
