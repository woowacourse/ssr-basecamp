// 영화 데이터와 관련된 로직 처리
import fetch from "node-fetch";
import {
  TMDB_MOVIE_LISTS,
  FETCH_OPTIONS,
  TMDB_BANNER_URL,
  TMDB_THUMBNAIL_URL,
  TAB_DATA,
} from "../../src/constants.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// 현재 파일 경로와 디렉터리 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFullThumbNailURL = (thumbnailUrl) => {
  return TMDB_THUMBNAIL_URL + "/" + thumbnailUrl;
};

const getBestMovie = (movies) => {
  return movies.reduce(
    (best, movie) => (movie.vote_average > best.vote_average ? movie : best),
    movies[0]
  );
};

const getMovieListInnerHTML = (movie) => {
  return `
        <div class="item">
          <a href="/detail/${movie.id}">
            <img class="thumbnail" src=${getFullThumbNailURL(
              movie.poster_path
            )} alt=""/>
          </a>
          <div class="item-desc">
            <p class="rate">
              <img src="/assets/images/star_empty.png" class="star"/>
              <span>${(Math.round(movie.vote_average * 10) / 10).toFixed(
                1
              )}</span>
            </p>
            <strong>${movie.title}</strong>
          </div>
        </div>
        `;
};

const getMovieDetailModalInnerHTML = (movieDetail) => {
  return `
        <div class="modal-background active" id="modalBackground">
          <div class="modal">
            <button class="close-modal" id="closeModal">
              <img src="../assets/images/modal_button_close.png" />
            </button>
            <div class="modal-container">
              <div class="modal-image">
                <img src="https://image.tmdb.org/t/p/original/${
                  movieDetail.poster_path
                }" alt="Movie Poster" />
              </div>
              <div class="modal-description">
                <h2>${movieDetail.title}</h2>
                <p class="category">
                  ${new Date(movieDetail.release_date).getFullYear()} · 
                  ${movieDetail.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p class="rate">
                  <img src="../assets/images/star_filled.png" class="star" />
                  <span>${movieDetail.vote_average.toFixed(1)}</span>
                </p>
                <hr />
                <p class="detail">${movieDetail.overview}</p>
              </div>
            </div>
          </div>
        </div>
        <script>
          document.addEventListener("DOMContentLoaded", () => {
            const closeModal = document.getElementById("closeModal");
            closeModal.addEventListener("click", () => {
              document.getElementById("modalBackground").remove();
              document.getElementById("${TAB_DATA[0].title}-tab")
              history.pushState(null, null, '/'); // URL을 목록 페이지로 변경
            });
          });
        </script>
      `;
};

export const renderMoviesPage = async (req, res, listType, movieId = null) => {
  try {
    const currentPath = req.path === "/" ? "/now-playing" : req.path; // 현재 요청된 URL 경로

    const tabsHTML = TAB_DATA.map((tab) => {
      const selectedClass = currentPath === tab.path ? "selected" : "";
      return `
        <li>
          <a id="${tab.title}-tab" href="${tab.path}">
            <div class="tab-item ${selectedClass}">
              <h3>${tab.title}</h3>
            </div>
          </a>
        </li>
      `;
    }).join("");

    const response = await fetch(TMDB_MOVIE_LISTS[listType], FETCH_OPTIONS);
    const moviesData = await response.json();

    // 최고 평점 영화 추출
    const bestMovie = getBestMovie(moviesData.results);

    const bestMovieBanner = bestMovie
      ? TMDB_BANNER_URL + bestMovie.backdrop_path
      : "";
    const bestMovieTitle = bestMovie ? bestMovie.title : "No title";
    const bestMovieRate = bestMovie ? bestMovie.vote_average.toFixed(1) : "";

    // 영화 목록 데이터를 HTML로 변환
    const moviesHTML = moviesData.results
      .map((movie) => getMovieListInnerHTML(movie))
      .join("");

    let modalHTML = "";

    // 만약 movieId가 주어졌다면 영화 상세 정보로 모달 생성
    if (movieId) {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_TOKEN}`,
        FETCH_OPTIONS
      );
      const movieDetail = await movieResponse.json();

      modalHTML = getMovieDetailModalInnerHTML(movieDetail);
    }

    // 템플릿 파일 읽기
    const templatePath = path.join(__dirname, "../../views", "index.html");
    const template = fs.readFileSync(templatePath, "utf-8");

    // 템플릿에 영화 데이터 및 모달 데이터 삽입
    let renderedHTML = template
      .replace("${TAB_ITEMS_PLACEHOLDER}", tabsHTML)
      .replace("${background-container}", bestMovieBanner)
      .replace("${MOVIE_ITEMS_PLACEHOLDER}", moviesHTML)
      .replace("${bestMovie.title}", bestMovieTitle)
      .replace("${bestMovie.rate}", bestMovieRate)
      .replace("${MODAL_AREA}", modalHTML);

    res.send(renderedHTML);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Server Error");
  }
};
