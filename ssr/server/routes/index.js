import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const TMDB_TOKEN = process.env.TMDB_TOKEN;
const url = (filter) => {
  return `https://api.themoviedb.org/3/movie/${filter}?language=ko-KR&page=1`;
};

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: "application/json",
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const renderMovies = async (res, filter) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");

  try {
    const response = await fetch(url(filter), options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const movies = data.results;
    const moviesHTML = `
    ${movies
      .map(
        (movie) => `
      <li>
        <a href="/detail/${movie.id}>${movie.title}">
          <div class="item">
            <img class="thumbnail" src="https://image.tmdb.org/t/p/w440_and_h660_face///${movie.poster_path}" alt="${movie.title}">
            <div class="item-desc">
              <p class="rate">
                <img src="http://localhost:3000/assets/images/star_empty.png" class="star">
                <span>${movie.vote_average}</span>
              </p>
              <strong>${movie.title}</strong>
            </div>
          </div>
        </a>
      </li>
      `
      )
      .join("")}
    `;
    const template = fs.readFileSync(templatePath, "utf-8");
    const bestMovie = movies[0];
    const renderedHTML = template
      .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
      .replace("${bestMovie.rate}", `${bestMovie.vote_average.toFixed(2)}`)
      .replace("${bestMovie.title}", `${bestMovie.title}`)
      .replace("${bestMovie.modal}", `/detail/${bestMovie.id}`)
      .replace(
        "${background-container}",
        `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces//${bestMovie.backdrop_path}`
      );

    res.send(renderedHTML);
  } catch (error) {
    (error) => console.error("Error:", error);
  }
};

// 상영 중
router.get(["/", "/now-playing"], async (_, res) => {
  renderMovies(res, "now_playing");
});

// 인기순
router.get("/popular", (_, res) => {
  renderMovies(res, "popular");
});

// 평점순
router.get("/top-rated", (_, res) => {
  renderMovies(res, "top_rated");
});

// 상영 예정
router.get("/upcoming", (_, res) => {
  renderMovies(res, "upcoming");
});

export default router;
