import fetch from "node-fetch";
import {
  TMDB_MOVIE_LISTS,
  FETCH_OPTIONS,
  TMDB_MOVIE_DETAIL_URL,
} from "../../src/constant.js";

export const fetchMovies = async (movieListType) => {
  const response = await fetch(TMDB_MOVIE_LISTS[movieListType], FETCH_OPTIONS);
  return await response.json();
};

export const fetchMovie = async (id) => {
  const response = await fetch(TMDB_MOVIE_DETAIL_URL + id, FETCH_OPTIONS);
  return await response.json();
};
