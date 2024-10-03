import fetch from 'node-fetch';
import { FETCH_OPTIONS } from '../constant.js';

export const getMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};
