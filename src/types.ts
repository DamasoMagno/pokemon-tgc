export type PokemonProps = {
  artist: string;
  attacks: {
    cost: string[];
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
  }[];
  cardmarket: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice?: number;
      lowPrice?: number;
      trendPrice?: number;
      reverseHoloSell?: number;
      reverseHoloTrend?: number;
      lowPriceExPlus?: number;
      avg1?: number;
      avg7?: number;
      avg30?: number;
      reverseHoloAvg1?: number;
      reverseHoloAvg7?: number;
      reverseHoloAvg30?: number;
    };
  };
  convertedRetreatCost: number;
  evolvesTo: string[];
  flavorText: string;
  hp: string;
  id: string;
  images: {
    large: string;
    small: string;
  };
  legalities: {
    unlimited: string;
  };
  level: string;
  name: string;
  nationalPokedexNumbers: number[];
  number: string;
  rarity: string;
  retreatCost: string[];
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: { unlimited: string };
    ptcgoCode?: string;
    releaseDate?: string;
    updatedAt?: string;
    images?: {
      symbol: string;
      logo: string;
    };
  };
  subtypes: string[];
  supertype: string;
  tcgplayer: {
    url: string;
    updatedAt: string;
    prices?: {
      holofoil?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number;
      };
      reverseHolofoil?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number;
      };
    };
  };
  types: string[];
  weaknesses: {
    type: string;
    value: string;
  }[];
};

export type FavoritedPokemonProps = {
  id: string;
  name: string;
  images: {
    small: string;
  };
  types: string[];
};


export type PokemonQueryProps = {
  data: PokemonProps[];
  totalCount: number;
  pageSize: number;
  page: number;
};

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  totalCount: number;
};
