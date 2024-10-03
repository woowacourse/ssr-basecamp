import fetch from "node-fetch";
import { API_MOVIE_ENDPOINTS, FETCH_OPTIONS } from "../config.js";

export async function getMovies(endpoint) {
  try {
    const url = `${API_MOVIE_ENDPOINTS[endpoint]}?language=ko-KR&page=1`;
    const response = await fetch(url, FETCH_OPTIONS);
    if (!response.ok) {
      throw new Error(`HTTP 요청에 실패했습니다. : ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("영화 목록을 불러오는데 실패했습니다. :", error);
    return [];
  }
}