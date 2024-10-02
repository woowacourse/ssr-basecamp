export const renderMovieItem = (movieItem) => {
  const { title, releaseYear, genres, rate, description, bannerUrl } =
    movieItem;

  return /*html*/ `
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="/assets/images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${bannerUrl}"
            alt="영화 포스터"
          />
          </div>
          <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">
              ${releaseYear} · ${genres}
            </p>
            <p class="rate">
              <img src="/assets/images/star_empty.png" class="star" />
              <span>${rate}</span>
            </p>
            <hr />
            <p class="detail">${description}</p>
          </div>
        </div>
      </div>
    </div>
        `;
};
