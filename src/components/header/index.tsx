import { Link } from "react-router-dom";

import styles from "./styles.module.css";

import logoImage from "@/assets/logo.svg";
import { useAuthStore } from "@/store/authStore";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, signOut, authenticate } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuVisibility = () => {
    setMenuOpen((state) => !state);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logo}>
          <img src={logoImage} alt="Logotipo Pokémon" />
        </Link>

        <button
          className={styles.menuToggle}
          onClick={toggleMenuVisibility}
          aria-label="Abrir ou fechar menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`${styles.navigation} ${
            menuOpen ? styles.navigationOpen : ""
          }`}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Cartas
          </Link>
          <Link to="/favorites" onClick={() => setMenuOpen(false)}>
            Favoritos
          </Link>
          <a
            href="https://docs.pokemontcg.io/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Documentação
          </a>
          <button
            className={styles.signIn}
            onClick={() => {
              setMenuOpen(false);
              user?.id ? signOut() : authenticate();
            }}
          >
            {user?.id ? "Sair" : "Entrar"}
          </button>
        </nav>
      </div>
    </header>
  );
}
