import { TMDB_BANNER_URL } from "../../utils/constants.js";

export default function getHeader(movie) {
  return `
    <div class="background-container" style="background-image: url('${TMDB_BANNER_URL + movie.backdrop_path}')">
            <div class="overlay" aria-hidden="true"></div>
            <div class="top-rated-container">
    <h1 class="logo"><img src="/assets/images/logo.png"" alt="MovieList" /></h1>
              <div class="top-rated-movie">
                <div class="rate">
                  <img src="/assets/images/star_empty.png" class="star" />
                  <span class="rate-value">${movie.vote_average}</span>
                </div>
                <div class="title">${movie.title}</div>
                <button class="primary detail">자세히 보기</button>
              </div>
            </div></div>`;
}
