import { api } from "../services/api";
import { PokemonQueryProps } from "../types";

type Props = {
  pokemon: string;
  order: string;
  selectedPage: number;
};

export async function getAllPokemonCards({
  selectedPage,
  pokemon,
  order,
}: Props) {
  let url = pokemon
    ? `cards?q=name:${pokemon}*&orderBy=${order}`
    : `cards`;

  try {
    const { data: response } = await api.get<PokemonQueryProps>(url, {
      params: {
        pageSize: 20,
        page: selectedPage,
      },
    });

    const pagination = {
      totalPages: Math.ceil(response.totalCount / response.pageSize),
      currentPage: response.page,
      totalCount: response.totalCount,
    };

    return {
      pokemons: response.data,
      pagination,
    };
  } catch (error) {
    console.error(error);
  }
}
