import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMovies } from "../utils/tmdb.js";
import { renderMovieItems, renderHeader } from "../utils/render.js";
import detailRouter from "./detail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const handleMovieRequest = async (res, movieListType) => {
  try {
    const moviesData = await fetchMovies(movieListType);
    const templatePath = path.join(__dirname, "../../views", "index.html");

    const moviesHTML = renderMovieItems(moviesData.results);
    const headerHTML = renderHeader(moviesData.results[0]);

    const template = fs.readFileSync(templatePath, "utf-8");
    const renderedHTML = template
      .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
      .replace("<!--${HEADER_PLACEHOLDER}-->", headerHTML);

    res.send(renderedHTML);
  } catch (error) {
    console.error(`Error fetching ${movieListType} movies:`, error);
    res.status(500).send(`Error fetching ${movieListType} movies`);
  }
};

router.get(["/", "/now-playing"], (_, res) =>
  handleMovieRequest(res, "NOW_PLAYING")
);
router.get("/popular", (_, res) => handleMovieRequest(res, "POPULAR"));
router.get("/top-rated", (_, res) => handleMovieRequest(res, "TOP_RATED"));
router.get("/upcoming", (_, res) => handleMovieRequest(res, "UPCOMING"));
router.use("/detail", detailRouter);

export default router;
