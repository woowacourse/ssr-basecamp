import { TMDB_THUMBNAIL_URL } from "../../utils/constants.js";

export default function getMovieList(movies) {
  const movieTemplate = (movieDetail) => `<li>
    <a class="item" href="/detail/${movieDetail.id}">
      <img class="thumbnail" src="${TMDB_THUMBNAIL_URL + "/" + movieDetail.poster_path}" alt="${movieDetail.title}"/>
      <div class="item-desc">
        <p class="rate"><img src="/assets/images/star_empty.png" class="star" />
          <span>"${movieDetail.vote_average}"</span>
        </p>
      <strong>"${movieDetail.title}"</strong>
      </div>
    </a>
  </li>`;

  return movies.map((movie) => movieTemplate(movie)).join("");
}
