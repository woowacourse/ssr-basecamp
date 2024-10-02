import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMovies, loadMovieDetail } from "../apis/movie.js";
import {
  generateBestMovieHTML,
  generateModalHTML,
  generateMovieItemHTML,
  generateTabListHTML,
} from "../utils/htmlGenerator.js";
import { CONTAINER_TAB_LIST } from "../constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const generateMovieListHTML = async category => {
  const templatePath = path.join(__dirname, "../../views", "index.html");

  const movieData = await fetchMovies(category);

  // HTML 변경
  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedTabList = template.replace(
    "<!--${TAB_LIST}-->",
    generateTabListHTML(CONTAINER_TAB_LIST[category])
  );

  const movieListHTML = movieData.results.map(generateMovieItemHTML).join("");

  const bestMovieHTML = generateBestMovieHTML(
    movieData.results[0],
    renderedTabList
  );

  const renderedHTML = bestMovieHTML.replace(
    "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
    movieListHTML
  );

  return renderedHTML;
};

const routerMovieList = async (res, category) => {
  try {
    const html = await generateMovieListHTML(category);
    res.send(html);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.get("/", async (_, res) => {
  await routerMovieList(res, "nowPlaying");
});

router.get("/now-playing", async (_, res) => {
  await routerMovieList(res, "nowPlaying");
});

router.get("/popular", async (_, res) => {
  await routerMovieList(res, "popular");
});

router.get("/top-rated", async (_, res) => {
  await routerMovieList(res, "topRated");
});

router.get("/upcoming", async (_, res) => {
  await routerMovieList(res, "upcoming");
});

router.get("/detail/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movieDetailData = await loadMovieDetail(id);

    //html 생성
    const html = await generateMovieListHTML("nowPlaying");
    const renderedHTML = html.replace(
      "<!--${MODAL_AREA}-->",
      generateModalHTML(movieDetailData)
    );

    res.send(renderedHTML);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
