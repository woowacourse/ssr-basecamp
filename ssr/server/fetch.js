import { FETCH_OPTIONS, TMDB_MOVIE_DETAIL_URL } from "./constant.js";

export const fetchMovies = async (url) => {
  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('TMDB API 요청 실패:', error);
    return [];
  }
};
