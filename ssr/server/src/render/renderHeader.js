import { round } from "../../../../csr/src/utils.js";

export const renderHeader = ({ id, title, backdrop_path, vote_average }) => {
  return /*html*/ `
    <header>
      <div
        class="background-container"
        style="background-image: url('https://media.themoviedb.org/t/p/original${backdrop_path}')"
      >
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
          <h1 class="logo">
            <img src="/assets/images/logo.png" alt="MovieList" />
          </h1>
          <div class="top-rated-movie">
            <div class="rate">
              <img src="/assets/images/star_empty.png" class="star" />
              <span class="rate-value">${round(vote_average, 1)}</span>
            </div>
            <div class="title">${title}</div>
            <a href="/detail/${id}" class="primary detail" >자세히 보기</ㅁ>
          </div>
        </div>
      </div>
    </header>
  `;
};
