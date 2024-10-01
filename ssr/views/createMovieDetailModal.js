import { TMDB_ORIGINAL_URL } from '../constants.js';

/**
 * @typedef {Object} MovieDetail
 * @property {boolean} adult - 성인 영화 여부
 * @property {string} backdrop_path - 배경 이미지 경로
 * @property {?Object} belongs_to_collection - 컬렉션 정보 (없을 경우 null)
 * @property {number} budget - 예산
 * @property {Genre[]} genres - 장르 목록
 * @property {string} homepage - 홈페이지 URL
 * @property {number} id - 영화 ID
 * @property {string} imdb_id - IMDb ID
 * @property {string[]} origin_country - 제작 국가
 * @property {string} original_language - 원어
 * @property {string} original_title - 원제
 * @property {string} overview - 영화 개요
 * @property {number} popularity - 인기 지수
 * @property {string} poster_path - 포스터 이미지 경로
 * @property {ProductionCompany[]} production_companies - 제작사 목록
 * @property {ProductionCountry[]} production_countries - 제작 국가 정보
 * @property {string} release_date - 개봉일
 * @property {number} revenue - 수익
 * @property {number} runtime - 상영 시간 (분)
 * @property {Language[]} spoken_languages - 사용 언어 목록
 * @property {string} status - 영화 상태
 * @property {string} tagline - 태그라인
 * @property {string} title - 영화 제목
 * @property {boolean} video - 비디오 여부
 * @property {number} vote_average - 평균 평점
 * @property {number} vote_count - 투표 수
 */

/**
 * @typedef {Object} Genre
 * @property {number} id - 장르 ID
 * @property {string} name - 장르 이름
 */

/**
 * @typedef {Object} ProductionCompany
 * @property {number} id - 제작사 ID
 * @property {string} logo_path - 로고 이미지 경로
 * @property {string} name - 제작사 이름
 * @property {string} origin_country - 제작사 국가
 */

/**
 * @typedef {Object} ProductionCountry
 * @property {string} iso_3166_1 - ISO 3166-1 코드
 * @property {string} name - 국가 이름
 */

/**
 * @typedef {Object} Language
 * @property {string} english_name - 영어 이름
 * @property {string} iso_639_1 - ISO 639-1 코드
 * @property {string} name - 언어 이름
 */

/**
 *
 * @param {MovieDetail} movieDetail
 * @param {?string} closeLink
 * @returns {string} html형식의 모달
 */
export default function createMovieDetailModal(movieDetail, closeLink = '/') {
  return `<div class="modal-background active" id="modalBackground">
      <div class="modal">
        <a href="${closeLink}" class="close-modal" id="closeModal"><img src="/assets/images/modal_button_close.png" /></a>
        <div class="modal-container">
          <div class="modal-image">
            <img src="${TMDB_ORIGINAL_URL}${movieDetail.poster_path}" />
          </div>
          <div class="modal-description">
            <h2>${movieDetail.title}</h2>
            <p class="category">${movieDetail.release_date.slice(
              0,
              4
            )} · ${movieDetail.genres.map(genre => genre.name).join(',')}</p>
            <p class="rate"><img src="/assets/images/star_filled.png" class="star" /><span>7.7</span></p>
            <hr />
            <p class="detail">
              ${movieDetail.overview}
            </p>
          </div>
        </div>
      </div>
    </div>`;
}
