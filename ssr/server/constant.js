export const BASE_URL = "https://api.themoviedb.org/3/movie";

export const TMDB_RESOURCE = {
  IMAGE: {
    THUMBNAIL_URL: "https://media.themoviedb.org/t/p/w440_and_h660_face/",
    ORIGINAL_URL: "https://image.tmdb.org/t/p/original/",
    BANNER_URL: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/",
  },
};

export const TMDB_API_URL = {
  MOVIE_LISTS: {
    NOW_PLAYING: `${BASE_URL}/now_playing?language=ko-KR&page=1`,
    POPULAR: `${BASE_URL}/popular?language=ko-KR&page=1`,
    TOP_RATED: `${BASE_URL}/top_rated?language=ko-KR&page=1`,
    UPCOMING: `${BASE_URL}/upcoming?language=ko-KR&page=1`,
  },
  MOVIE_DETAIL_URL: (movieId) => `${BASE_URL}/${movieId}?language=ko-KR`,
};

export const ROUTE = {
  ROOT: "/",
  MOVIE_LISTS: {
    NOW_PLAYING: "/now-playing",
    POPULAR: "/popular",
    TOP_RATED: "/top-rated",
    UPCOMING: "/upcoming",
  },
  MOVIE_DETAIL: "/detail/:movieId",
  MOVIE_DETAIL_PATH: (movieId, listType) =>
    `/detail/${movieId}?listType=${listType}`,
};

export const MOVIE_LIST_TYPE = {
  NOW_PLAYING: {
    TYPE: "NOW_PLAYING",
    TAB_NAME: "상영 중",
  },
  POPULAR: {
    TYPE: "POPULAR",
    TAB_NAME: "인기순",
  },
  TOP_RATED: {
    TYPE: "TOP_RATED",
    TAB_NAME: "평점순",
  },
  UPCOMING: {
    TYPE: "UPCOMING",
    TAB_NAME: "상영 예정",
  },
};

export const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TMDB_TOKEN,
  },
};
