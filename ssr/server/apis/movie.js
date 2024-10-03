import { TMDB_API_URL, FETCH_OPTIONS } from "../constant.js";

export const fetchMovies = async (listType) => {
  const fetchURL =
    TMDB_API_URL.MOVIE_LISTS[listType] ?? TMDB_API_URL.MOVIE_LISTS.NOW_PLAYING;
  const response = await fetch(fetchURL, FETCH_OPTIONS);

  return await response.json();
};

export const fetchMovieDetail = async (movieId) => {
  const fetchURL = TMDB_API_URL.MOVIE_DETAIL_URL(movieId);
  const response = await fetch(fetchURL, FETCH_OPTIONS);

  return await response.json();
};
