import { Search as SearchIcon } from "lucide-react";

import styles from "./styles.module.css";
import { useDebounce } from "../../hooks/useDebounce";

type Props = {
  onSearch: (search: string) => void;
  placeholder: string;
};

export function Search({ onSearch, placeholder }: Props) {
  // Use the custom debounce hook to limit the search rate to 250ms
  const debounce = useDebounce(250);

  const handleSearchPokemon = debounce((search: string) => {
    onSearch(search);
  });

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.inputSearch}
        onChange={(e) => handleSearchPokemon(e.target.value)}
        placeholder={placeholder}
      />
      <SearchIcon size={14} color="rgba(99, 101, 102, 1)" />
    </div>
  );
}
