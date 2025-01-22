import pokeBallImage from "@/assets/pokeball-icon.svg";

import { FavoritedPokemonProps } from "@/types";
import { PokemonCard } from "@/components/pokemon-card";
import { usePokemon } from "@/context/pokemon";

import styles from "./styles.module.css";

type Props = {
  pokemons: FavoritedPokemonProps[];
  totalCountPokemons: number;
};

export function FavoritePokemonCards({ pokemons, totalCountPokemons }: Props) {
  const { handleOpenSelectPokemonModal } = usePokemon();

  return pokemons.length === 0 ? (
    <div className={styles.pokemonNotFound}>
      <strong>Pokemon não encontrado</strong>
    </div>
  ) : (
    <div>
      <div className={styles.summary}>
        <img src={pokeBallImage} alt="Pokebola" />
        <p>
          Total:{" "}
          <strong>
            {totalCountPokemons.toLocaleString("pt-BR")} Pokémons
          </strong>
        </p>
      </div>
      <ul className={styles.cards}>
        {pokemons.map((pokemon) => (
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
