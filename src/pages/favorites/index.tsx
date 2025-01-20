import { useState } from "react";


import { usePokemon } from "@/context/pokemon";

import { Header } from "@/components/header";
import { Pagination } from "@/components/pagination";
import { Pokemon } from "@/components/pokemon";

import styles from "./styles.module.css";

export function Favorites() {
  const { open, handleOpenSelectPokemonModal } = usePokemon();
  const [pokemons,] = useState(() => {
    const favorites = localStorage.getItem("@pokemontgc-favorites") || "[]";
    return JSON.parse(favorites);
  });

  return (
    <>
      <div>
        <Header />

        <main className={styles.content}>
          <div className={styles.filters}>
            {/* <Search onSearch={setPokemon} placeholder="Pesquise um pokemon" /> */}
            {/* <Order onOrder={setOrder} /> */}
          </div>

          <ul>
            {pokemons.map((pokemonId: string) => (
              <li key={pokemonId}>
                <button onClick={() => handleOpenSelectPokemonModal(pokemonId)}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    alt={pokemonId}
                  />
                </button>
              </li>
            ))}
          </ul>

          <footer>
            <Pagination />
          </footer>
        </main>
      </div>

      {open && <Pokemon />}
    </>
  );
}
