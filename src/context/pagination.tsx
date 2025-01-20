import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

type PaginationContextProps = {
  totalPages: number;
  page: number;
  previousPage: VoidFunction;
  nextPage: VoidFunction;
  setCurrentPage: (page: number) => void;
  setTotalPageCount: (page: number) => void;
};

type DetailsProviderProps = {
  children: React.ReactNode;
};

export const PaginationContext = createContext<PaginationContextProps>({
  totalPages: 100,
  page: 1,
  nextPage: () => {},
  previousPage: () => {},
  setCurrentPage: () => {},
  setTotalPageCount: () => {},
});

export function PaginationProvider({ children }: DetailsProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [totalPages, setTotalPages] = useState(0);

  const page = Number(searchParams.get("page")) || 1

  const previousPage = () => {
    if (page > 1) {
      setSearchParams((state) => {
        state.set("page", String(page - 1))
        return state
      })
    }
  };

  const nextPage = () => {
    setSearchParams((state) => {
      state.set("page", String(page + 1))
      return state
    })
  };

  const setCustomPage = (page: number) => {
    setSearchParams((state) => {
      state.set("page", String(page))
      return state
    })
  };

  const setTotalPageCount = (pageCount: number) => {
    setTotalPages(pageCount);
  }

  return (
    <PaginationContext.Provider
      value={{
        totalPages,
        setTotalPageCount,
        nextPage,
        page,
        previousPage,
        setCurrentPage: setCustomPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export const usePagination = () => useContext(PaginationContext);
