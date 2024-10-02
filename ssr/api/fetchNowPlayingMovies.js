import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from './constants.js';

export const fetchNowPlayingMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.POPULAR, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};
