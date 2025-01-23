import { Link } from "react-router-dom";

import styles from "./styles.module.css";

import logoImage from "@/assets/logo.svg";
import { useAuthStore } from "@/store/authStore";

export function Header() {
  const { user, signOut, authenticate } = useAuthStore();

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
          <button
            className={styles.signIn}
            onClick={user?.id ? signOut : authenticate}
          >
            {user?.id ? "Sair" : "Entrar"}
          </button>
        </nav>
      </div>
    </header>
  );
}
