import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PaginationProvider } from "./context/pagination";
import { PokemonProvider } from "./context/pokemon";

import "./styles/global.css";
import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
      <PaginationProvider>
        <PokemonProvider>
          <Routes />
        </PokemonProvider>
      </PaginationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
