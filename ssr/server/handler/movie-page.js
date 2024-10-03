import { renderMoviePageHTML } from "../render/movie-page.js";

import { fetchMovies } from "../../apis/movie.js";
import { MOVIE_TYPE_KEY } from "../../constants/path.js";

export const fetchAndRenderMoviePage = async (req, res) => {
  const movieListType = MOVIE_TYPE_KEY[req.path];

  const movieList = await fetchMovies(movieListType);
  const renderedHTML = renderMoviePageHTML(req.path, movieList, movieList[0]);

  res.send(renderedHTML);
};
