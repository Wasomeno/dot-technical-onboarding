export const MOVIE_API_URL = {
  SEARCH_BY_TITLE: (query: string) =>
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
  GET_BY_ID: (id: string) => ({
    BASE: `https://api.themoviedb.org/3/movie/${id}`,
    CREDITS: `https://api.themoviedb.org/3/movie/${id}/credits`,
  }),
  GET_GENRES: "https://api.themoviedb.org/3/genre/movie/list",
  GET_BY_GENRE_ID: (id: string) =>
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
  IMAGE: (imageFileName: string) =>
    `https://image.tmdb.org/t/p/original/${imageFileName}`,
  POPULAR: "https://api.themoviedb.org/3/movie/popular",
};

export const TVSHOW_API_URL = {
  SEARCH_BY_TITLE: (query: string) =>
    `https://api.themoviedb.org/3/search/tv?query=${query}`,
  GET_BY_ID: (id: string) => ({
    BASE: `https://api.themoviedb.org/3/tv/${id}`,
    CREDITS: `https://api.themoviedb.org/3/movie/${id}/credits`,
  }),
  GET_GENRES: "https://api.themoviedb.org/3/genre/tv/list",
  GET_BY_GENRE_ID: (id: string) =>
    `https://api.themoviedb.org/3/discover/tv?with_genres=${id}`,
  IMAGE: (imageFileName: string) =>
    `https://image.tmdb.org/t/p/original/${imageFileName}`,
  POPULAR: "https://api.themoviedb.org/3/tv/popular",
};

export const fetchOption: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB_AUTHORIZED_TOKEN as string,
  },
};
