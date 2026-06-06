import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
  },
});

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error(
      "Не задано VITE_TMDB_TOKEN. Додайте токен TMDB до файлу .env.",
    );
  }

  const response = await tmdbApi.get<MoviesResponse>("/search/movie", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query,
      page,
      include_adult: false,
      language: "uk-UA",
    },
  });

  return response.data;
};
