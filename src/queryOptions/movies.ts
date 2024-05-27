"use client";

import { fetchOption, MOVIE_API_URL } from "@/constants/common";
import { TGenre, TMovie, TMovieCredits } from "@/utils/types";
import { queryOptions } from "@tanstack/react-query";

export type TMovieGenres =
  | "action"
  | "adventure"
  | "animation"
  | "western"
  | "comedy"
  | "drama"
  | "horror";

export const getMovieByIdQueryOptions = ({ id }: { id: string }) =>
  queryOptions<TMovie & { credits: TMovieCredits }>({
    queryKey: ["movies", id],
    queryFn: async () => {
      const [movie, credits] = await Promise.all([
        await (
          await fetch(MOVIE_API_URL.GET_BY_ID(id).BASE, fetchOption)
        ).json(),
        await (
          await fetch(MOVIE_API_URL.GET_BY_ID(id).CREDITS, fetchOption)
        ).json(),
      ]);

      const slicedCredits = { ...credits, cast: credits.cast.slice(0, 4) };
      return { ...movie, credits: slicedCredits };
    },

    enabled: id !== null,
  });

export const getMovieByGenreQueryOptions = ({
  genreName,
}: {
  genreName: TMovieGenres;
}) => {
  return queryOptions<{ results: TMovie[] }>({
    queryKey: ["movies", genreName],
    queryFn: async () => {
      const genres: { genres: TGenre[] } = await (
        await fetch(MOVIE_API_URL.GET_GENRES, fetchOption)
      ).json();

      const genreId = genres.genres.find(
        (genre) => (genre.name as string).toLowerCase() === genreName
      )?.id;

      if (!genreId) {
        return [];
      }

      const movies = await (
        await fetch(
          `${MOVIE_API_URL.GET_BY_GENRE_ID(genreId?.toString())}`,
          fetchOption
        )
      ).json();

      const slicedMovies = { ...movies, results: movies.results.slice(0, 8) };
      return slicedMovies;
    },
  });
};

export const getPopularMovies = () =>
  queryOptions<{ results: TMovie[] }>({
    queryKey: ["movies", "popular"],
    queryFn: () =>
      fetch(MOVIE_API_URL.POPULAR, fetchOption)
        .then((response) => response.json())
        .then((result) => result as { results: TMovie[] }),
  });

export const getMovieGenresQueryOptions = () =>
  queryOptions<{ genres: TGenre[] }>({
    queryKey: ["movieGenres"],
    queryFn: () =>
      fetch(MOVIE_API_URL.GET_GENRES, fetchOption)
        .then((response) => response.json())
        .then(
          (result) =>
            result as {
              genres: TGenre[];
            }
        ),
  });
