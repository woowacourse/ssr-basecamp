import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { TMDB_BANNER_URL, TMDB_MOVIE_LISTS } from "../constant.js";
import { generateMovieItemsHTML, generateTabHTML, generateMovieModalHTML } from "../genrateHTML.js";
import { fetchMovieDetail, fetchMovies } from "../fetch.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const renderHTML = (templatePath, replacements) => {
  let template = fs.readFileSync(templatePath, 'utf-8');
  for (const key in replacements) {
    template = template.replace(new RegExp(`\\\${${key}}`, 'g'), replacements[key]);
  }
  return template;
};



router.get("/", async (_, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.nowPlaying);

  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = generateMovieItemsHTML(movies);
  const tabHTML = generateTabHTML('now-playing');
  const replacements = {
    'MOVIE_ITEMS_PLACEHOLDER': moviesHTML,
    'TAB_ITEMS': tabHTML,
    'background-container': TMDB_BANNER_URL + movies[0].backdrop_path,
    'bestMovie.title': movies[0].title,
    'bestMovie.rate': movies[0].vote_average.toFixed(1),
  };

  const renderedHTML = renderHTML(templatePath, replacements);

  res.send(renderedHTML);
});

router.get("/now-playing",async (_, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.nowPlaying);
  

  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = generateMovieItemsHTML(movies);
  const tabHTML = generateTabHTML('/now-playing');
  const replacements = {
    'MOVIE_ITEMS_PLACEHOLDER': moviesHTML,
    'TAB_ITEMS': tabHTML,
    'background-container': TMDB_BANNER_URL + movies[0].backdrop_path,
    'bestMovie.title': movies[0].title,
    'bestMovie.rate': movies[0].vote_average.toFixed(1),
  };

  const renderedHTML = renderHTML(templatePath, replacements);

  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.popular);
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = generateMovieItemsHTML(movies);
  const tabHTML = generateTabHTML('popular');
  const replacements = {
    'MOVIE_ITEMS_PLACEHOLDER': moviesHTML,
    'TAB_ITEMS': tabHTML,
    'background-container': TMDB_BANNER_URL + movies[0].backdrop_path,
    'bestMovie.title': movies[0].title,
    'bestMovie.rate': movies[0].vote_average.toFixed(1),
  };

  const renderedHTML = renderHTML(templatePath, replacements);

  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.topRated);

  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = generateMovieItemsHTML(movies);
  const tabHTML = generateTabHTML('top-rated');
  const replacements = {
    'MOVIE_ITEMS_PLACEHOLDER': moviesHTML,
    'TAB_ITEMS': tabHTML,
    'background-container': TMDB_BANNER_URL + movies[0].backdrop_path,
    'bestMovie.title': movies[0].title,
    'bestMovie.rate': movies[0].vote_average.toFixed(1),
  };

  const renderedHTML = renderHTML(templatePath, replacements);

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.upcoming);
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = generateMovieItemsHTML(movies);
  const tabHTML = generateTabHTML('upcoming');
  const replacements = {
    'MOVIE_ITEMS_PLACEHOLDER': moviesHTML,
    'TAB_ITEMS': tabHTML,
    'background-container': TMDB_BANNER_URL + movies[0].backdrop_path,
    'bestMovie.title': movies[0].title,
    'bestMovie.rate': movies[0].vote_average.toFixed(1),
  };

  const renderedHTML = renderHTML(templatePath, replacements);

  res.send(renderedHTML);
});

export default router;
