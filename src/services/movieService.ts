import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
  },
});

const TMDB_API_KEY = "f4a1e146c46369c520585746a0a1aea3";

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const response = await tmdbApi.get<MoviesResponse>("/search/movie", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    params: {
      ...(!token && { api_key: TMDB_API_KEY }),
      query,
      page,
      include_adult: false,
      language: "uk-UA",
    },
  });

  return response.data;
};
