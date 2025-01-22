import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

type PaginationContextProps = {
  page: number;
  previousPage: VoidFunction;
  nextPage: VoidFunction;
  setCurrentPage: (page: number) => void;
};

type PaginationProviderProps = {
  children: React.ReactNode;
};

export const PaginationContext = createContext<PaginationContextProps>({
  page: 1,
  nextPage: () => {},
  previousPage: () => {},
  setCurrentPage: () => {},
});

export function PaginationProvider({ children }: PaginationProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const setPeviousPage = () => {
    if (page > 1) {
      setSearchParams((state) => {
        state.set("page", String(page - 1));
        return state;
      });
    }
  };

  const setNextPage = () => {
    setSearchParams((state) => {
      state.set("page", String(page + 1));
      return state;
    });
  };

  const setCustomPage = (page: number) => {
    setSearchParams((state) => {
      state.set("page", String(page));
      return state;
    });
  };

  return (
    <PaginationContext.Provider
      value={{
        nextPage: setNextPage,
        page,
        previousPage: setPeviousPage,
        setCurrentPage: setCustomPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export const usePagination = () => useContext(PaginationContext);
