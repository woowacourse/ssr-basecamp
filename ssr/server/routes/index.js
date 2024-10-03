import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movies = await loadMovies(TMDB_MOVIE_LISTS.nowPlaying);
  const movie = movies[0] ?? {
    id: -1,
    title: "",
    bannerUrl: "",
    vote_average: 0,
  };

  const renderedHTML = template
    .replace("${MOVIE_ITEMS_PLACEHOLDER}", getMovieItemHTML(movies))
    .replace("${background-container}", TMDB_BANNER_URL + movie.backdrop_path)
    .replace("${bestMovie.rate}", round(movie.vote_average, 1))
    .replace("${bestMovie.title}", movie.title)
    .replace("${isSelectedNowPlaying}", "selected");

  res.send(renderedHTML);
});

router.get("/now-playing", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movies = await loadMovies(TMDB_MOVIE_LISTS.nowPlaying);
  const movie = movies[0] ?? {
    id: -1,
    title: "",
    bannerUrl: "",
    vote_average: 0,
  };

  const renderedHTML = template
    .replace("${MOVIE_ITEMS_PLACEHOLDER}", getMovieItemHTML(movies))
    .replace("${background-container}", TMDB_BANNER_URL + movie.backdrop_path)
    .replace("${bestMovie.rate}", round(movie.vote_average, 1))
    .replace("${bestMovie.title}", movie.title)
    .replace("${isSelectedNowPlaying}", "selected");

  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movies = await loadMovies(TMDB_MOVIE_LISTS.popular);
  const movie = movies[0] ?? {
    id: -1,
    title: "",
    bannerUrl: "",
    vote_average: 0,
  };

  const renderedHTML = template
    .replace("${MOVIE_ITEMS_PLACEHOLDER}", getMovieItemHTML(movies))
    .replace("${background-container}", TMDB_BANNER_URL + movie.backdrop_path)
    .replace("${bestMovie.rate}", round(movie.vote_average, 1))
    .replace("${bestMovie.title}", movie.title)
    .replace("${isSelectedPopular}", "selected");

  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movies = await loadMovies(TMDB_MOVIE_LISTS.topRated);
  const movie = movies[0] ?? {
    id: -1,
    title: "",
    bannerUrl: "",
    vote_average: 0,
  };

  const renderedHTML = template
    .replace("${MOVIE_ITEMS_PLACEHOLDER}", getMovieItemHTML(movies))
    .replace("${background-container}", TMDB_BANNER_URL + movie.backdrop_path)
    .replace("${bestMovie.rate}", round(movie.vote_average, 1))
    .replace("${bestMovie.title}", movie.title)
    .replace("${isSelectedTopRated}", "selected");

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movies = await loadMovies(TMDB_MOVIE_LISTS.upcoming);
  const movie = movies[0] ?? {
    id: -1,
    title: "",
    bannerUrl: "",
    vote_average: 0,
  };

  const renderedHTML = template
    .replace("${MOVIE_ITEMS_PLACEHOLDER}", getMovieItemHTML(movies))
    .replace("${background-container}", TMDB_BANNER_URL + movie.backdrop_path)
    .replace("${bestMovie.rate}", round(movie.vote_average, 1))
    .replace("${bestMovie.title}", movie.title)
    .replace("${isSelectedUpcoming}", "selected");

  res.send(renderedHTML);
});

router.get("/detail/:movieId", async (req, res) => {
  const { movieId } = req.params;

  const templatePath = path.join(__dirname, "../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const movies = await loadMovies(TMDB_MOVIE_LISTS.upcoming);
  const movie = movies[0] ?? {
    id: -1,
    title: "",
    bannerUrl: "",
    vote_average: 0,
  };
  const movieDetail = await loadMovieDetail(movieId);

  const renderedHTML = template
    .replace("${MOVIE_ITEMS_PLACEHOLDER}", getMovieItemHTML(movies))
    .replace("${background-container}", TMDB_BANNER_URL + movie.backdrop_path)
    .replace("${bestMovie.rate}", round(movie.vote_average, 1))
    .replace("${bestMovie.title}", movie.title)
    .replace("${MODAL_AREA}", getMovieDetailModalHTML(movieDetail))
    .replace("${isSelectedNowPlaying}", "selected");

  res.send(renderedHTML);
});

// ---------------------------- HTML -------------------------------------------------

const getMovieItemHTML = (movies) => {
  return movies
    .map(
      ({ id, title, vote_average, poster_path }) =>
        `<li>
          <a href="/detail/${id}">
            <div class="item" onClick={onClick}>
              <img class="thumbnail" src=${
                TMDB_THUMBNAIL_URL + "/" + poster_path
              } alt=${title} />
              <div class="item-desc">
                <p class="rate">
                  <img src="../../assets/images/star_empty.png" class="star" />
                  <span>${round(vote_average, 1)}</span>
                </p>
                <strong>${title}</strong>
              </div>
            </div>
          </a>
        </li>`
    )
    .join("");
};

const getMovieDetailModalHTML = (movieDetail) => {
  const { title, bannerUrl, releaseYear, description, genres, rate } = {
    title: movieDetail.title,
    bannerUrl: TMDB_ORIGINAL_URL + movieDetail.poster_path,
    releaseYear: movieDetail.release_date.split("-")[0],
    description: movieDetail.overview,
    genres: movieDetail.genres.map(({ name }) => name),
    rate: round(movieDetail.vote_average, 1),
  };

  const handleCloseButtonClick =
    "document.getElementById('modalBackground').classList.remove('active')";

  return `
    <div class="modal-background active" id="modalBackground" onClick=${handleCloseButtonClick}>
      <div class="modal">
        <button class="close-modal" id="closeModal"><img src="../assets/images/modal_button_close.png" /></button>
        <div class="modal-container">
          <div class="modal-image">
            <img src=${bannerUrl} />
          </div>
          <div class="modal-description">
            <h2>${title}</h2>
            <p class="category"> ${releaseYear} · ${genres?.join(", ")}</p>
            <p class="rate"><img src="../assets/images/star_filled.png" class="star" /><span>${round(
              rate,
              1
            )}</span></p>
            <hr />
            <p class="detail">
              ${description}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};

// ---------------------------- API -------------------------------------------------

const BASE_URL = "https://api.themoviedb.org/3/movie";

const TMDB_MOVIE_LISTS = {
  popular: BASE_URL + "/popular?language=ko-KR&page=1",
  nowPlaying: BASE_URL + "/now_playing?language=ko-KR&page=1",
  topRated: BASE_URL + "/top_rated?language=ko-KR&page=1",
  upcoming: BASE_URL + "/upcoming?language=ko-KR&page=1",
};
const TMDB_THUMBNAIL_URL =
  "https://media.themoviedb.org/t/p/w440_and_h660_face/";
const TMDB_ORIGINAL_URL = "https://image.tmdb.org/t/p/original/";
const TMDB_BANNER_URL =
  "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";
const TMDB_MOVIE_DETAIL_URL = "https://api.themoviedb.org/3/movie/";

const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TMDB_TOKEN,
  },
};

const loadMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};

const loadMovieDetail = async (id) => {
  const url = TMDB_MOVIE_DETAIL_URL + id;
  console.log(url);
  const params = new URLSearchParams({
    language: "ko-KR",
  });
  const response = await fetch(url + "?" + params, FETCH_OPTIONS);

  return await response.json();
};

// ---------------------------- UTILS -------------------------------------------------

const round = (value, decimals = 0) => {
  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
};

export default router;
