import logoImage from "@/assets/logo.svg";

import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/">
          <img src={logoImage} alt="Logotipo Pokémon" />
        </Link>
        <a className={styles.headerParagraph} href="https://docs.pokemontcg.io/" target="_blank">Documentação</a>
      </div>
    </header>
  );
}
