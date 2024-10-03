export const renderMovieItems = (movieItems = []) =>
  movieItems.map(
    ({ id, title, thumbnail, rate }) => /*html*/ `
      <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${thumbnail}"
            alt="${title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../images/star_empty.png" class="star" /><span>${rate}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `
  );

export const renderTabs = (selectedCategory) => {
  const categories = {
    NOW_PLAYING: "상영 중",
    POPULAR: "인기순",
    TOP_RATED: "평점순",
    UPCOMING: "상영 예정",
  };

  return Object.entries(categories).map((category) => {
    const isSelected = selectedCategory === category[0] ? "selected" : "";
    const href = `/${category[0].toLowerCase().replace("_", "-")}`;

    return (
      /*html*/
      `<li>
 <a href="${href}">
   <div class="tab-item ${isSelected}"><h3>${category[1]}</h3></div>
 </a>
</li>`
    );
  });
};

export const renderDetailModal = (movieDetail) => {
  return /*html*/ `
  <div class="modal-background active" id="modalBackground">
    <div class="modal">
    <button class="close-modal" id="closeModal"><img src="../images/modal_button_close.png" /></button>
    <div class="modal-container">
      <div class="modal-image">
        <img src="https://image.tmdb.org/t/p/original/${
          movieDetail.thumbnail
        }.jpg" />
      </div>
      <div class="modal-description">
        <h2>${movieDetail.title}</h2>
        <p class="category">${
          movieDetail.releaseYear
        } · ${movieDetail.genres.join(", ")}</p>
        <p class="rate"><img src="../images/star_filled.png" class="star" /><span>${
          movieDetail.rate
        }</span></p>
        <hr />
        <p class="detail">
          ${movieDetail.description}
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
`;
};
