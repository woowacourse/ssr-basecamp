import { Router } from "express";

import { loadMovieDetail, loadMovies } from "../../utils/fetch.js";
import { TMDB_MOVIE_LISTS } from "../../utils/constants.js";

import getTab from "../components/getTab.js";
import getMovieList from "../components/getMovieList.js";
import getHeader from "../components/getHedaer.js";
import getInitTemplate from "../components/getInitTemplate.js";
import getModal from "../components/getModal.js";

const router = Router();

router.get("/", (_, res) => {
  res.redirect("/now-playing");
});

router.get("/now-playing", async (_, res) => {
  const popularMovies = await loadMovies(TMDB_MOVIE_LISTS.nowPlaying);

  const headerHTML = getHeader(popularMovies[0]);
  const tabHTML = getTab(res.req.originalUrl);
  const moviesHTML = getMovieList(popularMovies);

  const template = getInitTemplate();
  const renderedHTML = template
    .replace("<!--${NAV_TAB_PLACEHOLDER}-->", tabHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${HEADER_ITEM_PLACEHOLDER}-->", headerHTML);

  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const popularMovies = await loadMovies(TMDB_MOVIE_LISTS.popular);

  const headerHTML = getHeader(popularMovies[0]);
  const tabHTML = getTab(res.req.originalUrl);
  const moviesHTML = getMovieList(popularMovies);

  const template = getInitTemplate();
  const renderedHTML = template
    .replace("<!--${NAV_TAB_PLACEHOLDER}-->", tabHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${HEADER_ITEM_PLACEHOLDER}-->", headerHTML);

  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const popularMovies = await loadMovies(TMDB_MOVIE_LISTS.topRated);

  const headerHTML = getHeader(popularMovies[0]);
  const tabHTML = getTab(res.req.originalUrl);
  const moviesHTML = getMovieList(popularMovies);

  const template = getInitTemplate();
  const renderedHTML = template
    .replace("<!--${NAV_TAB_PLACEHOLDER}-->", tabHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${HEADER_ITEM_PLACEHOLDER}-->", headerHTML);

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const popularMovies = await loadMovies(TMDB_MOVIE_LISTS.upcoming);

  const headerHTML = getHeader(popularMovies[0]);
  const tabHTML = getTab(res.req.originalUrl);
  const moviesHTML = getMovieList(popularMovies);

  const template = getInitTemplate();
  const renderedHTML = template
    .replace("<!--${NAV_TAB_PLACEHOLDER}-->", tabHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${HEADER_ITEM_PLACEHOLDER}-->", headerHTML);

  res.send(renderedHTML);
});

router.get("/detail/:movieId", async (req, res) => {
  const { movieId } = req.params;

  const popularMovies = await loadMovies(TMDB_MOVIE_LISTS.nowPlaying);
  const movieDetail = await loadMovieDetail(movieId);

  const headerHTML = getHeader(popularMovies[0]);
  const tabHTML = getTab("/now-playing");
  const moviesHTML = getMovieList(popularMovies);
  const modalHTML = getModal(movieDetail);

  const template = getInitTemplate();
  const renderedHTML = template
    .replace("<!--${NAV_TAB_PLACEHOLDER}-->", tabHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${HEADER_ITEM_PLACEHOLDER}-->", headerHTML)
    .replace("<!--${MODAL_AREA}-->", modalHTML);

  res.send(renderedHTML);
});

export default router;
