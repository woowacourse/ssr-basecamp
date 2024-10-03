import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  fetchMovieDetails,
  fetchNowPlayingMovieItems,
  fetchPopularMovieItems,
  fetchTopRatedMovieItems,
  fetchUpcomingMovieItems,
} from "../../src/apis/movies.js";
import renderMovieList from "../../src/render/renderMovieList.js";
import renderHeader from "../../src/render/renderHeader.js";
import renderModal from "../../src/render/renderModal.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const fetchMovieItems = async (path) => {
  switch (path) {
    case "/":
    case "/now-playing":
      return await fetchNowPlayingMovieItems();
    case "/popular":
      return await fetchPopularMovieItems();
    case "/top-rated":
      return await fetchTopRatedMovieItems();
    case "/upcoming":
      return await fetchUpcomingMovieItems();
    default:
      throw new Error("Invalid path.");
  }
};

const getTemplate = (templatePath) => fs.readFileSync(templatePath, "utf-8");

const getSectionTitles = () => ({
  "/now-playing": "상영 중인 영화",
  "/popular": "지금 인기 있는 영화",
  "/top-rated": "평점이 높은 영화",
  "/upcoming": "개봉 예정 영화",
});

const replaceTemplatePlaceholders = (
  template,
  headerHTML,
  moviesHTML,
  sectionTitle,
  movieModalHTML = ""
) => {
  return template
    .replace("<!--${HEADER_PLACEHOLDER}-->", headerHTML)
    .replace(/\$\{sectionTitle\}/g, sectionTitle)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${MODAL_AREA}-->", movieModalHTML);
};

const renderPage = async (req, res, isModal = false) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const currentPath =
    req.path === "/" || req.path.startsWith("/detail")
      ? "/now-playing"
      : req.path;
  const movies = await fetchMovieItems(currentPath);
  const featuredMovie = movies[0];
  const headerHTML = renderHeader(featuredMovie);
  const moviesHTML = renderMovieList(movies);
  const sectionTitles = getSectionTitles();
  let template = getTemplate(templatePath);

  template = template.replace(
    /<div class="tab-item ([^"]+)">/g,
    (_, tabName) => {
      const isSelected =
        currentPath === `/${tabName}` ||
        (currentPath === "/now-playing" && tabName === "now-playing");
      return `<div class="tab-item ${tabName}${
        isSelected ? " selected" : ""
      }">`;
    }
  );

  let movieModalHTML = "";
  if (isModal) {
    const id = req.params.id;
    const movieDetail = await fetchMovieDetails(id);
    movieModalHTML = renderModal(movieDetail);
  }

  const renderedHTML = replaceTemplatePlaceholders(
    template,
    headerHTML,
    moviesHTML,
    sectionTitles[currentPath],
    movieModalHTML
  );

  res.send(renderedHTML);
};

router.get("/", (req, res) => renderPage(req, res));
router.get("/now-playing", (req, res) => renderPage(req, res));
router.get("/popular", (req, res) => renderPage(req, res));
router.get("/top-rated", (req, res) => renderPage(req, res));
router.get("/upcoming", (req, res) => renderPage(req, res));
router.get("/detail/:id", (req, res) => renderPage(req, res, true));

export default router;
