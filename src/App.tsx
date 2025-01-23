import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast"

import { PaginationProvider } from "./context/pagination";
import { PokemonProvider } from "./context/pokemon";
import { Routes } from "./routes";

import "./styles/global.css";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const client = new QueryClient();

export function App() {
  const { checkUserSession } = useAuthStore();

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <PaginationProvider>
          <PokemonProvider>
            <Routes />
            <Toaster position="top-right" />
          </PokemonProvider>
        </PaginationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
