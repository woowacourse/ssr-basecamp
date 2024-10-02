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

export const handleMovieRequest = async (
  res,
  movieListType,
  movieId = null
) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "index.html");
    const template = fs.readFileSync(templatePath, "utf-8");

    const [moviesData, movieDetail] = await Promise.all([
      fetchMovies(movieListType),
      movieId ? fetchMovie(movieId) : null,
    ]);

    const moviesHTML = renderMovieItems(moviesData.results);
    const headerHTML = renderHeader(moviesData.results[0]);
    const detailHTML = movieDetail ? renderMovieDetailModal(movieDetail) : "";

    const renderedHTML = template
      .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
      .replace("<!--${HEADER_PLACEHOLDER}-->", headerHTML)
      .replace("<!--${MODAL_AREA}-->", detailHTML);

    res.send(renderedHTML);
  } catch (error) {
    console.error(`Error fetching movie data:`, error);
    res.status(500).send(`Error fetching movie data`);
  }
};
