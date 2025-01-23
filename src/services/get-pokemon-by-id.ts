import { api } from "@/services/api";
import { PokemonProps } from "@/types";

type Pokemon = {
  pokemonId: string;
};

export async function getPokemonById({ pokemonId }: Pokemon) {
  try {
    const response = await api.get<{ data: PokemonProps }>(
      `cards/${pokemonId}`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
