import styles from "./styles.module.css";
import { Header } from "../../components/header";
import { Search } from "../../components/search";
import { Order } from "../../components/filter";
import { useState } from "react";
import { Pagination } from "../../components/pagination";
import { usePagination } from "../../context/pagination";
import { useQuery } from "@tanstack/react-query";
import { getAllPokemonCards } from "../../services/get-all-pokemons";
import { ShowPokemonCards } from "../../components/show-pokemon-cards";
import { Pokemon } from "../../components/pokemon";
import { usePokemon } from "../../context/pokemon";

export function Pokemons() {
  const { page } = usePagination();
  const { open } = usePokemon();

  const [pokemon, setPokemon] = useState("");
  const [order, setOrder] = useState("");

  const { data, isLoading: loading } = useQuery({
    queryKey: ["pokemons", pokemon, order, page],
    queryFn: async () =>
      getAllPokemonCards({ order, pokemon, selectedPage: page }),
  });

  const pagination = data?.pagination
    ? data.pagination
    : {
        currentPage: 1,
        totalCount: 16,
        totalPages: 10,
      };

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
            {/* <Pagination pagination={pagination} /> */}
          </footer>
        </main>
      </div>

      {open && <Pokemon />}
    </>
  );
}
