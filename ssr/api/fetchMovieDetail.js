import {
  FETCH_OPTIONS,
  TMDB_MOVIE_DETAIL_URL,
  MOVIE_DETAIL,
} from './constants.js';

export const fetchMovieDetail = async (id) => {
  const response = await fetch(
    `${TMDB_MOVIE_DETAIL_URL}${MOVIE_DETAIL(id)}`,
    FETCH_OPTIONS
  );

  return await response.json();
};
