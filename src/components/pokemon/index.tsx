import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import pokeBallImage from "../../assets/pokeball-icon.svg";

import styles from "./styles.module.css";
import { usePokemon } from "../../context/pokemon";

export function Pokemon() {
  const { data, handleCloseSelectPokemonModal } = usePokemon();

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

          <p>{data?.flavorText}</p>
        </div>
      </main>
    </div>
  );
}

// function Skeleton() {
//   return (
//     <>
//       <header>
//         <div />
//         <button>
//           <X />
//         </button>
//       </header>

//       <div>
//         <div className={styles.cardImage} />

//         <div className={styles.pokemonTypes}>
//           {Array.from({ length: 2 }).map((_, index) => (
//             <span key={index} />
//           ))}
//         </div>

//         <div className={styles.pokemonStatus}>
//           <div>
//             <header>
//               <img src={pokeBallImage} alt="Pokebola" />
//               <p>info</p>
//             </header>
//             <span />
//           </div>

//           <div>
//             <header>
//               <img src={pokeBallImage} alt="Pokebola" />
//               <p>info</p>
//             </header>
//             {Array.from({ length: 2 }).map((_, index) => (
//               <span key={index} />
//             ))}
//           </div>
//         </div>

//         <p />
//       </div>
//     </>
//   );
// }
