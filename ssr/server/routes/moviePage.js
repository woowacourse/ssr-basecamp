import fs from "fs";
import path from "path";

import { getMovies } from "../services/movieService.js";
import { getBestMovieHTML, getMoviesHTML, getTabHTML } from "./moviePageComponents.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderMoviePage = async (req, res, endpoint) => {
  const movies = await getMovies(endpoint);

  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");
  
  const moviesHTML = getMoviesHTML(movies)
  const bestMovieHTML = getBestMovieHTML(movies[0])

  const currentPath = req.path;
  const tabHTML = getTabHTML(currentPath)

  const renderedHTML = template
    .replace('<!--${BEST_MOVIE_PLACEHOLDER}-->', bestMovieHTML)
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace('<!--${TAB_PLACEHOLDER}-->', tabHTML);

  res.send(renderedHTML);
};