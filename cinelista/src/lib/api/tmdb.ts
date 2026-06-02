import { Filme } from "@/Types/types";

const BASE_URL = process.env.TMDB_API_URL!;
const headers = {
  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  "Content-Type": "application/json",
};

type Data = {
  results: Filme[];
};

async function tmdbFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
    signal: AbortSignal.timeout(10000),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export const getTrendingMovies = async () => {
  const data = await tmdbFetch<Data>("/trending/movie/week?language=pt-BR");
  return data.results;
};

export const getMovieDetails = async (id: number): Promise<Filme | undefined> => {
  const data = await tmdbFetch<Filme>(`/movie/${id}?language=pt-BR`);
  return data;
};

export const getPopularMovies = async () => {
  const data = await tmdbFetch<Data>("/movie/popular?language=pt-BR");
  return data.results;
};

export const getTopMovies = async () => {
  const data = await tmdbFetch<Data>("/movie/top_rated?language=pt-BR");
  return data.results;
};
