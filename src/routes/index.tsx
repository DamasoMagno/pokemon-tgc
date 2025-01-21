import { Routes as ReactRoutes, Route } from "react-router-dom";

import { Favorites } from "@/pages/favorites";
import { Pokemons } from "@/pages/pokemons";
import { RootLayout } from "@/layout";

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<Pokemons />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </ReactRoutes>
  );
}
