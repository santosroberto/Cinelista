import Grid from "@/app/components/Grid";
import Title from "@/app/components/Title";
import { getTopMovies } from "@/lib/api/tmdb";

export const dynamic = "force-static";

const TopFilmes = async () => {
  
  const filmes = await getTopMovies();  
  return (
    <>
      <Title title="Top Filmes" />
      <Grid filmes={filmes} />
    </>
  );
};

export default TopFilmes;
