import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "../constants.js";

export const loadMovies = async url => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data;
};

export const fetchMovies = async category => {
  try {
    const movieData = await loadMovies(TMDB_MOVIE_LISTS[category]);

    return movieData;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
