import styles from "./SkeletonGrid.module.css";

type Props = {
  count?: number;
};

const SkeletonGrid = ({ count = 10 }: Props) => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.poster} />
          <div className={styles.info}>
            <div className={`${styles.line} ${styles.line_title}`} />
            <div className={`${styles.line} ${styles.line_text}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
