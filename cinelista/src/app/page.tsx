import { Suspense } from "react";
import { getTrendingMovies } from "@/lib/api/tmdb";
import Grid from "./components/Grid";
import Title from "./components/Title";
import SkeletonGrid from "./components/SkeletonGrid";

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_API_IMG_URL || "";

async function DestaquesContent({ initialData }: { initialData: Awaited<ReturnType<typeof getTrendingMovies>> }) {
  return <Grid filmes={initialData} maxInitial={10} />;
}

export default async function Home() {
  const filmes = await getTrendingMovies();
  const firstPoster = filmes[0]?.poster_path;

  return (
    <>
      {firstPoster && (
        <link rel="preload" as="image" href={`${IMG_BASE}${firstPoster}`} />
      )}
      <Title title="Destaques" />
      <Suspense fallback={<SkeletonGrid />}>
        <DestaquesContent initialData={filmes} />
      </Suspense>
    </>
  );
}
