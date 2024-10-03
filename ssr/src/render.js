import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMoviesHTML } from "../src/html.js";
import { fetchMovies } from "../src/api.js";
import { URL_TO_MOVIE_LIST } from "./constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderMovieList = async (req, res) => {
  const templatePath = path.join(__dirname, "../views", "index.html");
  const movieListType = URL_TO_MOVIE_LIST[req.url];

  const movieList = (await fetchMovies(movieListType)).results;
  const moviesHTML = getMoviesHTML(movieList);
  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

  res.send(renderedHTML);
};