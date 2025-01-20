import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllPokemonCards } from "@/services/get-all-pokemons";

import { usePokemon } from "@/context/pokemon";
import { usePagination } from "@/context/pagination";

import { Header } from "@/components/header";
import { Search } from "@/components/search";
import { Order } from "@/components/filter";
import { Pagination } from "@/components/pagination";
import { ShowPokemonCards } from "@/components/show-pokemon-cards";
import { Pokemon } from "@/components/pokemon";

import styles from "./styles.module.css";

export function Pokemons() {
  const { page, setPages } = usePagination();
  const { open } = usePokemon();

  const [pokemon, setPokemon] = useState("");
  const [order, setOrder] = useState("");

  console.log(order)

  const { data, isLoading: loading } = useQuery({
    queryKey: ["pokemons", pokemon, order, page],
    queryFn: async () =>
      getAllPokemonCards({
        params: {
          order,
          pokemon,
        },
        selectedPage: page,
        setPages,
      }),
  });

  return (
    <>
      <div>
        <Header />

        <main className={styles.content}>
          <div className={styles.filters}>
            <Search onSearch={setPokemon} placeholder="Pesquise um pokemon" />
            <Order onOrder={setOrder} />
          </div>

          {ShowPokemonCards({ data, loading })}

          <footer>
            <Pagination />
          </footer>
        </main>
      </div>

      {open && <Pokemon />}
    </>
  );
}
