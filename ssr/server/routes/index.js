import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMovies } from "../apis/movie.js";
import {
  renderBestMovie,
  renderMovieItem,
  renderTabList,
} from "../utils/renderHelper.js";
import { CONTAINER_TAB_LIST } from "../constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const routerMovieList = async (res, category) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "index.html");

    const movieData = await fetchMovies(category);

    // HTML 변경
    const template = fs.readFileSync(templatePath, "utf-8");
    const renderedTabList = template.replace(
      "<!--${TAB_LIST}-->",
      renderTabList(CONTAINER_TAB_LIST[category])
    );

    const moviesHTML = movieData.results.map(renderMovieItem).join("");

    const bestMovieHTML = renderBestMovie(
      movieData.results[0],
      renderedTabList
    );

    const renderedHTML = bestMovieHTML.replace(
      "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
      moviesHTML
    );

    res.send(renderedHTML);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.get("/", async (_, res) => {
  await routerMovieList(res, "nowPlaying");
});

router.get("/now-playing", async (_, res) => {
  await routerMovieList(res, "nowPlaying");
});

router.get("/popular", async (_, res) => {
  await routerMovieList(res, "popular");
});

router.get("/top-rated", async (_, res) => {
  await routerMovieList(res, "topRated");
});

router.get("/upcoming", async (_, res) => {
  await routerMovieList(res, "upcoming");
});

export default router;
