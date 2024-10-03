import { FETCH_OPTIONS } from '../constants/constant.js';

export const fetchMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);
  return await response.json(); // Parse and return the response JSON
};
