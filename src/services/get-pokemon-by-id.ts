import { api } from "../services/api";
import { Pokemon as IPokemon } from "../types";

export async function getPokemonById(pokemonId: string) {
  try {
    const response = await api.get<{ data: IPokemon }>(`cards/${pokemonId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
