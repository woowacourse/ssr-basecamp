import { FETCH_OPTIONS } from "./constant.js";

export const fetchMovies = async (endpoint) => {
  const response = await fetch(endpoint, FETCH_OPTIONS);
  return await response.json();
};
