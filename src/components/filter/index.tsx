import { ComponentProps } from "react";
import styles from "./styles.module.css";

type Props = ComponentProps<"select"> & {
  onSelect: (value: string) => void
};

export function Order({ onSelect }: Props) {
  const handleSelectOrder = (value: string) => {
    onSelect(value);
  }

  return (
    <div className={styles.searchContainer}>
      <select
        className={styles.inputSearch}
        onChange={e => handleSelectOrder(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="name">Nome alfabético</option>
        <option value="-name">Nome alfabético</option>
      </select>
    </div>
  );
}
