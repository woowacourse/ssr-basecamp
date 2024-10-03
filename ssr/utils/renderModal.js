import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchMovieDetail } from '../apis/movies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderModal = async (res, movieId) => {
	const templatePath = path.join(__dirname, '../views', 'index.html');
	const movieDetail = await fetchMovieDetail(movieId);

	let template = fs.readFileSync(templatePath, 'utf-8');

	template = template.replace(
		'<!--${MODAL_AREA}-->',
		/*html*/ `
	    <div class="modal-background active" id="modalBackground">
	      <div class="modal">
	      <button class="close-modal" id="closeModal"><img src="../assets/images/modal_button_close.png" /></button>
	      <div class="modal-container">
	        <div class="modal-image">
	          <img src="https://image.tmdb.org/t/p/original/${movieDetail.poster_path}.jpg" />
	        </div>
	        <div class="modal-description">
	          <h2>${movieDetail.title}</h2>
	          <p class="category">${movieDetail.release_date.substring(0, 4)} · ${movieDetail.genres
			.map((genre) => genre.name)
			.join(', ')}</p>
	          <p class="rate"><img src="../assets/images/star_filled.png" class="star" /><span>7.7</span></p>
	          <hr />
	          <p class="detail">
	            ${movieDetail.overview}
	          </p>
	        </div>
	      </div>
	    </div>
	  </div>
	  <!-- 모달 창 닫기 스크립트 -->
	  <script>
	    const modalBackground = document.getElementById("modalBackground");
	    const closeModal = document.getElementById("closeModal");
	    document.addEventListener("DOMContentLoaded", () => {
	      closeModal.addEventListener("click", () => {
	        modalBackground.classList.remove("active");
	      });
	    });
	  </script>
	`
	);

	res.send(template);
};

export default renderModal;
