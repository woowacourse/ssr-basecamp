import { TMDB_ORIGINAL_URL } from "../constants/index.js";

export const parseMovieItems = (data) => {
  return data.results.map((result) => ({
    ...result,
    rate: result.vote_average,
    thumbnail: result.poster_path,
    background: result.backdrop_path,
  }));
};

export const parseMovieItem = (movieDetail) => {
  return {
    ...movieDetail,
    title: movieDetail.title,
    bannerUrl: TMDB_ORIGINAL_URL + movieDetail.poster_path,
    releaseYear: movieDetail.release_date?.split("-")[0],
    description: movieDetail.overview,
    genres: movieDetail?.genres?.map(({ name }) => name)?.join(", "),
    rate: Math.round(movieDetail.vote_average, 1),
  };
};
