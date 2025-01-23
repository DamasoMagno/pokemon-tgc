import { Header } from "@/components/header";
import { Pokemon } from "@/components/pokemon";
import { usePokemon } from "@/context/pokemon";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";

export function RootLayout() {
  const { pokemonId } = usePokemon();

  return (
    <>
      <Header />

      <main className={styles.content}>
        <Outlet />
      </main>

      {!!pokemonId && <Pokemon />}
    </>
  );
}
