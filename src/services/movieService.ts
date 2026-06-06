import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

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
