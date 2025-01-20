import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PokemonProps } from "@/types";
import { getPokemonById } from "@/services/get-pokemon-by-id";

type PokemonContextProps = {
  modalPokemonIsOpen: boolean;
  data: PokemonProps | undefined;
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

  const handleOpenSelectPokemonModal = (pokemonId: string) => {
    setModalPokemonIsOpen(true);
    setPokemonId(pokemonId);
  };

  const handleCloseSelectPokemonModal = () => {
    setModalPokemonIsOpen(false);
    setPokemonId("");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    enabled: modalPokemonIsOpen && !!pokemonId,
  });

  return (
    <PokemonContext.Provider
      value={{
        modalPokemonIsOpen,
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
