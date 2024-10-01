import fetch from "node-fetch";

const TMDB_TOKEN = process.env.TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: "application/json",
  },
};

const url = (filter) => {
  return `https://api.themoviedb.org/3/movie/${filter}?language=ko-KR&page=1`;
};

export const getMovies = async (filter) => {
  const response = await fetch(url(filter), options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

export const getMovie = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
