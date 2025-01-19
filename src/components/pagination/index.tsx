import { Pagination as IPagination } from "../../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./styles.module.css";
import { usePagination } from "../../context/pagination";

type Props = {
  pagination?: IPagination;
};

export function Pagination({ pagination }: Props) {
  const { previousPage, setCurrentPage, nextPage, page } = usePagination();

  const totalPages = pagination ? pagination.totalPages : 0;
  const startPage = Math.max(1, page - 4); 
  const endPage = Math.min(totalPages, page + 5); 

  const displayedPages = Array.from({ length: endPage - startPage + 1 }).map(
    (_, index) => startPage + index
  )

  if (displayedPages[displayedPages.length - 1] !== totalPages) {
    displayedPages.push(totalPages);
  }

  const buttonCurrentPage = (selectedPage: number) => {
    return selectedPage === page ? styles.active : null;
  };

  return (
    <ul className={styles.buttonsPage}>
      <button onClick={previousPage} className={styles.buttonPage}>
        <ChevronLeft />
        Anterior
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
        Próximo
        <ChevronRight />
      </button>
    </ul>
  );
}
