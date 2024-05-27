import { queryOptions } from "@tanstack/react-query";

export const getWatchlistListQueryOptions = (userEmail: string) =>
  queryOptions({
    queryKey: ["watchlist", userEmail],
    queryFn: async () => {
      const watchlist = localStorage.getItem(`${userEmail}.watchlist`);

      const parsedWatchlist = JSON.parse(watchlist as string);

      return parsedWatchlist as Array<{ name: string; id: number }>;
    },
  });

export const getWatchlistQueryOptions = (userEmail: string, id: number) =>
  queryOptions({
    queryKey: ["watchlist", userEmail, id],
    queryFn: async () => {
      const watchlist = localStorage.getItem(`${userEmail}.watchlist`);

      const parsedWatchlist = JSON.parse(watchlist as string) as Array<{
        name: string;
        id: number;
      }>;

      const editWatchlist = parsedWatchlist.find((test) => test.id === id) as {
        name: string;
        id: number;
      };

      return editWatchlist as { name: string; id: number };
    },
  });
