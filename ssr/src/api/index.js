import fetch from "node-fetch";
import { BASE_URL, FETCH_OPTIONS } from "./constant.js";

export const getMovies = async (endpoint) => {
  const response = await fetch(
    `${BASE_URL}/${endpoint.replaceAll("-", "_")}?language=ko-KR&page=1`,
    FETCH_OPTIONS,
  );

  return await response.json();
};

export const getMovieDetail = async (movieId) => {
  const response = await fetch(`${BASE_URL}/${movieId}?language=ko-KR&page=1`, FETCH_OPTIONS);

  return await response.json();
};
