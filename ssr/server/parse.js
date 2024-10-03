import { round } from '../../csr/src/utils.js';
import { TMDB_ORIGINAL_URL } from './constant.js';

export const parseMovieItem = (movieItemData) => {
  return {
    id: movieItemData.id,
    title: movieItemData.title,
    rate: movieItemData.vote_average,
    background: movieItemData.backdrop_path,
  };
};

export const parseMovieList = (movieList) => {
  return movieList.results.map((item) => parseMovieItem(item));
};

export const parseMovieDetail = (movieDetail) => {
  return {
    title: movieDetail.title,
    bannerUrl: TMDB_ORIGINAL_URL + movieDetail.poster_path,
    releaseYear: movieDetail.release_date.split('-')[0],
    description: movieDetail.overview,
    genres: movieDetail.genres.map(({ name }) => name),
    rate: round(movieDetail.vote_average, 1),
  };
};
