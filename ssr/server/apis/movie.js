import { TMDB_API_URL, FETCH_OPTIONS } from "../constant.js";

export const fetchMovies = async ({ type }) => {
  const response = await fetch(TMDB_API_URL.MOVIE_LISTS[type], FETCH_OPTIONS);

  return await response.json();
};
