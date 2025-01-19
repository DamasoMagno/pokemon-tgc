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

  const firstPages =
    totalPages > 10
      ? Array.from({ length: 8 })
          .map((_, index) => index + 1)
          .slice(-15)
      : Array.from({ length: 15 }).map((_, index) => index + 1);

  const formattedPages =
    totalPages > 10 ? [...firstPages, totalPages] : [...firstPages];

  const buttonCurrentPage = (selectedPage: number) => {
    return selectedPage === page ? styles.active : null;
  };

  return (
    <ul className={styles.buttonsPage}>
      <button onClick={previousPage} className={styles.buttonPage}>
        <ChevronLeft />
        Anterior
      </button>

      {formattedPages.map((page) => {
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
