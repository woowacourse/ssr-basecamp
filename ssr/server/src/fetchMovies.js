import { FETCH_OPTIONS } from "./constant.js";

export const fetchMovies = async (urlPath) => {
  const response = await fetch(urlPath, FETCH_OPTIONS);

  return await response.json();
};
