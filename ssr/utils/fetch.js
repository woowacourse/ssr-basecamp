import { FETCH_OPTIONS } from "./constants.js";

export const loadMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};
