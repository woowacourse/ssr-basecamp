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

const filterMapper = {
  "now-playing": "상영 중",
  popular: "인기순",
  "top-rated": "평점순",
  upcoming: "상영 예정",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const renderMovies = (movies) => {
  return `
    ${movies
      .map(
        (movie) => `
      <li>
        <a href="/detail/${movie.id}">
          <div class="item">
            <img class="thumbnail" src="https://image.tmdb.org/t/p/w440_and_h660_face///${movie.poster_path}" alt="${movie.title}">
            <div class="item-desc">
              <p class="rate">
                <img src="/assets/images/star_empty.png" class="star">
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
};

const getMovies = async (filter) => {
  const response = await fetch(url(filter), options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

const getMovie = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const renderHTML = async (res, filter, modal = false, modalMovieId) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "index.html");
    const movies = await getMovies(filter);
    const moviesHTML = renderMovies(movies);
    const template = fs.readFileSync(templatePath, "utf-8");
    const bestMovie = movies[0];

    const filterLink = filter.replace("_", "-");
    const renderedHTML = template
      .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
      .replace("${bestMovie.rate}", `${bestMovie.vote_average.toFixed(2)}`)
      .replace("${bestMovie.title}", `${bestMovie.title}`)
      .replace("${bestMovie.modal}", `/detail/${bestMovie.id}`)
      .replace(
        "${background-container}",
        `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces//${bestMovie.backdrop_path}`
      )
      .replace(
        `            <a href="/${filterLink}">
              <div class="tab-item">
                <h3>${filterMapper[filterLink]}</h3>
              </div></a
            >`,
        `            <a href="/${filterLink}">
              <div class="tab-item selected">
                <h3>${filterMapper[filterLink]}</h3>
              </div></a
            >`
      );
    if (modal) {
      const modalMovie = await getMovie(modalMovieId);
      res.send(
        renderedHTML.replace(
          "<!--${MODAL_AREA}-->",
          `<div class="modal-background active" id="modalBackground">
              <div class="modal">
                <button class="close-modal" id="closeModal">
                  <img src="/assets/images/modal_button_close.png">
                </button>
                <div class="modal-container">
                  <div class="modal-image">
                    <img src="https://image.tmdb.org/t/p/original//I1fkNd5CeJGv56mhrTDoOeMc2r.jpg" alt="${
                      modalMovie.title
                    }">
                  </div>
                  <div class="modal-description">
                    <h2>${modalMovie.title}</h2>
                    <p class="category">1972 · 드라마, 범죄</p>
                    <p class="rate"><img src="/assets/images/star_empty.png" class="star">
                      <span>${modalMovie.vote_average.toFixed(2)}</span>
                    </p>
                    <hr>
                    <p class="detail">${modalMovie.overview}</p>
                  </div>
                </div>
              </div>
            </div>`
        )
      );
    } else {
      res.send(renderedHTML);
    }
  } catch (error) {
    (error) => console.error("Error:", error);
  }
};

// 상영 중
router.get(["/", "/now-playing"], async (_, res) => {
  renderHTML(res, "now_playing");
});

// 인기순
router.get("/popular", (_, res) => {
  renderHTML(res, "popular");
});

// 평점순
router.get("/top-rated", (_, res) => {
  renderHTML(res, "top_rated");
});

// 상영 예정
router.get("/upcoming", (_, res) => {
  renderHTML(res, "upcoming");
});

router.get("/detail/:movieId", (req, res) => {
  const referer = req.get("Referer");
  const movieId = req.params.movieId;

  if (referer) {
    renderHTML(res, referer.split("/").at(-1), true, movieId);
  } else {
    renderHTML(res, "now-playing", true, movieId);
  }
});

export default router;
