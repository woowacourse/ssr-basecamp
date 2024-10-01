/**
 * @typedef {Object} Movie
 * @property {boolean} adult - 성인 여부
 * @property {string} backdrop_path - 배경 이미지 경로
 * @property {number[]} genre_ids - 장르 ID 배열
 * @property {number} id - 영화 ID
 * @property {string} original_language - 원래 언어
 * @property {string} original_title - 원제
 * @property {string} overview - 영화 개요
 * @property {number} popularity - 인기 지수
 * @property {string} poster_path - 포스터 이미지 경로
 * @property {string} release_date - 개봉일
 * @property {string} title - 제목
 * @property {boolean} video - 비디오 여부
 * @property {number} vote_average - 평균 평점
 * @property {number} vote_count - 평점 수
 */

import { TMDB_THUMBNAIL_URL } from '../constants.js';

/**
 * @param {Movie} movie - 영화 객체
 * @returns {string} html형식의 값
 */

export default function createMovieThumbnail(movie) {
  return `<li>
    <div class='item'>
      <img
        class='thumbnail'
        src=${TMDB_THUMBNAIL_URL}${movie.poster_path}
        alt=${movie.title}
      />
      <div class='item-desc'>
        <p class='rate'>
          <img src='../assets/images/star_empty.png' class='star' />
          <span>${movie.vote_average.toFixed(1)}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>
  </li>`;
}
