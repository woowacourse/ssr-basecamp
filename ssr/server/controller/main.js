import { TMDB_MOVIE_DETAIL_URL, TMDB_MOVIE_LISTS } from "../src/constant.js";
import { fetchMovies } from "../src/fetchMovies.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const insertMovieContent = (movies, currentURL) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const firstMovie = movies.results[0];

  const movieLists = movies.results
    .map(
      ({ id, title, poster_path, vote_average }) => `
      <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}"
            alt="${title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${vote_average.toFixed(
              1
            )}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `
    )
    .join("");

  const nowPlayingSelected = currentURL === "/" || currentURL === "/now-playing" ? "selected" : "";
  const popularSelected = currentURL === "/popular" ? "selected" : "";
  const topRatedSelected = currentURL === "/top-rated" ? "selected" : "";
  const upcomingSelected = currentURL === "/upcoming" ? "selected" : "";

  const template = fs.readFileSync(templatePath, "utf-8");
  const mainHTML = template
    .replace(
      "${background-container}",
      `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces//${firstMovie.backdrop_path}`
    )
    .replace("${bestMovie.rate}", firstMovie.vote_average.toFixed(1))
    .replace("${bestMovie.title}", firstMovie.title)
    .replace('class="tab-item now-playing"', `class="tab-item now-playing ${nowPlayingSelected}"`)
    .replace('class="tab-item popular"', `class="tab-item popular ${popularSelected}"`)
    .replace('class="tab-item top-rated"', `class="tab-item top-rated ${topRatedSelected}"`)
    .replace('class="tab-item upcoming"', `class="tab-item upcoming ${upcomingSelected}"`)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", movieLists);

  return mainHTML;
};

const getMovieURL = (path) => {
  switch (path) {
    case "/":
    case "/now-playing":
      return TMDB_MOVIE_LISTS.NOW_PLAYING;
    case "/popular":
      return TMDB_MOVIE_LISTS.POPULAR;
    case "/top-rated":
      return TMDB_MOVIE_LISTS.TOP_RATED;
    case "/upcoming":
      return TMDB_MOVIE_LISTS.UPCOMING;
  }
};

const getMovieDetailModalHTML = async (movieId) => {
  const movieDetail = await fetchMovies(TMDB_MOVIE_DETAIL_URL + movieId);

  const modalElement = `<div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal"><img src="../assets/images/modal_button_close.png" /></button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/original/${movieDetail.poster_path}" />
          </div>
          <div class="modal-description">
            <h2>${movieDetail.title}</h2>
            <p class="category">${movieDetail.genres.map((genre) => genre.name)}</p>
            <p class="rate"><img src="../assets/images/star_filled.png" class="star" /><span>${movieDetail.vote_average.toFixed(
              1
            )}</span></p>
            <hr />
            <p class="detail">
              ${movieDetail.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달 창 닫기 스크립트 -->
      <script>
        const modalBackground = document.getElementById("modalBackground");
        const closeModal = document.getElementById("closeModal");
        document.addEventListener("DOMContentLoaded", () => {
          closeModal.addEventListener("click", () => {
            modalBackground.classList.remove("active");
          });
        });
      </script>
      `;

  return modalElement;
};

export const getMoviePage = async (req, res) => {
  const movieURL = getMovieURL(req.url);
  const movies = await fetchMovies(movieURL);
  const moviePageHTML = insertMovieContent(movies, req.url);

  res.send(moviePageHTML);
};

export const getMovieDetailModal = async (req, res) => {
  const referer = req.get("Referer");
  const prevURL = referer.split("http://localhost:3000")[1];
  const movieURL = getMovieURL(prevURL) || TMDB_MOVIE_LISTS.NOW_PLAYING;
  const movies = await fetchMovies(movieURL);

  const moviePageHTML = insertMovieContent(movies, req.url);
  const movieDetailHTML = await getMovieDetailModalHTML(req.params.id);

  const moviePageWithModalHTML = moviePageHTML.replace("<!--${MODAL_AREA}-->", movieDetailHTML);

  res.send(moviePageWithModalHTML);
};
