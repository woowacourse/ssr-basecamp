export const BASE_URL = "https://api.themoviedb.org/3/movie";

export const TMDB_THUMBNAIL_URL =
  "https://media.themoviedb.org/t/p/w440_and_h660_face/";
export const TMDB_ORIGINAL_URL = "https://image.tmdb.org/t/p/original/";
export const TMDB_BANNER_URL =
  "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";
export const TMDB_MOVIE_LISTS = {
  POPULAR: BASE_URL + "/popular?language=ko-KR&page=1",
  NOW_PLAYING: BASE_URL + "/now_playing?language=ko-KR&page=1",
  TOP_RATED: BASE_URL + "/top_rated?language=ko-KR&page=1",
  UPCOMING: BASE_URL + "/upcoming?language=ko-KR&page=1",
};
export const TMDB_MOVIE_DETAIL_URL = "https://api.themoviedb.org/3/movie/";

export const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TMDB_TOKEN,
  },
};

export const TAB_DATA = [
  { path: "/now-playing", title: "상영 중" },
  { path: "/popular", title: "인기순" },
  { path: "/top-rated", title: "평점순" },
  { path: "/upcoming", title: "상영 예정" },
];
