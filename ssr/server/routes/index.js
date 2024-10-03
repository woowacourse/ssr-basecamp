import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMovieDetail, fetchMovies } from "../../src/fetchMovies.js";
import {
  renderDetailModal,
  renderMovieItems,
  renderTabs,
} from "../../views/template.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const getMovieList = async (category) => {
  const movieData = await fetchMovies(category);
  return parseMovies(movieData);
};

const getMovieDetail = async (movieId) => {
  const movieDetailData = await fetchMovieDetail(movieId);
  return parseMovieDetail(movieDetailData);
};

const renderMoviesPage = async (category) => {
  const movieList = await getMovieList(category);
  const templatePath = path.join(__dirname, "../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");
  return renderMoviesTemplate(template, movieList, category);
};

const renderMoviesDetailPage = async (category, movieId) => {
  const movieList = await getMovieList(category);
  const movieDetail = await getMovieDetail(movieId);

  const templatePath = path.join(__dirname, "../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");
  template = renderMoviesTemplate(template, movieList, category);
  template = renderModalTemplate(template, movieDetail);

  return template;
};

export const renderMoviesTemplate = (template, movieList, category) => {
  const bestMovieItem = movieList[0];
  const moviesHTML = renderMovieItems(movieList).join("");
  const tabsHTML = renderTabs(category).join("");

  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);
  template = template.replace("<!--${TABS_PLACEHOLDER}-->", tabsHTML);
  template = template.replace(
    "${background-container}",
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
      bestMovieItem.background
  );
  template = template.replace("${bestMovie.rate}", bestMovieItem.rate);
  template = template.replace("${bestMovie.title}", bestMovieItem.title);

  return template;
};

export const renderModalTemplate = (template, movieDetailItem) => {
  return template.replace(
    "<!--${MODAL_AREA}-->",
    renderDetailModal(movieDetailItem)
  );
};

export const parseMovies = async (movieData) => {
  const formattedMovieData = movieData.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    thumbnail: movie.poster_path,
    rate: movie.vote_average,
    background: movie.backdrop_path,
  }));

  return formattedMovieData;
};

export const parseMovieDetail = async (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    thumbnail: movie.poster_path,
    releaseYear: movie.release_date,
    genres: movie.genres.map((genre) => genre.name),
    description: movie.overview,
    rate: movie.vote_average,
  };
};

const handleMovieRoute = async (res, category) => {
  try {
    let template = await renderMoviesPage(category);
    res.send(template);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
};

const handleDetailRoute = async (res, movieId) => {
  try {
    const moviesPageTemplate = await renderMoviesDetailPage(
      "NOW_PLAYING",
      movieId
    );
    res.send(moviesPageTemplate);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.get("/", async (_, res) => handleMovieRoute(res, "NOW_PLAYING"));
router.get("/now-playing", async (_, res) =>
  handleMovieRoute(res, "NOW_PLAYING")
);
router.get("/popular", async (_, res) => handleMovieRoute(res, "POPULAR"));
router.get("/top-rated", async (_, res) => handleMovieRoute(res, "TOP_RATED"));
router.get("/upcoming", async (_, res) => handleMovieRoute(res, "UPCOMING"));

router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  handleDetailRoute(res, id);
});

export default router;
