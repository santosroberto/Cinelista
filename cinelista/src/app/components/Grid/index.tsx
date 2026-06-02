import { Filme } from "@/Types/types";
import Card from "../Card";
import styles from "./Grid.module.css";

type Props = {
  filmes: Filme[];
  maxInitial?: number;
};

const Grid = ({ filmes, maxInitial }: Props) => {
  const displayed = maxInitial ? filmes.slice(0, maxInitial) : filmes;

  return (
    <section className={styles.grid} aria-label="Lista de filmes">
      {displayed.map((filme, index) => (
        <Card
          key={filme.id}
          filme={filme}
          priority={index < 4}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      ))}
    </section>
  );
};

export default Grid;
