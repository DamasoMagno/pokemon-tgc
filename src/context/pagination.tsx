import { createContext, useContext, useEffect, useState } from "react";

type PaginationContextProps = {
  totalPages: number;
  page: number;
  previousPage: VoidFunction;
  nextPage: VoidFunction;
  setCurrentPage: (page: number) => void;
  setPages: (page: number) => void;
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
  setPages: () => {},
});

export function PaginationProvider({ children }: DetailsProviderProps) {
  const [totalPages, setTotalPages] = useState(0);
  const searchParams = new URLSearchParams(window.location.search);

  const [pagination, setPagination] = useState(
    () => Number(searchParams.get("pagination")) || 1
  );

  const updateURL = () => {
    searchParams.set("pagination", String(pagination));

    const baseURL = window.location.origin + window.location.pathname;
    const newURL = `${baseURL}?${searchParams.toString()}`;

    window.history.pushState(null, "", newURL);
  };

  useEffect(() => {
    updateURL();
  }, [pagination]);

  const previousPage = () => {
    if (pagination > 1) {
      setPagination((state) => state - 1);
    }
  };

  const nextPage = () => {
    setPagination((state) => state + 1);
  };

  const setCustomPage = (page: number) => {
    setPagination(page);
  };

  const setPages = (pages: number) => {
    setTotalPages(pages);
  };

  return (
    <PaginationContext.Provider
      value={{
        totalPages,
        setPages,
        nextPage,
        page: pagination,
        previousPage,
        setCurrentPage: setCustomPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export const usePagination = () => useContext(PaginationContext);
