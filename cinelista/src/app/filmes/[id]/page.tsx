import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./DetalheFilme.module.css";
import { getMovieDetails } from "@/lib/api/tmdb";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

//Gerar metadados dinamicamente para cada filme direto no servidor
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
      images: [
        `${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${details.poster_path}`,
      ],
    },
  };
};

const DetalheFilme = async ({ params }: Props) => {
  const { id } = await params;

  const details = await getMovieDetails(Number(id));

  if (!details) return notFound();

  const { title, poster_path, overview } = details;

  return (
    <>
      <div className={styles.detalhes}>
        <div className={styles.detalhes_container}>
          <Link className={styles.detalhes_voltar} href="/">Voltar</Link>
          <section>
            <figure>
              <Image
                className={styles.detalhes_imagem}
                src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
                alt={`Poster do filme: ${title}`}
                width={300}
                height={400}
              />
            </figure>
            <article className={styles.detalhes_info}>
              <h2>{title}</h2>
              <p>{overview}</p>
            </article>
          </section>
        </div>
      </div>
    </>
  );
};

export default DetalheFilme;
