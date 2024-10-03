import { FETCH_OPTIONS } from "./constant.js";

export const fetchMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);

  return await response.json();
};
