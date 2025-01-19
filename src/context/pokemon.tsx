import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PokemonProps } from "@/types";
import { getPokemonById } from "@/services/get-pokemon-by-id";

type PokemonContextProps = {
  open: boolean;
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
  const [open, setOpen] = useState(false);

  const handleOpenSelectPokemonModal = (pokemonId: string) => {
    setOpen(true);
    setPokemonId(pokemonId);
  };

  const handleCloseSelectPokemonModal = () => {
    setOpen(false);
    setPokemonId("");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    enabled: open && !!pokemonId,
  });

  return (
    <PokemonContext.Provider
      value={{
        open,
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
