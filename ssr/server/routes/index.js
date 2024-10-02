import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "../Constant.js";
import MovieItemView from "../../views/movieItem/MovieItemView.js";
import TopRatedMovie from "../../views/topRatedMovie/TopRatedMovie.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const loadMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.popular, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};

router.get("/", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const movies = await loadMovies();

  const moviesHTML = movies.map((movie) => MovieItemView(movie)).join("");
  const topRateMovie = movies.reduce((highest, movie) => {
    return movie.vote_average > highest.vote_average ? movie : highest;
  }, movies[0]);

  const topRateMovieHTML = TopRatedMovie(topRateMovie);
  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${TOP_RATED_MOVIE_PLACEHOLDER}-->", topRateMovieHTML);

  res.send(renderedHTML);
});

export default router;
