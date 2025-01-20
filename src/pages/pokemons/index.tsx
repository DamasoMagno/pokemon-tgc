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
import { useSearchParams } from "react-router-dom";

export function Pokemons() {
  const { page, setTotalPageCount } = usePagination();
  const { open } = usePokemon();
  const [searchParams, setSearchParams] = useSearchParams();

  const pokemon = searchParams.get("pokemon") as string;
  const order = searchParams.get("order") as string;

  const handleFilterPokemon = (key: string, value: string) => {
    setSearchParams((state) => {
      if (key && value) {
        state.set(key, value);
      } else if (key && value === "") {
        state.delete(key);
      } else {
        state.delete(key);
      }

      return state;
    });
  };

  const { data, isLoading: loading } = useQuery({
    queryKey: ["pokemons", pokemon, order, page],
    queryFn: async () =>
      getAllPokemonCards({
        params: {
          order,
          pokemon,
        },
        selectedPage: page,
        setTotalPageCount,
      }),
  });

  return (
    <>
      <div>
        <Header />

        <main className={styles.content}>
          <div className={styles.filters}>
            <Search
              onSearch={(e) => handleFilterPokemon("pokemon", e)}
              placeholder="Pesquise um pokemon"
            />
            <Order onSelect={(e) => handleFilterPokemon("pokemon", e as string)} />
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
