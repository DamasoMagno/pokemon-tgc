import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./styles.module.css";
import { usePagination } from "@/context/pagination";

type Props = {
  totalPages: number
}

export function Pagination({ totalPages }: Props) {
  const { previousPage, setCurrentPage, nextPage, page } =
    usePagination();
  const [countPages, setCountPages] = useState<number[]>([]);

  const buttonCurrentPage = (selectedPage: number) => {
    return selectedPage === page ? styles.active : null;
  };

  const setCountPageByDisplaySize = () => {
    let pageCount = 3;

    if (window.innerWidth < 728) {
      pageCount = 1;
    }

    let startPage: number = Math.max(1, page - pageCount);
    let endPage: number = Math.min(totalPages, page + pageCount);

    let formatted = Array.from({ length: endPage - startPage + 1 }).map(
      (_, index) => startPage + index
    );

    if (formatted[formatted.length - 1] !== totalPages) {
      formatted.push(totalPages);
    }

    if(formatted[0] !== 1){
      formatted.unshift(1);
    }

    setCountPages(formatted);
  };

  useEffect(() => {
    setCountPageByDisplaySize();

    window.addEventListener("resize", setCountPageByDisplaySize);

    return () => {
      window.removeEventListener("resize", setCountPageByDisplaySize);
    };
  }, [totalPages, page]);

  return (
    <ul className={styles.buttonsPage}>
      <button
        onClick={previousPage}
        className={styles.buttonPage}
        disabled={page === 1}
      >
        <ChevronLeft />
        <span> Anterior</span>
      </button>

      {countPages.map((page) => {
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
      <button
        onClick={nextPage}
        className={styles.buttonPage}
        disabled={page === totalPages}
      >
        <span>Próximo</span>
        <ChevronRight />
      </button>
    </ul>
  );
}
