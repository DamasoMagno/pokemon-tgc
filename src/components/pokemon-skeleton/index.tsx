import styles from "./styles.module.css";

export function Skeleton() {
  return (
    <div className={styles.overlay}>
  <main className={`${styles.content} ${styles.skeleton}`}>
    <header>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonButton}></div>
    </header>
    <div>
      <div className={styles.cardImage}>
        <div className={styles.skeletonImage}></div>
      </div>

      <div className={styles.pokemonTypes}>
        {[...Array(3)].map((_, index) => (
          <span key={index} className={styles.skeletonBadge}></span>
        ))}
      </div>

      <div className={styles.pokemonStatus}>
        <div>
          <header>
            <div className={styles.skeletonIcon}></div>
            <div className={styles.skeletonText}></div>
          </header>
          <div className={styles.skeletonText}></div>
        </div>

        <div>
          <header>
            <div className={styles.skeletonIcon}></div>
            <div className={styles.skeletonText}></div>
          </header>
          {[...Array(2)].map((_, index) => (
            <div key={index} className={styles.skeletonText}></div>
          ))}
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.skeletonParagraph}></div>
        <div className={styles.skeletonParagraph}></div>
      </div>
    </div>
  </main>
</div>
  );
}
