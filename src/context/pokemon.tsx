import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FavoritedPokemonProps, PokemonProps } from "@/types";
import { getPokemonById } from "@/services/get-pokemon-by-id";

type PokemonContextProps = {
  modalPokemonIsOpen: boolean;
  data: PokemonProps | undefined;
  isFavorite: boolean | undefined;
  addPokemonToFavorites: (data: PokemonProps | undefined) => void;
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

export function PokemonProvider({ children }: PokemonProviderProps) {
  const [pokemonId, setPokemonId] = useState("");
  const [modalPokemonIsOpen, setModalPokemonIsOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleOpenSelectPokemonModal = (pokemonId: string) => {
    setModalPokemonIsOpen(true);
    setPokemonId(pokemonId);
  };

  const handleCloseSelectPokemonModal = () => {
    setModalPokemonIsOpen(false);
    setPokemonId("");
  };

  const addPokemonToFavorites = (data: PokemonProps | undefined) => {
    if (!data) return;

    let storagedFavoritePokemons: FavoritedPokemonProps[] =
      JSON.parse(localStorage.getItem("@tcg:pokemons") as string) || [];

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
        types: data?.types.map((type) => type),
      };

      storagedFavoritePokemons.push(pokemonFavorited);
      setFavorite(true);
    } else {
      storagedFavoritePokemons = storagedFavoritePokemons.filter(
        (pokemon) => pokemon.id !== data.id
      );
      setFavorite(false);
    }

    localStorage.setItem(
      "@tcg:pokemons",
      JSON.stringify(storagedFavoritePokemons)
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById({pokemonId, setFavorite: setFavorite}),
    enabled: modalPokemonIsOpen && !!pokemonId,
  });

  return (
    <PokemonContext.Provider
      value={{
        modalPokemonIsOpen,
        isFavorite: favorite,
        addPokemonToFavorites,
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
