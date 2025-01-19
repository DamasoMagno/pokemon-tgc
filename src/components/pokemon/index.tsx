import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import styles from "./styles.module.css";
import { usePokemon } from "../../context/pokemon";

export function Pokemon() {
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

  return (
    <div className={styles.overlay} onClick={handleCloseOutside}>
      <main className={styles.content} ref={modalRef}>
        <header>
          <strong>Bulbassur</strong>
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
              <p>info</p>
              <span>lorem ipsum</span>
            </div>
            <div>
              <p>info</p>
              <span>lorem ipsum</span>
            </div>
            <div>
              <p>info</p>
              <span>lorem ipsum</span>
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
        </div>
      </main>
    </div>
  );
}
