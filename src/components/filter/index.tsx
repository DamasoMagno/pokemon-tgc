import { usePagination } from "@/context/pagination";
import styles from "./styles.module.css";

type Props = {
  onOrder: (search: string) => void;
};

export function Order({ onOrder }: Props) {
  const { page } = usePagination()

  const handleSelectFilter = (order: string) => {
    onOrder(order);
  };

  return (
    <div className={styles.searchContainer}>
      <select
        className={styles.inputSearch}
        disabled={page >= 700}
        onChange={(e) => handleSelectFilter(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="name">Nome alfabético</option>
        <option value="-name">Nome alfabético</option>
      </select>
    </div>
  );
}
