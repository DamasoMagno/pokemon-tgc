import { useMemo, useState } from "react";

import { usePokemon } from "@/context/pokemon";

import { Pokemon } from "@/components/pokemon";

import styles from "./styles.module.css";
import { FavoritedPokemonProps } from "@/types";
import { Search } from "@/components/search";

export function Favorites() {
  const { modalPokemonIsOpen, handleOpenSelectPokemonModal } = usePokemon();

  const [pokemon, setPokemon] = useState("");

  const filteredPokemons = useMemo(() => {
    const favorites: FavoritedPokemonProps[] =
      JSON.parse(localStorage.getItem("@tcg:pokemons") as string) || [];

    return favorites.filter((currentPokemon) =>
      currentPokemon.name.toLowerCase().includes(pokemon.toLowerCase())
    );
  }, [pokemon]);

  return (
    <>
      <div>
        <main className={styles.content}>
          <div className={styles.filters}>
            <Search onSearch={setPokemon} placeholder="Pesquise um pokemon" />
            {/* <Order onOrder={setOrder} /> */}
          </div>

          <ul>
            {filteredPokemons.map((pokemon) => (
              <li key={pokemon.id}>
                <button
                  onClick={() => handleOpenSelectPokemonModal(pokemon.id)}
                >
                  <img
                    src={pokemon.image}
                    width={10}
                    alt={`Carta pokemon de ${pokemon.name}`}
                  />
                </button>
                <p>{pokemon.name}</p>
                <ul>
                  {pokemon.types.map((pokemon) => (
                    <li key={pokemon}>{pokemon}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </main>
      </div>

      {modalPokemonIsOpen && <Pokemon />}
    </>
  );
}
