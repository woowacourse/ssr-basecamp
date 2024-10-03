import {TMDB_BANNER_URL, TMDB_THUMBNAIL_URL} from '../config.js';

export const getMoviesHTML = movies =>
  movies.reduce((acc, movie) => {
    return (
      acc +
      `
      <li>
        <div class="item">
          <img
            class="thumbnail"
            src="${TMDB_THUMBNAIL_URL}${movie.poster_path}"
            alt="${movie.title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${movie.vote_average.toFixed(1)}</span></p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </li>`
    );
  }, '');

export const getBestMovieHTML = movie => `
    <div class="background-container" style="background-image: url('${TMDB_BANNER_URL}${movie.backdrop_path}')">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <h1 class="logo"><img src="../assets/images/logo.png" alt="MovieList" /></h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span class="rate-value">${movie.vote_average.toFixed(1)}</span>
          </div>
          <div class="title">${movie.title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>`;

export const getTabHTML = currentPath => `
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
