import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from './constants.js';

export const fetchUpcomingMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.UPCOMING, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};
