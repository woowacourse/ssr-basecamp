import { FETCH_OPTIONS } from '../constants/constant.js';

export const fetchMovies = async (type) => {
  const response = await fetch(type, FETCH_OPTIONS);
  return await response.json();
};
