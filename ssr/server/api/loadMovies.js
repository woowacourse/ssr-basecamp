import fetch from "node-fetch";
import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "./constants.js";

const loadMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();
  return data.results;
};

export const loadNowPlaying = async () => await loadMovies(TMDB_MOVIE_LISTS.nowPlaying);
export const loadPopular = async () => await loadMovies(TMDB_MOVIE_LISTS.popular);
export const loadTopRated = async () => await loadMovies(TMDB_MOVIE_LISTS.topRated);
export const loadUpcoming = async () => await loadMovies(TMDB_MOVIE_LISTS.upcoming);
