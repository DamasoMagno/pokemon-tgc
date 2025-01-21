import { useEffect, useMemo, useState } from "react";

import { usePokemon } from "@/context/pokemon";

import { Pokemon } from "@/components/pokemon";

import styles from "./styles.module.css";
import { FavoritedPokemonProps } from "@/types";
import { Search } from "@/components/search";
import { ShowPokemonCards } from "@/components/show-pokemon-cards";
import { Pagination } from "@/components/pagination";
import { usePagination } from "@/context/pagination";

export function Favorites() {
  const { setTotalPageCount, page, totalPages } = usePagination();
  const { modalPokemonIsOpen, isFavorite } = usePokemon();

  const [pokemon, setPokemon] = useState("");
  const itemPerPage = 20;

  const filteredPokemons = useMemo(() => {
    const favorites: FavoritedPokemonProps[] =
      JSON.parse(localStorage.getItem("@tcg:pokemons") as string) || [];

    return favorites.filter((currentPokemon) =>
      currentPokemon.name.toLowerCase().includes(pokemon.toLowerCase())
    );
  }, [pokemon, page, isFavorite]);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    return filteredPokemons.slice(startIndex, endIndex);
  }, [filteredPokemons, page]);

  useEffect(() => {
    setTotalPageCount(Math.ceil(filteredPokemons.length / itemPerPage));
  }, []);

  return (
    <>
      <main className={styles.content}>
        <div className={styles.filters}>
          <Search onSearch={setPokemon} placeholder="Pesquise um pokemon" />
        </div>

        {ShowPokemonCards({
          data: {
            pokemons: paginatedPokemons,
            pagination: {
              currentPage: page,
              totalCount: filteredPokemons.length,
              totalPages: totalPages,
            },
          },
          loading: false,
        })}

        <footer>
          <Pagination />
        </footer>
      </main>

      {modalPokemonIsOpen && <Pokemon />}
    </>
  );
}
