"use client";

import { Filme } from "@/Types/types";
import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";
import { useResumoFilmes } from "@/app/hooks/useResumoFilmes";

type Props = {
  filme: Filme;
};

const Card = ({ filme }: Props) => {
  const { id, title, poster_path, overview, vote_average } = filme;

  const resume = useResumoFilmes(overview, 256);

  return (
    <div className={styles.card} key={id}>
      <Link href={`/filmes/${id}`}>
        <Image
          className={styles.card_poster}
          src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`}
          alt={`Poster do filme ${title}`}
          width={300}
          height={200}
        />

        <div className={styles.card_info}>
          <h3 className={styles.card_title}>{title}</h3>
          <p className={styles.card_description}>{resume}</p>
          <p className={styles.card_description}>Nota: {vote_average}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
