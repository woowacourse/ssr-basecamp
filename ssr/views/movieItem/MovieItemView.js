import { TMDB_THUMBNAIL_URL } from "../../server/Constant.js";

const MovieItemView = (movie) => {
  return `<li>
    <div class="item">
      <img class="thumbnail" src="${`${TMDB_THUMBNAIL_URL}${movie.poster_path}`}" alt="${movie.title}" />
      <div class="item-desc">
        <p class="rate">
          <img src="/assets/images/star_empty.png"" class="star" />
          <span>${movie.vote_average.toFixed(1)}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>
  </li>
`;
};

export default MovieItemView;
