import type { Metadata } from "next";
import { Suspense } from "react";
import Grid from "@/app/components/Grid";
import Title from "@/app/components/Title";
import SkeletonGrid from "@/app/components/SkeletonGrid";
import { getPopularMovies } from "@/lib/api/tmdb";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Filmes Populares | Cinelista",
  description: "Veja os filmes mais populares no momento no Cinelista.",
};

async function FilmesPopularesContent() {
  const filmes = await getPopularMovies();
  return <Grid filmes={filmes} />;
}

const FilmesPopulares = () => {
  return (
    <>
      <Title title="Filmes Populares" />
      <Suspense fallback={<SkeletonGrid />}>
        <FilmesPopularesContent />
      </Suspense>
    </>
  );
};

export default FilmesPopulares;
