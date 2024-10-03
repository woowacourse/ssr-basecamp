import { fetchMovies } from "../apis/movie.js";
import { TMDB_RESOURCE, PATH } from "../constant.js";

export const renderMovieList = async () => {
  const fetchedMovies = await fetchMovies();
  const movieListHTML = fetchedMovies.results.map((movie) =>
    renderMovieItem(movie)
  );

  return movieListHTML.join("");
};

export const renderMovieItem = (movie) => {
  const movieDetailPath = PATH.MOVIE_DETAIL(movie.id);
  const thumbnailURL = TMDB_RESOURCE.IMAGE.THUMBNAIL_URL + movie.poster_path;
  const averageScore = movie.vote_average.toFixed(1);

  return /*html*/ `
    <li>
      <a href=${movieDetailPath}>
        <div class="item">
          <img
            class="thumbnail"
            src=${thumbnailURL}
            alt=${movie.title}
          />
          <div class="item-desc">
            <p class="rate"><img src="./images/star_empty.png" class="star" alt="별점" /><span>${averageScore}</span></p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </a>
    </li>
  `;
};
