import { api } from "../services/api";
import { PokemonQueryProps } from "../types";

type Props = {
  params: {
    pokemon?: string;
    order?: string;
  };
  selectedPage: number;
  setTotalPageCount: (pages: number) => void;
};

export async function getAllPokemonCards({
  selectedPage,
  params,
  setTotalPageCount,
}: Props) {
  let url: string;

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
        pageSize: 20,
        page: selectedPage,
      },
    });

    const pagination = {
      totalPages: Math.ceil(response.totalCount / response.pageSize),
      currentPage: response.page,
      totalCount: response.totalCount,
    };

    setTotalPageCount(pagination.totalPages);

    return {
      pokemons: response.data,
      pagination,
    };
  } catch (error) {
    console.error(error);
  }
}
