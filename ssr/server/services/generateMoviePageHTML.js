import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { TABS, PATH_TO_API_KEY } from "../constants/tabs.js";
import {
  generateTabsHTML,
  generateMoviesHTML,
  renderTemplate,
} from "../../utils/html.js";
import { fetchMovies } from "../apis/movieAPI.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateMoviePageHTML = async (currentPath = "/") => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movieKey = PATH_TO_API_KEY[currentPath] || "nowPlaying";

  try {
    const movies = await fetchMovies(movieKey);
    const bestMovie = movies[0];
    const tabsHTML = generateTabsHTML(currentPath, TABS);
    const moviesHTML = generateMoviesHTML(movies);

    return renderTemplate(template, bestMovie, tabsHTML, moviesHTML);
  } catch (error) {
    console.error(ERROR_MESSAGES.fail_load_movie_data, error);
    throw new Error(ERROR_MESSAGES.internal_error);
  }
};

export default generateMoviePageHTML;
