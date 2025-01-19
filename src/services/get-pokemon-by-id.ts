import { api } from "@/services/api";
import { PokemonProps } from "@/types";

export async function getPokemonById(pokemonId: string) {
  try {
    const response = await api.get<{ data: PokemonProps }>(`cards/${pokemonId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
