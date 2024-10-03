import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { renderMovieList } from "../../src/components/movieList.js";
import { renderHeader } from "../../src/components/header.js";
import { renderTab } from "../../src/components/tab.js";
import { getMovies } from "../../src/api/index.js";
import { renderModal } from "../../src/components/modal.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const routes = ["", "now-playing", "popular", "top-rated", "upcoming"];

routes.forEach((route) => {
  router.get(`/${route}`, async (_, res) => {
    const templatePath = path.join(__dirname, "../../views", "index.html");

    const endpoint = route === "" ? "now-playing" : route;
    const movies = await getMovies(endpoint);

    const movieList = movies.results.map(({ id, title, poster_path, vote_average }) => ({
      id,
      title,
      thumbnail: poster_path,
      rate: vote_average.toFixed(1),
    }));

    const bestMovie = {
      id: movies.results[0].id,
      title: movies.results[0].title,
      background: movies.results[0].backdrop_path,
      rate: movies.results[0].vote_average.toFixed(1),
    };

    const headerHTML = renderHeader(bestMovie);
    const tabHTML = renderTab(endpoint);
    const moviesHTML = renderMovieList(movieList);

    const template = fs.readFileSync(templatePath, "utf-8");
    const renderedHTML = template
      .replace("<!--${HEADER_PLACEHOLDER}-->", headerHTML)
      .replace("<!--${TAB_PLACEHOLDER}-->", tabHTML)
      .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

    res.send(renderedHTML);
  });
});

router.get("/detail/:movieId", async (req, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");

  const movieId = req.params.movieId;
  const movie = await getMovieDetail(movieId);
  const movieDetail = {
    title: movie.title,
    thumbnail: movie.poster_path,
    releaseYear: movie.release_date.split("-")[0],
    genres: movie.genres.map(({ name }) => name),
    rate: movie.vote_average.toFixed(1),
    description: movie.overview,
  };

  const modalHTML = renderModal(movieDetail);

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace("<!--${MODAL_AREA}-->", modalHTML);

  res.send(renderedHTML);
});

export default router;
