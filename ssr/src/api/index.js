import fetch from "node-fetch";
import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "./constant.js";

export const getPopularMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.POPULAR, FETCH_OPTIONS);

  return await response.json();
};
