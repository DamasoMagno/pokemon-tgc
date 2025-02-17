import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

import { FavoritedPokemonProps, FavoritePokemonSupabase } from "@/types";
import { supabase } from "@/services/supabase";

import { usePokemon } from "@/context/pokemon";
import { useAuthStore } from "@/store/authStore";

import { Search } from "@/components/search";
import { Pagination } from "@/components/pagination";
import { PokemonCards } from "../pokemons/components/pokemon-cards";

import styles from "./styles.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePagination } from "@/context/pagination";
import { useSearchParams } from "react-router-dom";

type PokemonFavoriteProps = {
  user?: User | null;
  storageMode: "offline" | "online";
};

export function Favorites() {
  const { user, loadingUser } = useAuthStore();
  const { getLocalStorage } = useLocalStorage("@tcg:pokemons");
  const { isFavorite } = usePokemon();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = usePagination();

  const pokemon = searchParams.get("pokemon") as string;

  const [favoritePokemons, setFavoritePokemons] = useState<
    FavoritedPokemonProps[] | undefined
  >();

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

  const pokemonIsFavorited = async ({
    storageMode,
    user,
  }: PokemonFavoriteProps) => {
    try {
      switch (storageMode) {
        case "offline":
          console.log("Modo Off-line");

          const storagedFavoritePokemons: FavoritedPokemonProps[] =
            getLocalStorage() || [];

          setFavoritePokemons(storagedFavoritePokemons);
          break;

        case "online":
          console.log("Modo on-line");

          let { data }: { data: FavoritePokemonSupabase[] | null } =
            await supabase.from("favorite").select().eq("user_id", user?.id);

          if (!data) return {};

          const formattedPokemons: FavoritedPokemonProps[] = data.map(
            (pokemon) => {
              return {
                id: pokemon.card_id,
                name: pokemon.card_name,
                images: {
                  small: pokemon.card_image,
                },
              };
            }
          );

          setFavoritePokemons(formattedPokemons);
          return {};
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading: loading } = useQuery({
    queryKey: ["favorite-pokemons", pokemon, page],
    queryFn: async () => pokemonIsFavorited({ storageMode: "online", user }),
    enabled: !!user,
  });

  useEffect(() => {
    if (user) return;

    pokemonIsFavorited({ storageMode: "offline" });
  }, [isFavorite, data, user]);

  const filteredPokemons = useMemo(() => {
    return pokemon
      ? favoritePokemons?.filter((currentPokemon) =>
          currentPokemon.name.toLowerCase().includes(pokemon?.toLowerCase())
        )
      : favoritePokemons;
  }, [pokemon, favoritePokemons, loadingUser]);

  const itemsPerPage = 20;
  const skipPokemons = (page - 1) * itemsPerPage;
  const currentPokemons = skipPokemons + itemsPerPage;
  const formattedTotalPages = Math.ceil(
    (filteredPokemons?.length ?? 0) / itemsPerPage
  );
  const totalCountPokemons = filteredPokemons?.length;

  const pokemons = filteredPokemons?.slice(skipPokemons, currentPokemons);

  return (
    <>
      <div className={styles.filters}>
        <Search
          onSearch={handleSearchPokemon}
          placeholder="Pesquise um pokemon"
        />
      </div>

      {PokemonCards({
        data: {
          pokemons: pokemons,
          pagination: {
            currentPage: page,
            totalCount: totalCountPokemons ?? 0,
            totalPages: formattedTotalPages,
          },
        },
        loading: loadingUser || loading,
      })}

      {formattedTotalPages >= 1 && (
        <footer>
          <Pagination totalPages={formattedTotalPages} />
        </footer>
      )}
    </>
  );
}
