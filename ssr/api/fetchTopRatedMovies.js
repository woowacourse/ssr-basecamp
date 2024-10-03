import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from './constants.js';

export const fetchTopRatedMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.TOP_RATED, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};
