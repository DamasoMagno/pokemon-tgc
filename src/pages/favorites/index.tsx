import { useEffect, useMemo, useState } from "react";

import { FavoritedPokemonProps } from "@/types";

import { usePagination } from "@/context/pagination";
import { usePokemon } from "@/context/pokemon";

import { Search } from "@/components/search";
import { FavoritePokemonCards } from "./components/favorite-pokemon-cards";
import { Pagination } from "@/components/pagination";
import { Pokemon } from "@/components/pokemon";

import styles from "./styles.module.css";

export function Favorites() {
  const { setTotalPageCount, page } = usePagination();
  const { modalPokemonIsOpen, isFavorite } = usePokemon();

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

  const paginatedPokemons = filteredPokemons.slice(
    skipPokemons,
    currentPokemons
  );

  const formattedTotalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  console.log("Here");

  useEffect(() => {
    setTotalPageCount(formattedTotalPages >= 1 ? formattedTotalPages : 1);
  }, []);

  return (
    <>
      <main className={styles.content}>
        <div className={styles.filters}>
          <Search onSearch={setPokemon} placeholder="Pesquise um pokemon" />
        </div>

        {FavoritePokemonCards({
          totalCount: filteredPokemons.length,
          pokemons: paginatedPokemons,
        })}

        <footer>
          <Pagination />
        </footer>
      </main>

      {modalPokemonIsOpen && <Pokemon />}
    </>
  );
}
