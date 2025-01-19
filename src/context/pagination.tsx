import { createContext, useContext, useEffect, useState } from "react";

type PaginationContextProps = {
  page: number
  previousPage: VoidFunction
  nextPage: VoidFunction
  setCurrentPage: (page: number) => void
};

type DetailsProviderProps = {
  children: React.ReactNode;
};

export const PaginationContext = createContext<PaginationContextProps>({
  page: 1,
  nextPage: () => {},
  previousPage: () => {},
  setCurrentPage: () => {}
});

export function PaginationProvider({ children }: DetailsProviderProps) {
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
    }, [pagination])

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

  return (
    <PaginationContext.Provider
      value={{
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

export const usePagination = () => useContext(PaginationContext)