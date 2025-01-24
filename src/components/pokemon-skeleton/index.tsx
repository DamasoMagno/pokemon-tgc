import styles from "./styles.module.css";

export function Skeleton() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.circle}></div>
          <div className={styles.title}></div>
          <div className={styles.circle}></div>
        </header>

        <div className={styles.pokemonSummary}>
          <div className={styles.cardImage}></div>
          <ul className={styles.stats}>
            <li>
              <div className={styles.stat}></div>
            </li>
            <li>
              <div className={styles.stat}></div>
            </li>
          </ul>
        </div>

        <div className={styles.pokemonDetails}>
          <div className={styles.detail}>
            <div className={styles.label}></div>
            <ul className={styles.items}>
              <li className={styles.item}></li>
              <li className={styles.item}></li>
            </ul>
          </div>
          <div className={styles.detail}>
            <div className={styles.label}></div>
            <ul className={styles.items}>
              <li className={styles.item}></li>
              <li className={styles.item}></li>
            </ul>
          </div>
          <div className={styles.detail}>
            <div className={styles.label}></div>
            <ul className={styles.items}>
              <li className={styles.item}></li>
              <li className={styles.item}></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
