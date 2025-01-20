import { useEffect, useRef } from "react";
import { Share, X } from "lucide-react";

import { usePokemon } from "@/context/pokemon";

import pokeBallImage from "@/assets/pokeball-icon.svg";

import styles from "./styles.module.css";
import { Skeleton } from "../pokemon-skeleton";
import { useNavigate } from "react-router-dom";

export function Pokemon() {
  const navigate = useNavigate();
  const { data, isLoading, handleCloseSelectPokemonModal } = usePokemon();

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
