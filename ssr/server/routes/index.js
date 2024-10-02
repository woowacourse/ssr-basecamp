import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchAllMovies } from "../apis/movie.js";
import { renderBestMovie, renderMovieItem } from "../utils/renderHelper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/", async (_, res) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "index.html");

    const movieData = await fetchAllMovies();
    // HTML 변경
    const template = fs.readFileSync(templatePath, "utf-8");

    const bestMovieHTML = renderBestMovie(
      movieData.popular.results[0],
      template
    );
    const moviesHTML = movieData.popular.results.map(renderMovieItem).join("");

    const renderedHTML = bestMovieHTML.replace(
      "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
      moviesHTML
    );

    res.send(renderedHTML);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
