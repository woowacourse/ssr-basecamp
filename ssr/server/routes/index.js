import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  generateMovieList,
  generateTopRatedContainer,
  generateMovieListTabHTML,
  generateMovieDetailModal,
} from "../utils/generateHTML.js";
import { fetchMovies, fetchMovieDetail } from "../apis/movie.js";
import { MOVIE_LIST_TYPE, ROUTE } from "../constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const renderMovieListHTML = (
  moviesData,
  listType = MOVIE_LIST_TYPE.NOW_PLAYING.TYPE
) => {
  const topRatedMovieHTML = generateTopRatedContainer(moviesData[0], listType);
  const movieListTabHTML = generateMovieListTabHTML(listType);
  const movieListHTML = generateMovieList(moviesData, listType);

  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const renderedHTML = template
    .replace("<!--${TOP_RATED_MOVIE_PLACEHOLDER}-->", topRatedMovieHTML)
    .replace("<!--${MOVIE_LIST_TAB_PLACEHOLDER}-->", movieListTabHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", movieListHTML);

  return renderedHTML;
};

router.get(ROUTE.ROOT, async (_, response) => {
  const fetchedMovies = await fetchMovies();
  response.send(renderMovieListHTML(fetchedMovies.results));
});

router.get(ROUTE.MOVIE_LISTS.NOW_PLAYING, async (_, response) => {
  const fetchedMovies = await fetchMovies(MOVIE_LIST_TYPE.NOW_PLAYING.TYPE);
  response.send(
    renderMovieListHTML(fetchedMovies.results, MOVIE_LIST_TYPE.NOW_PLAYING.TYPE)
  );
});

router.get(ROUTE.MOVIE_LISTS.POPULAR, async (_, response) => {
  const fetchedMovies = await fetchMovies(MOVIE_LIST_TYPE.POPULAR.TYPE);
  response.send(
    renderMovieListHTML(fetchedMovies.results, MOVIE_LIST_TYPE.POPULAR.TYPE)
  );
});

router.get(ROUTE.MOVIE_LISTS.TOP_RATED, async (_, response) => {
  const fetchedMovies = await fetchMovies(MOVIE_LIST_TYPE.TOP_RATED.TYPE);
  response.send(
    renderMovieListHTML(fetchedMovies.results, MOVIE_LIST_TYPE.TOP_RATED.TYPE)
  );
});

router.get(ROUTE.MOVIE_LISTS.UPCOMING, async (_, response) => {
  const fetchedMovies = await fetchMovies(MOVIE_LIST_TYPE.UPCOMING.TYPE);
  response.send(
    renderMovieListHTML(fetchedMovies.results, MOVIE_LIST_TYPE.UPCOMING.TYPE)
  );
});

router.get(ROUTE.MOVIE_DETAIL, async (request, response) => {
  const fetchedMovieDetail = await fetchMovieDetail(request.params.movieId);
  const fetchedMovies = await fetchMovies(request.query.listType);

  const movieListHTML = renderMovieListHTML(
    fetchedMovies.results,
    request.query.listType
  );
  const modalHTML = generateMovieDetailModal(fetchedMovieDetail);

  response.send(movieListHTML.replace("<!--${MODAL_AREA}-->", modalHTML));
});

export default router;
