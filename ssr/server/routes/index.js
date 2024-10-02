import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { loadMovies } from "../../utils/fetch.js";
import { TMDB_MOVIE_LISTS, TMDB_THUMBNAIL_URL, TMDB_BANNER_URL } from "../../utils/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/", (_, res) => {
  res.redirect("/now-playing");
});

router.get("/now-playing", async (_, res) => {
  console.log(res.req.originalUrl);
  const tabTemplate = ({ href, name }) => `<li>
            <a href="${href}">
              <div class="tab-item ${res.req.originalUrl === href ? "selected" : ""}">
                <h3>${name}</h3>
              </div></a >
          </li>`;
  const tabList = [
    { href: "/now-playing", name: "상영중" },
    { href: "/popular", name: "인기순" },
    { href: "/top-rated", name: "평점순" },
    { href: "/upcoming", name: "상영 예정" },
  ];
  const tabHTML = tabList.map((tab) => tabTemplate(tab)).join("");

  const popularMovies = await loadMovies(TMDB_MOVIE_LISTS.popular);
  const movieTemplate = (movieDetail) => `<li>
  <div class="item">
  <img
  class="thumbnail"
  src="${TMDB_THUMBNAIL_URL + "/" + movieDetail.poster_path}"
  alt="${movieDetail.title}"
  />
  <div class="item-desc">
  <p class="rate"><img src="/assets/images/star_empty.png" class="star" /><span>"${movieDetail.vote_average}"</span></p>
    <strong>"${movieDetail.title}"</strong>
    </div>
    </div>
    </li>`;
  const moviesHTML = popularMovies.map((movie) => movieTemplate(movie)).join("");

  const bestMovie = popularMovies[0];

  const headerTemplate = `
  <div class="background-container" style="background-image: url('${TMDB_BANNER_URL + bestMovie.backdrop_path}')">
          <div class="overlay" aria-hidden="true"></div>
          <div class="top-rated-container">
  <h1 class="logo"><img src="/assets/images/logo.png"" alt="MovieList" /></h1>
            <div class="top-rated-movie">
              <div class="rate">
                <img src="/assets/images/star_empty.png" class="star" />
                <span class="rate-value">${bestMovie.vote_average}</span>
              </div>
              <div class="title">${bestMovie.title}</div>
              <button class="primary detail">자세히 보기</button>
            </div>
          </div></div>`;

  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template
    .replace("<!--${NAV_TAB_PLACEHOLDER}-->", tabHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace("<!--${HEADER_ITEM_PLACEHOLDER}-->", headerTemplate);

  res.send(renderedHTML);
});

export default router;
