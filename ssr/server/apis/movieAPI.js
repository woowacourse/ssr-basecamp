import {
  TMDB_MOVIE_LISTS,
  FETCH_OPTIONS,
  TMDB_MOVIE_DETAIL_URL,
} from "../constants/api.js";

export const fetchMovies = async (movieKey) => {
  const movieEndpoint = TMDB_MOVIE_LISTS[movieKey];
  const response = await fetch(movieEndpoint, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};

export const fetchMovieDetail = async (id) => {
  const response = await fetch(
    `${TMDB_MOVIE_DETAIL_URL}/${id}?language=ko-KR`,
    FETCH_OPTIONS
  );
  const data = await response.json();

  return data;
};
