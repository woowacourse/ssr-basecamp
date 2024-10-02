export const renderHeader = ({ id, title, background, rate }) => /*html*/ `
  <header>
    <div class="background-container" style="background-image: url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${background}')">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <h1 class="logo"><img src="../assets/images/logo.png" alt="MovieList" /></h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span class="rate-value">${rate}</span>
          </div>
          <div class="title">${title}</div>
          <button class="primary detail" onClick="window.location='/detail/${id}'">자세히 보기</button>
        </div>
      </div>
    </div>
  </header>
`;
