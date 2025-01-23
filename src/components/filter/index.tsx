import { ComponentProps } from "react";

import styles from "./styles.module.css";
import { ChevronDown } from "lucide-react";

type Props = ComponentProps<"select"> & {
  onSelect: (value: string) => void
};

export function Order({ onSelect }: Props) {
  const handleSelectOrder = (value: string) => {
    onSelect(value);
  }

  return (
    <div className={styles.selectContainer}>
      <select
        className={styles.selectPokemon}
        onChange={e => handleSelectOrder(e.target.value)}
      >
        <option value="">Não ordenar</option>
        <option value="name">Ordem de A-Z</option>
        <option value="-name">Ordem de Z-A</option>
      </select>
      <ChevronDown size={14} color="rgba(99, 101, 102, 1)"/>
    </div>
  );
}
