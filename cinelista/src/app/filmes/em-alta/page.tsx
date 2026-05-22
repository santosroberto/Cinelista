import Grid from "@/app/components/Grid";
import Title from "@/app/components/Title";
import { getTrendingMovies } from "@/lib/api/tmdb";


export const dynamic = "force-dynamic";

const FilmesEmAlta = async () => {
  
  const filmes = await getTrendingMovies();
  return (
    <>
      <Title title="Filmes em Alta" />
      <Grid filmes={filmes} />
    </>
  );
};

export default FilmesEmAlta;
