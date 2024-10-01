import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

export const BASE_URL = "https://api.themoviedb.org/3/movie";

export const TMDB_THUMBNAIL_URL =
  "https://media.themoviedb.org/t/p/w440_and_h660_face/";
export const TMDB_ORIGINAL_URL = "https://image.tmdb.org/t/p/original/";
export const TMDB_BANNER_URL =
  "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";
export const TMDB_MOVIE_LISTS = {
  popular: BASE_URL + "/popular?language=ko-KR&page=1",
  nowPlaying: BASE_URL + "/now_playing?language=ko-KR&page=1",
  topRated: BASE_URL + "/top_rated?language=ko-KR&page=1",
  upcoming: BASE_URL + "/upcoming?language=ko-KR&page=1",
};
export const TMDB_MOVIE_DETAIL_URL = "https://api.themoviedb.org/3/movie/";

export const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.VITE_TMDB_TOKEN,
  },
};

const loadMovies = async url => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data;
};

const fetchAllMovies = async () => {
  try {
    const urls = Object.values(TMDB_MOVIE_LISTS);

    // Promise.all을 사용해 병렬로 모든 요청 처리
    const [popular, nowPlaying, topRated, upcoming] = await Promise.all(
      urls.map(loadMovies)
    );

    // 각 속성에 데이터를 할당
    const movieData = {
      popular,
      nowPlaying,
      topRated,
      upcoming,
    };

    return movieData;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

router.get("/", async (_, res) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "index.html");

    const movieData = await fetchAllMovies();
    res.send(renderedHTML);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
