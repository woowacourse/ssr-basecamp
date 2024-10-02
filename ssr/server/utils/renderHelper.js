import {
  CONTAINER_TAB_LIST,
  TMDB_BANNER_URL,
  TMDB_THUMBNAIL_URL,
} from "../constants.js";
import round from "../utils/round.js";

export const renderMovieItem = movie => {
  const thumbnailFullUrl = TMDB_THUMBNAIL_URL + movie.poster_path;
  return `
    <li class="movie-item">
      <div class="item" onclick="handleClick('${movie.id}')">
        <img class="thumbnail" src="${thumbnailFullUrl}" alt="${movie.title}" />
        <div class="item-desc">
          <p class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span>${Math.round(movie.vote_average * 10) / 10}</span>
          </p>
          <strong>${movie.title}</strong>
        </div>
      </div>
    </li>
  `;
};

export const renderBestMovie = (movie, html) => {
  const bannerUrl = TMDB_BANNER_URL + movie.backdrop_path;

  return html
    .replace("${background-container}", bannerUrl)
    .replace("${bestMovie.rate}", round(movie.vote_average, 1))
    .replace("${bestMovie.title}", movie.title);
};

const makeTabItemHTML = (item, isSelected) => {
  if (isSelected) {
    return `
    <li>
      <a href=${item.url}>
        <div class="tab-item selected">
          <h3>${item.name}</h3>
        </div>
        </a>
    </li>
  `;
  }

  return `
    <li>
      <a href=${item.url}>
        <div class="tab-item">
          <h3>${item.name}</h3>
        </div>
        </a>
    </li>
  `;
};

export const renderTabList = selectedCategory => {
  const tabItemHTML = Object.values(CONTAINER_TAB_LIST)
    .map(tab => makeTabItemHTML(tab, tab.id === selectedCategory.id))
    .join("");

  return `
    <ul class="tab">
      ${tabItemHTML}
    </ul>
  `;
};
