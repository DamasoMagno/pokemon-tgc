import { useEffect, useRef, useState } from "react";
import { Heart, Share, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePokemon } from "@/context/pokemon";
import { Skeleton } from "../pokemon-skeleton";

import pokeBallImage from "@/assets/pokeball-icon.svg";

import styles from "./styles.module.css";

type FavoritedPokemonProps = {
  id: string;
  name: string;
  image: string;
  types: string[];
};

export function Pokemon() {
  const navigate = useNavigate();
  const { data, isLoading, handleCloseSelectPokemonModal } = usePokemon();
  const [favorite, setFavorite] = useState(() => {
    const storagedFavoritePokemons: FavoritedPokemonProps[] =
      JSON.parse(localStorage.getItem("@tcg:pokemons") as string) || [];
    return storagedFavoritePokemons.some((pokemon) => pokemon.id === data?.id);
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseSelectPokemonModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCloseOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target))
      handleCloseSelectPokemonModal();
  };

  const handleAddPokemonToFavorite = () => {
    if (!data) return;

    let storagedFavoritePokemons: FavoritedPokemonProps[] =
      JSON.parse(localStorage.getItem("@tcg:pokemons") as string) || [];

    const checkPokemonStatus = storagedFavoritePokemons.find(
      (pokemon) => pokemon.id === data.id
    );

    if (!checkPokemonStatus) {
      const pokemonFavorited: FavoritedPokemonProps = {
        id: data?.id,
        name: data?.name,
        image: data?.images.large,
        types: data?.types.map((type) => type),
      };

      storagedFavoritePokemons.push(pokemonFavorited);
      setFavorite(true);
    } else {
      storagedFavoritePokemons = storagedFavoritePokemons.filter((pokemon) => pokemon.id !== data.id);
      setFavorite(false);
    }

    localStorage.setItem(
      "@tcg:pokemons",
      JSON.stringify(storagedFavoritePokemons)
    );
  };

  const handleNavigateToPokemonDetails = () => {
    handleCloseSelectPokemonModal();
    navigate(`/pokemon/${data?.id}`);
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className={styles.overlay} onClick={handleCloseOutside}>
      <main className={styles.content} ref={modalRef}>
        <header>
          <button onClick={handleNavigateToPokemonDetails}>
            <Share />
          </button>
          <button onClick={handleAddPokemonToFavorite}>
            {favorite ? <Heart color="red" /> : <Heart />}
          </button>
          <strong>{data?.name}</strong>
          <button onClick={handleCloseSelectPokemonModal}>
            <X />
          </button>
        </header>
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
      </main>
    </div>
  );
}
