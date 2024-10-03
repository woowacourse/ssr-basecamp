import { FETCH_OPTIONS, TMDB_MOVIE_DETAIL_URL } from '../constants/constant.js';

export const fetchMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);
  return await response.json(); // Parse and return the response JSON
};

export const fetchMovieDetail = async (movieId) => {
  const url = `${TMDB_MOVIE_DETAIL_URL}${movieId}?language=ko-KR`;

  const response = await fetch(url, FETCH_OPTIONS);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  const data = await response.json();
  return {
    title: data.title,
    releaseYear: data.release_date.split('-')[0],
    genres: data.genres.map((genre) => genre.name),
    description: data.overview,
    poster_path: data.poster_path
      ? `https://image.tmdb.org/t/p/original${data.poster_path}`
      : '',
  };
};
