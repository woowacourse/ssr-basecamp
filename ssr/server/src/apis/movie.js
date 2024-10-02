import {
  FETCH_OPTIONS,
  TMDB_MOVIE_LISTS,
  TMDB_MOVIE_DETAIL_URL,
} from "../constants/index.js";

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

export const fetchMovieDetail = async (movieId) => {
  const url = TMDB_MOVIE_DETAIL_URL + movieId;
  const params = new URLSearchParams({
    language: "ko-KR",
  });

  const response = await fetch(url + "?" + params, FETCH_OPTIONS);

  return await response.json();
};
