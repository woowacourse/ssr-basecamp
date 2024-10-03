export const renderModal = ({
  title,
  thumbnail,
  releaseYear,
  genres,
  rate,
  description,
}) => /*html*/ `
  <div class="modal-background active" id="modalBackground">
    <div class="modal">
      <button class="close-modal" id="closeModal" onClick="location.href='/'">
        <img src="../assets/images/modal_button_close.png" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="https://image.tmdb.org/t/p/original${thumbnail}" />
        </div>
        <div class="modal-description">
          <h2>${title}</h2>
          <p class="category">
            ${releaseYear} · ${genres.join(", ")}
          </p>
          <p class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span>${rate}</span>
          </p>
          <hr />
          <p class="detail">${description}</p>
        </div>
      </div>
    </div>
  </div>
`;
