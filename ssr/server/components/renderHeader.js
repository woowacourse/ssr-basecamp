export function renderHeader(backgroundUrl, title, rate) {
  return `
      <header>
        <div class="background-container" style="background-image: url('${backgroundUrl}')">
          <div class="overlay" aria-hidden="true"></div>
          <div class="top-rated-container">
            <h1 class="logo">
              <img src="/assets/images/logo.png" alt="MovieList" />
            </h1>
            <div class="top-rated-movie">
              <div class="rate">
                <img src="/assets/images/star_empty.png" class="star" />
                <span class="rate-value">${rate.toFixed(1)}</span>
              </div>
              <div class="title">${title}</div>
              <button class="primary detail">자세히 보기</button>
            </div>
          </div>  
        </div>
      </header>
    `;
}
