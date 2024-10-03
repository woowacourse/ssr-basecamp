const renderHeader = (bestMovie) => {
  return /*html*/ `
  <header>
    <div
      class="background-container"
      style="background-image: url('https://media.themoviedb.org/t/p/original${
        bestMovie.backdrop_path
      }')"
    >
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <h1 class="logo">
          <img src="../assets/images/logo.png" alt="MovieList" />
        </h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span class="rate-value">${
              Math.round(bestMovie.vote_average * 10).toFixed(1) / 10
            }</span>
          </div>
          <div class="title">${bestMovie.title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
  </header>
  `;
};

export default renderHeader;
