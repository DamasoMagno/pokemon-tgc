import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Pokemons } from "./pages/pokemons";
import { PaginationProvider } from "./context/pagination";
import { PokemonProvider } from "./context/pokemon";

import "./styles/global.css";

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <PaginationProvider>
        <PokemonProvider>
          <Pokemons />
        </PokemonProvider>
      </PaginationProvider>
    </QueryClientProvider>
  );
}
