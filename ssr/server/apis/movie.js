import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "../constants.js";

export const loadMovies = async url => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data;
};

export const fetchAllMovies = async () => {
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
