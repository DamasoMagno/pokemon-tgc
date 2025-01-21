import { api } from "@/services/api";
import { FavoritedPokemonProps, PokemonProps } from "@/types";

type Pokemon = {
  pokemonId: string
  setFavorite: React.Dispatch<React.SetStateAction<boolean>>
}

export async function getPokemonById({ pokemonId, setFavorite }: Pokemon) {
  try {
    const response = await api.get<{ data: PokemonProps }>(`cards/${pokemonId}`);
    
    setFavorite(() => {
      const storagedFavoritePokemons: FavoritedPokemonProps[] =
        JSON.parse(localStorage.getItem("@tcg:pokemons") as string) || [];

      return storagedFavoritePokemons.some(
        (pokemon) => pokemon.id === response.data.data.id
      );
    })

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
