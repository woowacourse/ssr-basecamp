import {
  FETCH_OPTIONS,
  TMDB_MOVIE_DETAIL_URL,
  TMDB_MOVIE_LISTS,
} from "../constants/api.js";

export const fetchMovies = async (movieType) => {
  const fetchEndPoint = TMDB_MOVIE_LISTS[movieType];

  const response = await fetch(fetchEndPoint, FETCH_OPTIONS);
  const allMovieData = await response.json();

  return allMovieData.results;
};

export const fetchMovieDetail = async (movieId) => {
  const url = `${TMDB_MOVIE_DETAIL_URL}${movieId}`;
  const params = new URLSearchParams({
    language: "ko-KR",
  });
  const response = await fetch(url + "?" + params, FETCH_OPTIONS);

  return await response.json();
};
