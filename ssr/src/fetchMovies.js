import {
  FETCH_OPTIONS,
  TMDB_MOVIE_DETAIL_URL,
  TMDB_MOVIE_LISTS,
} from "./constant.js";

export const fetchMovies = async (category) => {
  const endpoint = TMDB_MOVIE_LISTS[category];
  const response = await fetch(endpoint, FETCH_OPTIONS);
  return await response.json();
};

export const fetchMovieDetail = async (id) => {
  const url = TMDB_MOVIE_DETAIL_URL + id;
  const params = new URLSearchParams({
    language: "ko-KR",
  });
  const response = await fetch(url + "?" + params, FETCH_OPTIONS);

  return await response.json();
};
