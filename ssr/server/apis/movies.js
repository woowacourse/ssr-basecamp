import { TMDB_MOVIE_LISTS, TMDB_MOVIE_DETAIL_URL, FETCH_OPTIONS } from "../constants.js";

export const fetchMoviesByCategory = async (category) => {
  const response = await fetch(TMDB_MOVIE_LISTS[category], FETCH_OPTIONS);
  const data = await response.json();

  return data;
};

export const fetchDetailMovie = async (id) => {
  const url = TMDB_MOVIE_DETAIL_URL + id;
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data;
};
