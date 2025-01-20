import { ComponentProps } from "react";

import { PokemonProps } from "@/types";

import styles from "./styles.module.css";

type Props = ComponentProps<"button"> & {
  pokemon: PokemonProps;
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
        </div>

        <div className={styles.cardInfo}>
          <span>{pokemon.types}</span>
          <span>{pokemon.rarity}</span>
        </div>
      </div>
    </button>
  );
}
