import { TMDB_BANNER_URL } from "../../server/Constant.js";
import round from "../../utils/round.js";

const TopRatedMovieView = (movie) => {
  const bannerUrl = TMDB_BANNER_URL + movie.backdrop_path;

  return /* html */ `
  <div class="background-container" style='background-image: url("${bannerUrl}")'>
    <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <h1 class="logo">
          <img src="../assets/images/logo.png" alt="MovieList" />
        </h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span class="rate-value">${round(movie.vote_average, 1)}</span>
          </div>
          <div class="title">${movie.title}</div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
  </div>
  `;
};

export default TopRatedMovieView;
