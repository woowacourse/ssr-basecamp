import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderMovieItems } from "./renderMovieItems.js";
import { parseMovieItems } from "../models/parseMovieItems.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderMoviePage = (moviesData) => {
  const movieItems = parseMovieItems(moviesData);
  const bestMovieItem = movieItems[0];
  const moviesHTML = renderMovieItems(movieItems).join("");

  const templatePath = path.join(__dirname, "../../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);
  template = template.replace(
    "${background-container}",
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
      bestMovieItem.background
  );
  template = template.replace("${bestMovie.rate}", bestMovieItem.rate);
  template = template.replace("${bestMovie.title}", bestMovieItem.title);

  return template;
};
