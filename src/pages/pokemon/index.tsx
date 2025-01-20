import { useQuery } from "@tanstack/react-query";
import pokeBallImage from "@/assets/pokeball-icon.svg";

import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { getPokemonById } from "@/services/get-pokemon-by-id";

type Params = {
  pokemonId: string;
};

export function Pokemon() {
  const { pokemonId } = useParams() as Params;

  const { data } = useQuery({
    queryKey: ["pokemons", pokemonId],
    queryFn: async () => getPokemonById(pokemonId),
  });

  return (
    <div>
      <div className={styles.cardImage}>
        <img
          src={data?.images.large}
          width={100}
          alt="Imageg without pokemon"
        />
      </div>

      <div className={styles.pokemonTypes}>
        {data?.types.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </div>

      <div className={styles.pokemonStatus}>
        <div>
          <header>
            <img src={pokeBallImage} alt="Pokebola" />
            <p>info</p>
          </header>
          <span>{data?.hp} HP</span>
        </div>

        <div>
          <header>
            <img src={pokeBallImage} alt="Pokebola" />
            <p>info</p>
          </header>
          {data?.weaknesses.map((weak) => (
            <span key={weak.type}>
              {weak.type} {weak.value}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.details}>
        <p>{data?.flavorText}</p>
      </div>
    </div>
  );
}
