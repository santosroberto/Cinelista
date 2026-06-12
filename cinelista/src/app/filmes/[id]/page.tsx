import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./DetalheFilme.module.css";
import { getMovieDetails } from "@/lib/api/tmdb";
import { env } from "@/lib/config";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const details = await getMovieDetails(Number(id));

  if (!details) return;

  return {
    title: `${details.title} | Cinelista`,
    description: details.overview,
    openGraph: {
      title: `${details.title} | Cinelista`,
      description: details.overview,
      images: details.poster_path
        ? [`${env.NEXT_PUBLIC_TMDB_API_IMG_URL}${details.poster_path}`]
        : [],
    },
  };
};

const DetalheFilme = async ({ params }: Props) => {
  const { id } = await params;

  const details = await getMovieDetails(Number(id));

  if (!details) return notFound();

  const { title, poster_path, overview } = details;
  const imgSrc = poster_path ? `${env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}` : "/placeholder.png";

  return (
    <div className={styles.detalhes}>
      <div className={styles.detalhes_container}>
        <Link className={styles.detalhes_voltar} href="/">Voltar</Link>
        <section className={styles.detalhes_section}>
          <figure>
            <Image
              className={styles.detalhes_imagem}
              src={imgSrc}
              alt={`Poster do filme: ${title}`}
              width={300}
              height={450}
              priority
            />
          </figure>
          <article className={styles.detalhes_info}>
            <h2>{title}</h2>
            <p>{overview}</p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default DetalheFilme;
