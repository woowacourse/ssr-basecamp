import { TMDB_THUMBNAIL_URL } from '../constants/movies.js';

const renderMovieItem = (movie) => {
  const thumbnailFullUrl = TMDB_THUMBNAIL_URL + '/' + movie.poster_path;

  const StarEmptyImgSrc = './assets/images/star_empty.png';

  return /* html */ `
  <li>
    <a href='/detail/${movie.id}'>
      <div class="item">
        <img class="thumbnail" src=${thumbnailFullUrl} alt=${movie.title} />
        <div class="item-desc">
          <p class="rate">
            <img src=${StarEmptyImgSrc} class="star" />
            <span>${movie.vote_average.toFixed(1)}</span>
          </p>
          <strong>${movie.title}</strong>
        </div>
      </div>
    </a>
  </li>
  `;
};

export default renderMovieItem;
