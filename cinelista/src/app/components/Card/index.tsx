"use client";

import { useMemo } from "react";
import { Filme } from "@/Types/types";
import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";

const MAX_RESUME_LENGTH = 256;
const BLUR_DATA_URL = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAQAcJYwCdAEO/hepgAAA";

type Props = {
  filme: Filme;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

const Card = ({ filme, priority = false, fetchPriority = "auto" }: Props) => {
  const { id, title, poster_path, overview, vote_average } = filme;

  const resume = useMemo(() => {
    if (overview.length <= MAX_RESUME_LENGTH) return overview;
    return overview.slice(0, MAX_RESUME_LENGTH) + "...";
  }, [overview]);

  const imgSrc = `${process.env.NEXT_PUBLIC_TMDB_API_IMG_URL}${poster_path}`;

  return (
    <article className={styles.card}>
      <Link href={`/filmes/${id}`} aria-label={`Ver detalhes do filme ${title}`}>
        <Image
          className={styles.card_poster}
          src={imgSrc}
          alt={`Poster do filme ${title}`}
          width={185}
          height={278}
          priority={priority}
          fetchPriority={fetchPriority}
          loading={priority ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 180px"
        />

        <div className={styles.card_info}>
          <h3 className={styles.card_title}>{title}</h3>
          <p className={styles.card_description}>{resume}</p>
          <p className={styles.card_rating}>Nota: {vote_average.toFixed(1)}</p>
        </div>
      </Link>
    </article>
  );
};

export default Card;
