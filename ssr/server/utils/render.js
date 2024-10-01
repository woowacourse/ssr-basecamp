export const renderMovieItems = (movieItems = []) =>
  movieItems
    .map(
      ({ id, title, poster_path, vote_average }) => /*html*/ `
        <li>
        <a href="/detail/${id}">
          <div class="item">
            <img
              class="thumbnail"
              src="https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}"
              alt="${title}"
            />
            <div class="item-desc">
              <p class="rate"><img src="/assets/images/star_empty.png" class="star" /><span>${vote_average}</span></p>
              <strong>${title}</strong>
            </div>
          </div>
        </a>
      </li>
      `
    )
    .join("");

export const renderHeader = (movieItem) => {
  return /*html*/ `
  <header>
  <div
    class="background-container"
    style="background-image: url('https://image.tmdb.org/t/p/original${movieItem.backdrop_path}')"
  >
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      <h1 class="logo">
        <img src="../assets/images/logo.png" alt="MovieList" />
      </h1>
      <div class="top-rated-movie">
        <div class="rate">
          <img src="../assets/images/star_empty.png" class="star" />
          <span class="rate-value">${movieItem.vote_average}</span>
        </div>
        <div class="title">${movieItem.title}</div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
  </div>
</header>
        `;
};
