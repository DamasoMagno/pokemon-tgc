import { Pokemon } from "@/pages/pokemon";
import { Favorites } from "@/pages/favorites";
import { Pokemons } from "@/pages/pokemons";
import { Routes as ReactRoutes, Route } from "react-router-dom";

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Pokemons />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/pokemon/:pokemonId" element={<Pokemon />} />
    </ReactRoutes>
  );
}
