import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { renderMovieList } from "./renderMovieList.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderMoviePage = (moviesData) => {
  const moviesParsed = renderMovieList(moviesData);
  const bestMovieItem = moviesData[0];
  const moviesHTML = moviesParsed.join("");

  const templatePath = path.join(__dirname, "../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);
  template = template.replace(
    "${background-container}",
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" + bestMovieItem.poster_path
  );
  template = template.replace("${bestMovie.rate}", bestMovieItem.vote_average);
  template = template.replace("${bestMovie.title}", bestMovieItem.title);

  return template;
};
