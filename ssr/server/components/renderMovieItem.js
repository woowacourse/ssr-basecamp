export function renderMovieItem(movieId, title, thumbnailFullUrl, rate) {
  return `
      <div class="item" onClick="window.location.href='/detail/${movieId}'">
        <img class="thumbnail" src="${thumbnailFullUrl}" alt="${title}" />
        <div class="item-desc">
          <p class="rate">
            <img src="/assets/images/star_filled.png" class="star" alt="star" />
            <span>${rate.toFixed(1)}</span>
          </p>
          <strong>${title}</strong>
        </div>
      </div>
    `;
}
