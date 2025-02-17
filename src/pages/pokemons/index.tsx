import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getAllPokemonCards } from "@/services/get-all-pokemons";

import { Search } from "@/components/search";
import { Order } from "@/components/filter";
import { Pagination } from "@/components/pagination";
import { PokemonCards } from "./components/pokemon-cards";

import styles from "./styles.module.css";
import { usePagination } from "@/context/pagination";

export function Pokemons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = usePagination();

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

  const handleOrderPokemons = (
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
        page,
      }),
  });

  return (
    <>
      <div className={styles.filters}>
        <Search onSearch={handleSearchPokemon} />
        <Order onSelect={handleOrderPokemons} />
      </div>

      {PokemonCards({ data, loading })}

      <footer>
        <Pagination totalPages={data?.pagination.totalPages ?? 1} />
      </footer>
    </>
  );
}
