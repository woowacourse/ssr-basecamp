import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FETCH_OPTIONS, TMDB_MOVIE_DETAIL_URL, TMDB_MOVIE_LISTS, TMDB_ORIGINAL_URL } from "../Constant.js";
import MovieItemView from "../../views/movieItem/MovieItemView.js";
import TopRatedMovieView from "../../views/topRatedMovie/TopRatedMovieView.js";
import ModalView from "../../views/modal/ModalView.js";
import round from "../../utils/round.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const loadMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};

const loadMovieDetail = async (id) => {
  const url = TMDB_MOVIE_DETAIL_URL + id;
  const params = new URLSearchParams({
    language: "ko-KR",
  });
  const response = await fetch(url + "?" + params, FETCH_OPTIONS);

  return await response.json();
};

const getTopRateMovie = (movies) => {
  const topRateMovie = movies.reduce((highest, movie) => {
    return movie.vote_average > highest.vote_average ? movie : highest;
  }, movies[0]);

  return topRateMovie;
};

const tab = {
  root: {
    url: TMDB_MOVIE_LISTS.popular,
    selectedTemplate: null,
  },
  nowPlaying: {
    url: TMDB_MOVIE_LISTS.nowPlaying,
    selectedTemplate: "<!--${NOW_PLAYING_TAB_SELECTED}-->",
  },
  popular: {
    url: TMDB_MOVIE_LISTS.popular,
    selectedTemplate: "<!--${POPULAR_TAB_SELECTED}-->",
  },
  topRated: {
    url: TMDB_MOVIE_LISTS.topRated,
    selectedTemplate: "<!--${TOP_RATED_TAB_SELECTED}-->",
  },
  upcoming: {
    url: TMDB_MOVIE_LISTS.upcoming,
    selectedTemplate: "<!--${UPCOMING_TAB_SELECTED}-->",
  },
};

const makeHTMLTemplates = async ({ url, selectedTemplate }) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const movies = await loadMovies(url);

  const moviesHTML = movies.map((movie) => MovieItemView(movie)).join("");
  const topRateMovieHTML = TopRatedMovieView(getTopRateMovie(movies));

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${TOP_RATED_MOVIE_PLACEHOLDER}-->", topRateMovieHTML);

  return selectedTemplate !== null ? renderedHTML.replace(selectedTemplate, "selected") : renderedHTML;
};

const makeDetailTemplate = (movieDetail) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const modalHTML = ModalView(movieDetail);
  const renderedHTML = template.replace("<!--${MODAL_AREA}-->", modalHTML);
  return renderedHTML;
};

router.get("/", async (_, res) => {
  const renderedHTML = await makeHTMLTemplates({ ...tab.root });
  res.send(renderedHTML);
});

router.get("/now-playing", async (_, res) => {
  const renderedHTML = await makeHTMLTemplates({ ...tab.nowPlaying });
  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const renderedHTML = await makeHTMLTemplates({ ...tab.popular });
  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const renderedHTML = await makeHTMLTemplates({ ...tab.topRated });
  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const renderedHTML = await makeHTMLTemplates({ ...tab.upcoming });
  res.send(renderedHTML);
});

router.get("/detail/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const movieInfo = await loadMovieDetail(movieId);

  const movieDetail = {
    title: movieInfo.title,
    bannerUrl: TMDB_ORIGINAL_URL + movieInfo.poster_path,
    releaseYear: movieInfo.release_date.split("-")[0],
    description: movieInfo.overview,
    genres: movieInfo.genres.map(({ name }) => name),
    rate: round(movieInfo.vote_average, 1),
  };

  const renderedModalBackgroundHTML = await makeHTMLTemplates({ ...tab.nowPlaying });
  const modalHTML = ModalView(movieDetail);
  const wholeRenderedHTML = renderedModalBackgroundHTML.replace("<!--${MODAL_AREA}-->", modalHTML);

  res.send(wholeRenderedHTML);
});

export default router;
