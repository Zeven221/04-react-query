import axios from "axios";
import type { Movie } from "../types/movie";
interface FetchMoviesData {
  total_pages: number;
  results: Movie[];
}
export default async function fetchMovies(settings: {
  query: string;
  page: number;
}): Promise<FetchMoviesData> {
  const BASE_URL: string = "https://api.themoviedb.org/3/";
  const URL_ENDPOINT: string = "search/movie";
  const API_KEY: string = import.meta.env.VITE_TMDB_TOKEN;
  const params: { query: string, page: number;} = {
    query: settings.query,
    page: settings.page
  };
  const headers: { Authorization: string } = {
    Authorization: `Bearer ${API_KEY}`,
  };
  const response = await axios.get<FetchMoviesData>(BASE_URL + URL_ENDPOINT, {
    params,
    headers,
  });
  return response.data;
}
