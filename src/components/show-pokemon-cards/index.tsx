import pokeBallImage from "../../assets/pokeball-icon.svg";
import { Loader2 } from "lucide-react";
import styles from "./styles.module.css";
import { Pokemon } from "../../types";
import { PokemonCard } from "../pokemon-card";
import { usePokemon } from "../../context/pokemon";
import { PokemonCardSkeleton } from "../pokemon-card-skeleton";

type PokemonContent = {
  pokemons: Pokemon[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
  };
};

type Content = {
  loading: boolean;
  data: PokemonContent | undefined;
};

export function ShowPokemonCards({ loading, data }: Content) {
  const { handleOpenSelectPokemonModal } = usePokemon();

  if (loading) {
    return (
      <div>
        <div className={styles.summary}>
          <img src={pokeBallImage} alt="Pokebola"  />
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
            Total: <strong>{data?.pagination.totalCount} Pokémons</strong>
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
