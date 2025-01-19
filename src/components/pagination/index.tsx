import { ChevronLeft, ChevronRight } from "lucide-react";

import { PaginationProps } from "@/types";
import { usePagination } from "@/context/pagination";

import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { formatPagination } from "@/utils/format-pagination";

type Props = {
  pagination: PaginationProps;
};

export function Pagination({ pagination }: Props) {
  const { previousPage, setCurrentPage, nextPage, page } = usePagination();

  const [displayedPages, setDisplayedPages] = useState(() => {
    const totalPages = pagination ? pagination.totalPages : 0;
    const pagesToDisplay = formatPagination(totalPages, page);

    return pagesToDisplay;
  });

  const buttonCurrentPage = (selectedPage: number) => {
    return selectedPage === page ? styles.active : null;
  };

  useEffect(() => {
    const updateDisplayedPages = () => {
      const totalPages = pagination ? pagination.totalPages : 0;
      if (window.innerWidth < 728) {
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);

        let formatted = Array.from({ length: endPage - startPage + 1 }).map(
          (_, index) => startPage + index
        );

        if (formatted[formatted.length - 1] !== totalPages) {
          formatted.push(totalPages);
        }

        setDisplayedPages(formatted);
      } else {
        const pagesToDisplay = formatPagination(totalPages, page);
        setDisplayedPages(pagesToDisplay);
      }
    };

    // Update pages on window resize
    window.addEventListener("resize", updateDisplayedPages);

    // Call the function once to set the initial state
    updateDisplayedPages();

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("resize", updateDisplayedPages);
    };
  }, [pagination, page]);

  return (
    <ul className={styles.buttonsPage}>
      <button onClick={previousPage} className={styles.buttonPage}>
        <ChevronLeft />
        <span> Anterior</span>
      </button>

      {displayedPages.map((page) => {
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(Number(page))}
            className={`${styles.buttonPage} ${buttonCurrentPage(
              Number(page)
            )}`}
          >
            {page}
          </button>
        );
      })}
      <button onClick={nextPage} className={styles.buttonPage}>
        <span>Próximo</span>
        <ChevronRight />
      </button>
    </ul>
  );
}
