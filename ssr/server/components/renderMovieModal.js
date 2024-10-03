export function renderMovieModal(title, thumbnailFullUrl, releaseYear, genres, rate, description) {
  return `
      <div class="modal-background active" id="modalBackground">
        <div class="modal">
          <button class="close-modal" id="closeModal">
            <img src="/assets/images/modal_button_close.png" />
          </button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="${thumbnailFullUrl}" />
            </div>
            <div class="modal-description">
              <h2>${title}</h2>
              <p class="category">
                ${releaseYear.split('-')[0]} · ${genres.map((genre) => genre.name).join(', ')}
              </p>
              <p class="rate">
                <img src="/assets/images/star_filled.png" class="star" />
                <span>${rate.toFixed(1)}</span>
              </p>
              <hr />
              <p class="detail">
                ${description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <script>
        const modalBackground = document.getElementById("modalBackground");
        const closeModal = document.getElementById("closeModal");
        document.addEventListener("DOMContentLoaded", () => {
          closeModal.addEventListener("click", () => {
            modalBackground.classList.remove("active");
          });
        });
      </script>
    `;
}
