import { TMDB_THUMBNAIL_URL } from "./constants.js";

export const generateMovieItems = (movies = []) => {
  return movies
    .map(({ id, title, vote_average, poster_path }) => {
      /*html*/
      return `
          <li key="${id}">
            <a href="/detail/${id}">
              <div class="item">
                <img class="thumbnail" src="${TMDB_THUMBNAIL_URL}/${poster_path}" alt="${title}" />
                <div class="item-desc">
                  <p class="rate">
                    <img src="/images/star-empty.png" class="star" />
                    <span>${vote_average.toFixed(1)}</span>
                  </p>
                  <strong>${title}</strong>
                </div>
              </div>
            </a>
          </li>
        `;
    })
    .join("");
};
