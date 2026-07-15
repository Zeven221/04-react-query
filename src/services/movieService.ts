import axios from "axios";
import type { Movie } from "../types/movie";
export default async function fetchMovies(settings: {query: string}): Promise<Movie[]>{
  const BASE_URL: string = "https://api.themoviedb.org/3/";
  const URL_ENDPOINT: string = "search/movie";
  const API_KEY: string = import.meta.env.VITE_TMDB_TOKEN;
  const params: {query: string} = {
    query: settings.query,
  };
  const headers: {Authorization: string} = {
    Authorization: `Bearer ${API_KEY}`,
  };
  const response = await axios.get<{ results: Movie[] }>(BASE_URL + URL_ENDPOINT, {
    params,
    headers,
  });
  console.log(response.data)
  return response.data.results;
}