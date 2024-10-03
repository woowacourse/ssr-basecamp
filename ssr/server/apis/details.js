import { FETCH_OPTIONS, TMDB_MOVIE_DETAIL_URL } from '../constants/movies.js';

const loadMovieDetail = async (id) => {
  const url = TMDB_MOVIE_DETAIL_URL + id;
  const params = new URLSearchParams({
    language: 'ko-KR',
  });
  const response = await fetch(url + '?' + params, FETCH_OPTIONS);

  return await response.json();
};

export default loadMovieDetail;
