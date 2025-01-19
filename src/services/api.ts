import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.pokemontcg.io/v2", 
  headers: {
    "X-Api-Key": "2f772c77-09ce-41f6-acb9-3f387447a66f", 
  },
});
