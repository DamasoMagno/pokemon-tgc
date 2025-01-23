import { create } from "zustand";
import { useSearchParams } from "react-router-dom";

type PaginationState = {
  page: number;
  nextPage: VoidFunction;
  previousPage: VoidFunction;
  setCurrentPage: (page: number) => void;
};

export const usePaginationStore = create<PaginationState>((set) => {
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1; 

  return {
    page: initialPage,

    nextPage: () => {
      set((state) => {
        const nextPage = state.page + 1;
        const [, setSearchParams] = useSearchParams();

        setSearchParams((params) => {
          params.set("page", String(nextPage));
          return params;
        });
        
        return { page: nextPage };
      });
    },
    
    previousPage: () => {
      set((state) => {
        if (state.page > 1) {
          const previousPage = state.page - 1;
          const [, setSearchParams] = useSearchParams();

          setSearchParams((params) => {
            params.set("page", String(previousPage));
            return params;
          });

          return { page: previousPage };
        }
        return state;
      });
    },

    setCurrentPage: (page: number) => {
      const [, setSearchParams] = useSearchParams();

      setSearchParams((params) => {
        params.set("page", String(page));
        return params;
      });

      set({ page });
    },
  };
});
