import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMovies } from "../services/movieService.js";
import { TMDB_BANNER_URL, TMDB_THUMBNAIL_URL } from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/", (req, res) => renderMovies(req, res, "now_playing"));
router.get("/now-playing", (req, res) => renderMovies(req, res, "now_playing"));
router.get("/top-rated", (req, res) => renderMovies(req, res, "top_rated"));
router.get("/popular", (req, res) => renderMovies(req, res, "popular"));
router.get("/upcoming", (req, res) => renderMovies(req, res, "upcoming"));

const renderMovies = async (req, res, endpoint) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movies = await getMovies(endpoint);
  
  const moviesHTML = movies.reduce((acc, movie) => {
    return acc + `
      <li>
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/${TMDB_THUMBNAIL_URL}${movie.poster_path}"
            alt="${movie.title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${movie.vote_average.toFixed(1)}</span></p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </li>`;
  }, '');

  const bestMovieHTML = `
    <div class="background-container" style="background-image: url('${TMDB_BANNER_URL}${movies[0].backdrop_path}')">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <h1 class="logo"><img src="../assets/images/logo.png" alt="MovieList" /></h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span class="rate-value">${movies[0].vote_average.toFixed(1)}</span>
          </div>
          <div class="title">${movies[0].title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>`;

  const currentPath = req.path;
  const tabHTML = `
    <ul class="tab">
      <li>
        <a href="/now-playing">
          <div class="tab-item ${currentPath === '/now-playing' ? 'selected' : ''}">
            <h3>상영 중</h3>
          </div>
        </a>
      </li>
      <li>
        <a href="/popular">
          <div class="tab-item ${currentPath === '/popular' ? 'selected' : ''}">
            <h3>인기순</h3>
          </div>
        </a>
      </li>
      <li>
        <a href="/top-rated">
          <div class="tab-item ${currentPath === '/top-rated' ? 'selected' : ''}">
            <h3>평점순</h3>
          </div>
        </a>
      </li>
      <li>
        <a href="/upcoming">
          <div class="tab-item ${currentPath === '/upcoming' ? 'selected' : ''}">
            <h3>상영 예정</h3>
          </div>
        </a>
      </li>
    </ul>
  `;

  const renderedHTML = template
    .replace("<!--${BEST_MOVIE_PLACEHOLDER}-->", bestMovieHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace('<!--${TAB_PLACEHOLDER}-->', tabHTML);

  res.send(renderedHTML);
};

export default router;
