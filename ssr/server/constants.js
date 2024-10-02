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

export const CATEGORIES = {
  nowPlaying: "상영 중",
  popular: "인기순",
  topRated: "평점순",
  upcoming: "상영 예정",
};

export const CONTAINER_TAB_LIST = {
  nowPlaying: {
    id: "nowPlaying",
    url: "now-playing",
    name: "상영 중",
  },
  popular: {
    id: "popular",
    url: "popular",
    name: "인기순",
  },
  topRated: {
    id: "topRated",
    url: "top-rated",
    name: "평점순",
  },
  upcoming: {
    id: "upcoming",
    url: "upcoming",
    name: "상영 예정",
  },
};
