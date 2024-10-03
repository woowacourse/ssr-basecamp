import { renderMovieDetailModal } from "../render/movie-detail-modal.js";
import { renderMoviePageHTML } from "../render/movie-page.js";

import { fetchMovieDetail, fetchMovies } from "../../apis/movie.js";

export const fetchAndRenderMovieDetailModal = async (req, res) => {
  const { movieId } = req.params;

  const movieList = await fetchMovies("nowPlaying");
  const movieDetail = await fetchMovieDetail(movieId);
  const moviePageTemplate = renderMoviePageHTML(
    req.path,
    movieList,
    movieList[0]
  );
  const renderedHTML = renderMovieDetailModal(moviePageTemplate, movieDetail);

  res.send(renderedHTML);
};
