import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { MOVIE_TABS } from "../../constants/tabs.js";
import { MOVIE_PAGE_PATH } from "../../constants/path.js";
import { TMDB_BANNER_URL } from "../../constants/api.js";
import { HTML_PLACEHOLDERS } from "../../constants/placeholder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderMoviePageHTML = (currentPath, movieList = [], bestMovie) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const { backdrop_path, vote_average, title, id: bestMovieId } = bestMovie;
  const backdropImageUrl = `${TMDB_BANNER_URL}${backdrop_path}`;
  const roundedRate = vote_average.toFixed(1);

  const movieListHTML = getMovieListHTML(movieList);
  const movieTabsHTML = getMovieTabsHTML(currentPath);
  const bestMovieDetailModalTriggerHTML =
    getBestMovieDetailModalTriggerHtml(bestMovieId);

  return template
    .replace(HTML_PLACEHOLDERS.bestMovieBackgroundImage, backdropImageUrl)
    .replace(
      HTML_PLACEHOLDERS.bestMovieDetailTrigger,
      bestMovieDetailModalTriggerHTML
    )
    .replace(HTML_PLACEHOLDERS.movieTabs, movieTabsHTML)
    .replace(HTML_PLACEHOLDERS.bestMovieTitle, title)
    .replace(HTML_PLACEHOLDERS.bestMovieRate, roundedRate)
    .replace(HTML_PLACEHOLDERS.movieList, movieListHTML);
};

const checkIsSelectedTab = (currentPath, tabHref) => {
  if (
    currentPath === MOVIE_PAGE_PATH.home &&
    tabHref === MOVIE_PAGE_PATH.nowPlaying
  )
    return true;

  return currentPath !== MOVIE_PAGE_PATH.home && currentPath === tabHref;
};

const getBestMovieDetailModalTriggerHtml = (id) => {
  return /*html*/ `<button class="primary detail" onClick="window.location.href='detail/${id}'">자세히 보기</button>`;
};

export const getMovieTabsHTML = (currentPath) => {
  return MOVIE_TABS.map(({ href, label }) => {
    const isSelectedTab = checkIsSelectedTab(currentPath, href);

    return /*html*/ `
      <li>
        <a href="${href}">
          <div class="tab-item ${isSelectedTab ? "selected" : ""}">
            <h3>${label}</h3>
          </div>
        </a>
      </li>
      `;
  }).join("");
};

export const getMovieListHTML = (movieList = []) => {
  return movieList
    .map(({ id, title, poster_path, vote_average }) => {
      const thumbnailUrl = `${TMDB_BANNER_URL}${poster_path}`;
      const roundedRate = vote_average.toFixed(1);

      return /*html*/ `
        <li>
          <a href="/detail/${id}">
            <div class="item">
              <img
                class="thumbnail"
                src="${thumbnailUrl}"
                alt="${title}"
              />
              <div class="item-desc">
                <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${roundedRate}</span></p>
                <strong>${title}</strong>
              </div>
            </div>
          </a>
        </li>
    `;
    })
    .join("");
};
