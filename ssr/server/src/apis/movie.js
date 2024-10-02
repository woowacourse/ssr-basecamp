import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "../constants/index.js";

export const fetchMoviesNowPlaying = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.NOW_PLAYING, FETCH_OPTIONS);

  return await response.json();
};

export const fetchMoviesPopular = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.POPULAR, FETCH_OPTIONS);

  return await response.json();
};

export const fetchMoviesTopRated = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.TOP_RATED, FETCH_OPTIONS);

  return await response.json();
};

export const fetchMoviesUpcoming = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.UPCOMING, FETCH_OPTIONS);

  return await response.json();
};
