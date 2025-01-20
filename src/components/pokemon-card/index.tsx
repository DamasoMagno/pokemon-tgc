import { ComponentProps } from "react";

import { FavoritedPokemonProps} from "@/types";

import styles from "./styles.module.css";

type Props = ComponentProps<"button"> & {
  pokemon: FavoritedPokemonProps;
};

export function PokemonCard({ pokemon, ...props }: Props) {
  return (
    <button className={styles.card} {...props}>
      <div className={styles.cardImage}>
        <img
          src={pokemon.images.small}
          alt={`Carta pokemon de ${pokemon.name}`}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <strong>{pokemon.name}</strong>
          <span>#{pokemon.id}</span>
        </div>
      </div>
    </button>
  );
}
