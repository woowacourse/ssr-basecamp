import {
  FETCH_OPTIONS,
  TMDB_MOVIE_DETAIL_URL,
  TMDB_MOVIE_LISTS,
  TMDB_ORIGINAL_URL,
} from "../constants.js";
import round from "../utils/round.js";

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

export const loadMovieDetail = async id => {
  const url = TMDB_MOVIE_DETAIL_URL + id;
  const params = new URLSearchParams({
    language: "ko-KR",
  });
  const response = await fetch(url + "?" + params, FETCH_OPTIONS);
  const movieDetail = await response.json();

  return {
    title: movieDetail.title,
    bannerUrl: TMDB_ORIGINAL_URL + movieDetail.poster_path,
    releaseYear: movieDetail.release_date.split("-")[0],
    description: movieDetail.overview,
    genres: movieDetail.genres.map(({ name }) => name),
    rate: round(movieDetail.vote_average, 1),
  };
};
