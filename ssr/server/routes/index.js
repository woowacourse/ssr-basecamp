import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateMovieItems } from "../HTMLgenerator.js";
import { fetchMovieItems } from "../apis/movies.js";
import { TMDB_BANNER_URL } from "../constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const renderMovieItemsHTML = (movies) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movieItemsHTML = generateMovieItems(movies);
  return template
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", movieItemsHTML)
    .replace("${bestMovie.title}", movies[0].title)
    .replace("${bestMovie.rate}", movies[0].vote_average.toFixed(1))
    .replace(
      "${background-container}",
      `${TMDB_BANNER_URL}/${movies[0].backdrop_path}`
    );
};

router.get("/", async (_, res) => {
  const movies = await fetchMovieItems();

  res.send(renderMovieItemsHTML(movies));
});

router.get("/now-playing", async (_, res) => {
  const movies = await fetchMovieItems("nowPlaying");

  res.send(renderMovieItemsHTML(movies));
});

router.get("/popular", async (_, res) => {
  const movies = await fetchMovieItems("popular");

  res.send(renderMovieItemsHTML(movies));
});

router.get("/top-rated", async (_, res) => {
  const movies = await fetchMovieItems("topRated");

  res.send(renderMovieItemsHTML(movies));
});

router.get("/upcoming", async (_, res) => {
  const movies = await fetchMovieItems("upcoming");

  res.send(renderMovieItemsHTML(movies));
});

export default router;
