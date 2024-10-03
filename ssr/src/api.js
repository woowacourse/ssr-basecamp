import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "./constant.js";

export const fetchMovieList = async (listType) => {
  const response = await fetch(TMDB_MOVIE_LISTS[listType], FETCH_OPTIONS);

  return await response.json();
};