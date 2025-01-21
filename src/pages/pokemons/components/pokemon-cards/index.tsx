import pokeBallImage from "@/assets/pokeball-icon.svg";

import { FavoritedPokemonProps, PaginationProps } from "@/types";
import { PokemonCard } from "@/components/pokemon-card";
import { usePokemon } from "@/context/pokemon";

import { PokemonCardSkeleton } from "@/components/pokemon-card-skeleton";

import styles from "./styles.module.css";

type PokemonCardDataProps = {
  pokemons: FavoritedPokemonProps[];
  pagination: PaginationProps;
};

type Props = {
  loading: boolean;
  data?: PokemonCardDataProps;
};

export function PokemonCards({ loading, data }: Props) {
  const { handleOpenSelectPokemonModal } = usePokemon();

  if (loading) {
    return (
      <div>
        <div className={styles.summary}>
          <img src={pokeBallImage} alt="Pokebola" />
          <p>
            Total: <strong>0 Pokémons</strong>
          </p>
        </div>
        <ul className={styles.cards}>
          {Array.from({ length: 20 }).map((_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </ul>
      </div>
    );
  }

  if (data?.pokemons.length === 0) {
    return (
      <div className={styles.pokemonNotFound}>
        <strong>Pokemon não encontrado</strong>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.summary}>
          <img src={pokeBallImage} alt="Pokebola" />
          <p>
            Total:{" "}
            <strong>
              {data?.pagination?.totalCount.toLocaleString("pt-BR")} Pokémons
            </strong>
          </p>
        </div>
        <ul className={styles.cards}>
          {data?.pokemons.map((pokemon) => (
            <PokemonCard
              pokemon={pokemon}
              key={pokemon.id}
              onClick={() => handleOpenSelectPokemonModal(pokemon.id)}
            />
          ))}
        </ul>
      </div>
    );
  }
}
