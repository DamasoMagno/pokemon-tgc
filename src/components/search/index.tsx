import { Search as SearchIcon } from "lucide-react";
import { ComponentProps } from "react";

import { useDebounce } from "@/hooks/useDebounce";

import styles from "./styles.module.css";

type Props = ComponentProps<"input"> & {
  onSearch: (search: string) => void;
};

export function Search({ onSearch, ...props }: Props) {
  // Use the custom debounce hook to limit the search rate to 250ms
  const debounce = useDebounce(500);
  
  const handleSearchPokemon = debounce((search: string) => {
    onSearch(search);
  });

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.inputSearch}
        onChange={(e) => handleSearchPokemon(e.target.value)}
        {...props}
      />
      <SearchIcon size={14} color="rgba(99, 101, 102, 1)" />
    </div>
  );
}
