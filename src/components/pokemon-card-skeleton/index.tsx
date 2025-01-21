import styles from "./styles.module.css";

export function PokemonCardSkeleton() {
  return (
    <button className={`${styles.card} ${styles.skeleton}`}>
      <div className={`${styles.cardImage} ${styles.skeleton}`} />

      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <div className={`${styles.skeletonLine} ${styles.full}`} />
        </div>

        <div className={styles.cardInfo}>
          <div className={`${styles.short}`} />
          <div className={`${styles.short}`} />
        </div>
      </div>
    </button>
  );
}