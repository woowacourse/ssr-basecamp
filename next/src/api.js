import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "./Constant";

const SERVER_START_TIME = new Date().getTime();
console.log("서버 시작 시간은", new Date(SERVER_START_TIME).toLocaleTimeString(), "입니다.");

function isOneMinutePassed() {
  const currentTime = new Date().getTime();
  return currentTime - SERVER_START_TIME >= 60000;
}

export async function fetchMovieItems() {
  const response = await fetch(TMDB_MOVIE_LISTS.popular, FETCH_OPTIONS);
  const data = await response.json();
  const results = data?.results ?? [];

  if (isOneMinutePassed()) {
    console.log("1분이 지났습니다. 결과를 역순으로 반환합니다.");
    return results.reverse();
  }

  console.log("1분이 지나지 않았습니다. 원래 순서로 반환합니다.");
  return results;
}
