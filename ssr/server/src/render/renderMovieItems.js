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
