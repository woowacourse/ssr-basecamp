import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { fetchMovies } from "../apis/movie.js";
import {
  generateMovieList,
  generateTopRatedContainer,
} from "../utils/generateHTML.js";

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

router.get("/", async (_, res) => {
  const fetchedMovies = await fetchMovies({ type: "NOW_PLAYING" });
  res.send(renderMovieListHTML(fetchedMovies.results));
});

export default router;
