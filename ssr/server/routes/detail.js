import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMovie, fetchMovies } from "../utils/tmdb.js";
import {
  renderMovieItems,
  renderHeader,
  renderMovieDetailModal,
} from "../utils/render.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const pageTypeMapping = {
  "now-playing": "NOW_PLAYING",
  popular: "POPULAR",
  "top-rated": "TOP_RATED",
  upcoming: "UPCOMING",
};

const handleMovieDetailRequest = async (req, res) => {
  try {
    const movieId = req.params.id;
    const previousPage = req.get("Referrer") || req.header("Referrer");

    const pagePathSegment = previousPage.split("/").at(-1);

    const movieListType = Object.keys(pageTypeMapping).includes(pagePathSegment)
      ? pageTypeMapping[pagePathSegments]
      : "NOW_PLAYING";

    const [movieDetail, moviesData] = await Promise.all([
      fetchMovie(movieId),
      fetchMovies(movieListType),
    ]);

    const templatePath = path.join(__dirname, "../../views", "index.html");

    const detailHTML = renderMovieDetailModal(movieDetail);
    const moviesHTML = renderMovieItems(moviesData.results);
    const headerHTML = renderHeader(moviesData.results[0]);

    const template = fs.readFileSync(templatePath, "utf-8");
    const renderedHTML = template
      .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
      .replace("<!--${HEADER_PLACEHOLDER}-->", headerHTML)
      .replace("<!--${MODAL_AREA}-->", detailHTML);

    res.send(renderedHTML);
  } catch (error) {
    console.error(`Error fetching movie detail:`, error);
    res.status(500).send(`Error fetching movie detail`);
  }
};

router.get("/:id", handleMovieDetailRequest);

export default router;
