import { createContext, useContext, useEffect, useState } from "react";

type PaginationContextProps = {
  pokemonName: string | null;
  page: number;
  orderBy: string | null;
  setPokemonName: (name: string | null) => void;
  setPage: (page: number) => void;
  setOrderBy: (order: string | null) => void;
};

type PaginationProviderProps = {
  children: React.ReactNode;
};

export const ParamsContext = createContext<PaginationContextProps>({
  pokemonName: null,
  page: 1,
  orderBy: null,
  setPokemonName: () => {},
  setPage: () => {},
  setOrderBy: () => {},
});

export function ParamsProvider({ children }: PaginationProviderProps) {
  const searchParams = new URLSearchParams(window.location.search);

  // Estados sincronizados com os parâmetros da URL
  const [pokemonName, setPokemonName] = useState<string | null>(
    searchParams.get("pokemon") || null
  );
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [orderBy, setOrderBy] = useState<string | null>(
    searchParams.get("orderBy") || null
  );

  const updateURL = (key: string, value: string | number | null) => {
    if (value === null || value === "") {
      searchParams.delete(key); // Remove o parâmetro se o valor for nulo ou vazio
    } else {
      searchParams.set(key, String(value));
    }

    const baseURL = window.location.origin + window.location.pathname;
    const newURL = `${baseURL}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newURL);
  };

  useEffect(() => {
    updateURL("pokemon", pokemonName);
  }, [pokemonName]);

  useEffect(() => {
    updateURL("page", page);
  }, [page]);

  useEffect(() => {
    updateURL("orderBy", orderBy);
  }, [orderBy]);

  return (
    <ParamsContext.Provider
      value={{
        pokemonName,
        page,
        orderBy,
        setPokemonName,
        setPage,
        setOrderBy,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
}

// Hook para acessar o contexto
export const useParams = () => useContext(ParamsContext);
