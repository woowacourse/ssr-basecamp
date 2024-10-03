const ModalView = ({ title, bannerUrl, releaseYear, description, genres, rate }) => {
  return /* html */ `
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal" 
          onclick="document.getElementById('modalBackground').classList.remove('active'); window.history.pushState({}, '', '/now-playing');">
          <img src="/assets/images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="${bannerUrl}" />
          </div>
          <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">${releaseYear} · ${genres}</p>
            <p class="rate"><img src="/assets/images/star_filled.png" class="star" /><span>{${rate}}</span></p>
            <hr />
            <p class="detail">${description}</p>
          </div>
        </div>
      </div>
    </div>`;
};

export default ModalView;
