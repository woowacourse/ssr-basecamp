import { TMDB_BANNER_URL, TMDB_THUMBNAIL_URL } from "../constants.js";
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
