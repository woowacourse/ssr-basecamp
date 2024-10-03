import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  fetchNowPlayingMovieItems,
  fetchPopularMovieItems,
  fetchTopRatedMovieItems,
  fetchUpcomingMovieItems,
} from "../src/api/movie.js";
import { round } from "../../../csr/src/utils.js";
import { renderMovieItems } from "../src/render/renderMovieItems.js";

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
      throw new Error("Invalid path");
  }
};

const renderMoviePage = async (req, res) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "index.html");
    const currentPath = req.path === "/" ? "/now-playing" : req.path;

    const movies = await fetchMovieItems(currentPath);
    const featuredMovie = movies[0]; // 첫 번째 영화를 대표 영화로 사용

    const moviesHTML = renderMovieItems(movies);

    let template = fs.readFileSync(templatePath, "utf-8");

    const sectionTitles = {
      "/now-playing": "상영 중인 영화",
      "/popular": "지금 인기 있는 영화",
      "/top-rated": "평점이 높은 영화",
      "/upcoming": "개봉 예정 영화",
    };

    // 탭 선택 상태 업데이트
    template = template.replace(
      /<div class="tab-item ([^"]+)">/g,
      (match, tabName) => {
        const isSelected =
          currentPath === `/${tabName}` ||
          (currentPath === "/now-playing" && tabName === "now-playing");
        return `<div class="tab-item ${tabName}${
          isSelected ? " selected" : ""
        }">`;
      }
    );

    // 변수 치환
    const renderedHTML = template
      .replace(/\$\{bestMovie\.title\}/g, featuredMovie.title)
      .replace(
        /\$\{bestMovie\.vote_average\}/g,
        round(featuredMovie.vote_average, 1)
      )
      .replace(
        /\$\{bestMovie\.backdrop_path\}/g,
        `https://media.themoviedb.org/t/p/original${featuredMovie.backdrop_path}`
      )
      .replace(/\$\{sectionTitle\}/g, sectionTitles[currentPath])
      .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

    res.send(renderedHTML);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

router.get("/", renderMoviePage);
router.get("/now-playing", renderMoviePage);
router.get("/popular", renderMoviePage);
router.get("/top-rated", renderMoviePage);
router.get("/upcoming", renderMoviePage);

export default router;
