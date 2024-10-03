import { TMDB_MOVIE_LISTS, FETCH_OPTIONS, TMDB_MOVIE_DETAIL_URL } from './constants.js';

export const fetchMovies = async (category) => {
	const response = await fetch(TMDB_MOVIE_LISTS[category], FETCH_OPTIONS);

	return await response.json();
};

export const fetchMovieDetail = async (movieId) => {
	const response = await fetch(`${TMDB_MOVIE_DETAIL_URL}${movieId}?language=ko-kr`, FETCH_OPTIONS);

	return await response.json();
};
