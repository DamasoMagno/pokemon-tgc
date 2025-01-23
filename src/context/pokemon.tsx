import { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/services/supabase";

import {
  FavoritedPokemonProps,
  FavoritePokemonSupabase,
  PokemonProps,
} from "@/types";
import { getPokemonById } from "@/services/get-pokemon-by-id";
import { useAuthStore } from "@/store/authStore";
import { User } from "@supabase/supabase-js";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type PokemonContextProps = {
  data: PokemonProps | undefined;
  pokemonId: string;
  isFavorite: boolean | undefined;
  handleAddPokemonToFavorite: (data: PokemonProps | undefined) => void;
  isLoading: boolean;
  handleOpenSelectPokemonModal: (pokemonId: string) => void;
  handleCloseSelectPokemonModal: () => void;
};

type PokemonProviderProps = {
  children: React.ReactNode;
};

export const PokemonContext = createContext<PokemonContextProps>(
  {} as PokemonContextProps
);

type PokemonFavoriteProps = {
  user?: User | null;
  data?: PokemonProps | undefined;
  storageMode: "offline" | "online";
};

export function PokemonProvider({ children }: PokemonProviderProps) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { getLocalStorage, setLocalStorage } = useLocalStorage("@tcg:pokemons");

  const [pokemonId, setPokemonId] = useState("");
  const [favorite, setFavorite] = useState(false);

  const handleOpenSelectPokemonModal = (pokemonId: string) =>
    setPokemonId(pokemonId);

  const handleCloseSelectPokemonModal = () => setPokemonId("");

  const togglePokemonFavoriteStatusOffline = (data: PokemonProps | undefined) => {
    if (!data) return;

    let storagedFavoritePokemons: FavoritedPokemonProps[] =
      getLocalStorage() || [];

    const checkPokemonStatus = storagedFavoritePokemons.find(
      (pokemon) => pokemon.id === data.id
    );

    if (!checkPokemonStatus) {
      const pokemonFavorited: FavoritedPokemonProps = {
        id: data?.id,
        name: data?.name,
        images: {
          small: data?.images.small,
        },
      };

      storagedFavoritePokemons.push(pokemonFavorited);
      setFavorite(true);
    } else {
      storagedFavoritePokemons = storagedFavoritePokemons.filter(
        (pokemon) => pokemon.id !== data.id
      );
      setFavorite(false);
    }

    setLocalStorage(storagedFavoritePokemons);
  };

  const { mutateAsync: togglePokemonFavoriteStatusOnline } = useMutation({
    mutationFn: async (data: PokemonProps | undefined) => {
      try {
        if (!data) return;

        const { data: pokemonExists } = await supabase
          .from("favorite")
          .select()
          .eq("user_id", user?.id)
          .eq("card_id", data.id)
          .single();

        if (pokemonExists) {
          await supabase.from("favorite").delete().eq("id", pokemonExists.id);
          setFavorite(false);

          return;
        }

        const pokemon = {
          card_id: data.id,
          card_name: data.name,
          card_image: data.images.large,
          user_id: user?.id,
        };

        await supabase.from("favorite").insert(pokemon);
        setFavorite(true);
      } catch (error) {}
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorite-pokemons"],
      });
    },
  });

  const handleAddPokemonToFavorite = async (data: PokemonProps | undefined) => {
    if (user) {
      await togglePokemonFavoriteStatusOnline(data);
    } else {
      togglePokemonFavoriteStatusOffline(data);
    }
  };

  const pokemonIsFavorited = async ({
    data,
    storageMode,
    user,
  }: PokemonFavoriteProps) => {
    try {
      switch (storageMode) {
        case "offline":
          const storagedFavoritePokemons: FavoritedPokemonProps[] =
            getLocalStorage() || [];

          setFavorite(() => {
            return storagedFavoritePokemons.some(
              (pokemon) => pokemon.id === data?.id
            );
          });
          break;
        case "online":
          const {
            data: favoritePokemons,
          }: { data: FavoritePokemonSupabase[] | null } = await supabase
            .from("favorite")
            .select()
            .eq("user_id", user?.id);

          if (!favoritePokemons?.length) return [];

          setFavorite(() => {
            return favoritePokemons.some((card) => card.card_id === data?.id);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", pokemonId, user],
    queryFn: async () => {
      const storageMode: "offline" | "online" = user ? "online" : "offline";
      const data = await getPokemonById({ pokemonId });

      await pokemonIsFavorited({
        data,
        storageMode,
        user,
      });

      return data;
    },
    enabled: !!pokemonId,
  });

  return (
    <PokemonContext.Provider
      value={{
        isFavorite: favorite,
        pokemonId,
        handleAddPokemonToFavorite,
        data,
        isLoading,
        handleCloseSelectPokemonModal,
        handleOpenSelectPokemonModal,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemon = () => useContext(PokemonContext);
