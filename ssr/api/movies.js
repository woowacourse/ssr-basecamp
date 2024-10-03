import {
  FETCH_OPTIONS,
  PATH_TO_API,
  TMDB_MOVIE_DETAIL_URL,
  TMDB_MOVIE_LISTS,
} from '../constant.js';

export const fetchMovies = async (endpoint) => {
  const response = await fetch(
    TMDB_MOVIE_LISTS[PATH_TO_API[endpoint]],
    FETCH_OPTIONS
  );

  return await response.json();
};

export const fetchMovieDetail = async (id) => {
  const response = await fetch(`${TMDB_MOVIE_DETAIL_URL}${id}`, FETCH_OPTIONS);

  return await response.json();
};
