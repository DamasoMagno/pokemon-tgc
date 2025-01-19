import styles from "./styles.module.css";

type Props = {
  onOrder: (search: string) => void;
};

export function Order({ onOrder }: Props) {
  const handleSelectFilter = (order: string) => {
    onOrder(order);
  };

  return (
    <div className={styles.searchContainer}>
      <select
        className={styles.inputSearch}
        onChange={(e) => handleSelectFilter(e.target.value)}
      >
        <option value="name">Nome alfabético</option>
        <option value="-  name">Nome alfabético</option>
      </select>
    </div>
  );
}
