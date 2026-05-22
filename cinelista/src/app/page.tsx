import { getTrendingMovies } from "@/lib/api/tmdb";
import Grid from "./components/Grid";
import Title from "./components/Title";

export default async function Home() {
  const filmes = await getTrendingMovies();
  return (
    <>
      <Title title="Destaques" />
      <Grid filmes={filmes} />
    </>
  );
}
