import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.svg";

import styles from "./styles.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/">
          <img src={logoImage} alt="Logotipo Pokémon" />
        </Link>

        <nav>
          <Link to="/">Cartas</Link>
          <Link to="/favorites">Favoritos</Link>
          <a
            className={styles.headerParagraph}
            href="https://docs.pokemontcg.io/"
            target="_blank"
          >
            Documentação
          </a>
        </nav>
      </div>
    </header>
  );
}
