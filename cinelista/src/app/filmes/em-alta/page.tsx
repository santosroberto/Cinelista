import type { Metadata } from "next";
import { Suspense } from "react";
import Grid from "@/app/components/Grid";
import Title from "@/app/components/Title";
import SkeletonGrid from "@/app/components/SkeletonGrid";
import { getTrendingMovies } from "@/lib/api/tmdb";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Filmes em Alta | Cinelista",
  description: "Confira os filmes mais populares da semana no Cinelista.",
};

async function FilmesEmAltaContent() {
  const filmes = await getTrendingMovies();
  return <Grid filmes={filmes} />;
}

const FilmesEmAlta = () => {
  return (
    <>
      <Title title="Filmes em Alta" />
      <Suspense fallback={<SkeletonGrid />}>
        <FilmesEmAltaContent />
      </Suspense>
    </>
  );
};

export default FilmesEmAlta;
