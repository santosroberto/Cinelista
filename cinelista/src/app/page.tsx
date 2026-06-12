import { Suspense } from "react";
import { getTrendingMovies } from "@/lib/api/tmdb";
import Grid from "@/app/components/Grid";
import Title from "@/app/components/Title";
import SkeletonGrid from "@/app/components/SkeletonGrid";

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_API_IMG_URL;

async function DestaquesContent() {
  const filmes = await getTrendingMovies();
  return <Grid filmes={filmes} maxInitial={10} />;
}

export default function Home() {
  const firstPoster = "w300/placeholder";

  return (
    <>
      {IMG_BASE && firstPoster && (
        <link rel="preload" as="image" href={`${IMG_BASE}${firstPoster}`} />
      )}
      <Title title="Destaques" />
      <Suspense fallback={<SkeletonGrid />}>
        <DestaquesContent />
      </Suspense>
    </>
  );
}
