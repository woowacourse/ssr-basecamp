import { TMDB_API_URL, FETCH_OPTIONS } from "../constant.js";

export const fetchMovies = async () => {
  const response = await fetch(TMDB_API_URL.MOVIE_LISTS.POPULAR, FETCH_OPTIONS);

  return await response.json();
};
