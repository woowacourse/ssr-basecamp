import { FETCH_OPTIONS, TMDB_MOVIE_DETAIL_URL, TMDB_MOVIE_LISTS } from "./constant.js";

export const fetchMovieList = async (listType) => {
  const response = await fetch(TMDB_MOVIE_LISTS[listType], FETCH_OPTIONS);

  return await response.json();
};

export const fetchMovieDetail = async (id) => {
  const response = await fetch(`${TMDB_MOVIE_DETAIL_URL}${id}?language=ko-KR`, FETCH_OPTIONS);

  return await response.json();
};