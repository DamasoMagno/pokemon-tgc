import logoImage from "@/assets/logo.svg";

import styles from "./styles.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img src={logoImage} alt="Logotipo Pokémon" />
        <a className={styles.headerParagraph} href="https://docs.pokemontcg.io/" target="_blank">Documentação</a>
      </div>
    </header>
  );
}
