export const renderMovieItems = (movieItems = []) =>
	movieItems.map(
		({ id, title, poster_path, vote_average }) => /*html*/ `
    <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}"
            alt="${title}"
          />
          <div class="item-desc">
          
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${vote_average}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `
	);
