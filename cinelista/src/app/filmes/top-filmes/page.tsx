import type { Metadata } from "next";
import { Suspense } from "react";
import Grid from "@/app/components/Grid";
import Title from "@/app/components/Title";
import SkeletonGrid from "@/app/components/SkeletonGrid";
import { getTopMovies } from "@/lib/api/tmdb";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Top Filmes | Cinelista",
  description: "Confira os filmes mais bem avaliados de todos os tempos no Cinelista.",
};

async function TopFilmesContent() {
  const filmes = await getTopMovies();
  return <Grid filmes={filmes} />;
}

const TopFilmes = () => {
  return (
    <>
      <Title title="Top Filmes" />
      <Suspense fallback={<SkeletonGrid />}>
        <TopFilmesContent />
      </Suspense>
    </>
  );
};

export default TopFilmes;
