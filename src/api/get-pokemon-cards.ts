import { api } from "../services/api";
import { PokemonQuery } from "../types";

type Props = {
  url: string;
  selectedPage: number;
};

export async function getPokemonCards({ selectedPage, url }: Props) {
  const { data } = await api.get<PokemonQuery>(url, {
    params: {
      pageSize: 10,
      page: selectedPage,
    },
  });

  return data;
}
