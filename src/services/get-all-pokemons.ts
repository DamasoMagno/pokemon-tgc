import { api } from "../services/api";
import { PokemonQueryProps } from "../types";

type Props = {
  params: {
    pokemon?: string;
    order?: string;
  };
  page: number;
};

export async function getAllPokemonCards({ page, params }: Props) {
  let url: string;
  const pageSize = 20;

  if (params.pokemon && params.order) {
    url = `cards?q=name:${params.pokemon}*&orderBy=${params.order}`;
  } else if (params.pokemon) {
    url = `cards?q=name:${params.pokemon}*`;
  } else if (params.order) {
    url = `cards?orderBy=${params.order}`;
  } else {
    url = `cards`;
  }

  try {
    const { data: response } = await api.get<PokemonQueryProps>(url, {
      params: {
        pageSize,
        page,
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
