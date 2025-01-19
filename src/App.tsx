import "./styles/global.css";
import { Pokemons } from "./pages/pokemons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaginationProvider } from "./context/pagination";
import { PokemonProvider } from "./context/pokemon";

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
