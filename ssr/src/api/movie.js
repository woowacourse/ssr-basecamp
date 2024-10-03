import { TMDB_MOVIE_LISTS, FETCH_OPTIONS } from '../constants/constant.js';

export const fetchMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.POPULAR, FETCH_OPTIONS);
  return await response.json(); // Parse and return the response JSON
};
