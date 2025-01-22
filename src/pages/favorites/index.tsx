import { useMemo, useState } from "react";

import { FavoritedPokemonProps } from "@/types";

import { usePagination } from "@/context/pagination";
import { usePokemon } from "@/context/pokemon";

import { Search } from "@/components/search";
import { FavoritePokemonCards } from "./components/favorite-pokemon-cards";
import { Pagination } from "@/components/pagination";
import { Pokemon } from "@/components/pokemon";

import styles from "./styles.module.css";

export function Favorites() {
  const { page } = usePagination();
  const { pokemonId, isFavorite } = usePokemon();

  const [pokemon, setPokemon] = useState("");

  const itemsPerPage = 20;
  const skipPokemons = (page - 1) * itemsPerPage;
  const currentPokemons = skipPokemons + itemsPerPage;

  const filteredPokemons = useMemo(() => {
    const favorites: FavoritedPokemonProps[] =
      JSON.parse(localStorage.getItem("@tcg:pokemons") as string) || [];

    return favorites.filter((currentPokemon) =>
      currentPokemon.name.toLowerCase().includes(pokemon.toLowerCase())
    );
  }, [pokemon, isFavorite]);

  const formattedTotalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const totalCountPokemons = filteredPokemons.length;

  const pokemons = filteredPokemons.slice(
    skipPokemons,
    currentPokemons
  );

  return (
    <>
      <main className={styles.content}>
        <div className={styles.filters}>
          <Search onSearch={setPokemon} placeholder="Pesquise um pokemon" />
        </div>

        {FavoritePokemonCards({
          totalCountPokemons,
          pokemons,
        })}

        <footer>
          <Pagination totalPages={formattedTotalPages} />
        </footer>
      </main>

      {!!pokemonId && <Pokemon />}
    </>
  );
}
