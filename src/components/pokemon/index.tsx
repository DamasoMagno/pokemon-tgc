import { useEffect, useRef } from "react";
import { Heart, X } from "lucide-react";

import { usePokemon } from "@/context/pokemon";
import { Skeleton } from "../pokemon-skeleton";

import styles from "./styles.module.css";

export function Pokemon() {
  const {
    data,
    isLoading,
    handleCloseSelectPokemonModal,
    isFavorite,
    handleAddPokemonToFavorite,
  } = usePokemon();

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
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseSelectPokemonModal();
    }
  };

  const handleAddPokemonToFavorites = () => handleAddPokemonToFavorite(data);

  return (
    <div className={styles.overlay} onClick={handleCloseOutside}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <main className={styles.content} ref={modalRef}>
          <header>
            <button onClick={handleAddPokemonToFavorites}>
              {isFavorite ? (
                <Heart color="red" fill="red" size={16} />
              ) : (
                <Heart size={16} />
              )}
            </button>
            <strong>{data?.name}</strong>
            <button onClick={handleCloseSelectPokemonModal}>
              <X size={16} color="black" />
            </button>
          </header>

          <div>
            <div className={styles.pokemonSummary}>
              <div className={styles.cardImage}>
                <img
                  src={data?.images.large}
                  width={100}
                  alt="Imageg without pokemon"
                />
              </div>

              <ul>
                {data?.rarity && (
                  <li>
                    <span>Raridade</span>
                    <strong>{data?.rarity}</strong>
                  </li>
                )}

                {data?.hp && (
                  <li>
                    <span>HP</span>
                    <strong>{data?.hp}</strong>
                  </li>
                )}
              </ul>
            </div>

            <div className={styles.pokemonDetails}>
              <div className={styles.pokemonTypes}>
                <span>Tipos</span>

                <ul>
                  {data?.types.map((type) => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.pokemonTypes}>
                <span>Ataques</span>

                <ul>
                  {data?.attacks.map((attack) => (
                    <li key={attack.name}>{attack.name}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.pokemonTypes}>
                <span>Fraquezas</span>

                <ul>
                  {data?.weaknesses.map((weakness) => (
                    <li key={weakness.type}>{weakness.type}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
