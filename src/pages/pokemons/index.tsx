import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getAllPokemonCards } from "@/services/get-all-pokemons";

import { usePokemon } from "@/context/pokemon";
import { usePagination } from "@/context/pagination";

import { Search } from "@/components/search";
import { Order } from "@/components/filter";
import { Pagination } from "@/components/pagination";
import { ShowPokemonCards } from "@/components/show-pokemon-cards";
import { Pokemon } from "@/components/pokemon";

import styles from "./styles.module.css";

export function Pokemons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, setTotalPageCount } = usePagination();
  const { modalPokemonIsOpen } = usePokemon();

  const pokemon = searchParams.get("pokemon") as string;
  const order = searchParams.get("order") as string;

  const handleSearchPokemon = (pokemon: string) => {
    setSearchParams((state) => {
      if (pokemon) {
        state.set("pokemon", pokemon);
        state.set("page", "1");
      } else {
        state.delete("pokemon");
      }

      return state;
    });
  };

  const handleShowPokemonByOrder = (
    order: string | React.SyntheticEvent<HTMLSelectElement, Event>
  ) => {
    setSearchParams((state) => {
      if (order) {
        state.set("order", order as string);
        state.set("page", "1");
      } else {
        state.delete("order");
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
        <main className={styles.content}>
          <div className={styles.filters}>
            <Search
              onSearch={handleSearchPokemon}
              placeholder="Pesquise um pokemon"
            />
            <Order onSelect={handleShowPokemonByOrder} />
          </div>

          {ShowPokemonCards({ data, loading })}

          <footer>
            <Pagination />
          </footer>
        </main>
      </div>

      {modalPokemonIsOpen && <Pokemon />}
    </>
  );
}
