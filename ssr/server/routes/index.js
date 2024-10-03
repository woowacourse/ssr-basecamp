import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  generateMovieList,
  generateTopRatedContainer,
} from "../utils/generateHTML.js";
import { fetchMovies } from "../apis/movie.js";
import { ROUTE } from "../constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const renderMovieListHTML = (moviesData) => {
  const topRatedMovieHTML = generateTopRatedContainer(moviesData[0]);
  const movieListHTML = generateMovieList(moviesData);

  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const renderedHTML = template
    .replace("<!--${TOP_RATED_MOVIE_PLACEHOLDER}-->", topRatedMovieHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", movieListHTML);

  return renderedHTML;
};

router.get(ROUTE.ROOT, async (_, response) => {
  const fetchedMovies = await fetchMovies();
  response.send(renderMovieListHTML(fetchedMovies.results));
});

router.get(ROUTE.MOVIE_LISTS.NOW_PLAYING, async (_, response) => {
  const fetchedMovies = await fetchMovies("NOW_PLAYING");
  response.send(renderMovieListHTML(fetchedMovies.results));
});

router.get(ROUTE.MOVIE_LISTS.POPULAR, async (_, response) => {
  const fetchedMovies = await fetchMovies("POPULAR");
  response.send(renderMovieListHTML(fetchedMovies.results));
});

router.get(ROUTE.MOVIE_LISTS.TOP_RATED, async (_, response) => {
  const fetchedMovies = await fetchMovies("TOP_RATED");
  response.send(renderMovieListHTML(fetchedMovies.results));
});

router.get(ROUTE.MOVIE_LISTS.UPCOMING, async (_, response) => {
  const fetchedMovies = await fetchMovies("UPCOMING");
  response.send(renderMovieListHTML(fetchedMovies.results));
});

export default router;
