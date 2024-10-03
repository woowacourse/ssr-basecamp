import { TMDB_ORIGINAL_URL } from "../../config.js";

export const getDetailModalHTML = (movieDetail) =>  `
  <div class="modal-background active" id="modalBackground">
    <div class="modal">
      <button class="close-modal" id="closeModal"><img src="../assets/images/modal_button_close.png" /></button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="${TMDB_ORIGINAL_URL}${movieDetail.poster_path}" />
        </div>
        <div class="modal-description">
          <h2>${movieDetail.title}</h2>
          <p class="category">${movieDetail.release_date.split('-')[0]} · ${movieDetail.genres.map(({name})=>name).join(', ')}</p>
          <p class="rate"><img src="../assets/images/star_filled.png" class="star" /><span>${movieDetail.vote_average.toFixed(1)}</span></p>
          <hr />
          <p class="detail">
            ${movieDetail.overview}
          </p>
        </div>
      </div>
    </div>
  </div>
  <script>
    document.getElementById('closeModal').addEventListener('click', function() {
      document.getElementById('modalBackground').classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  </script>
`;