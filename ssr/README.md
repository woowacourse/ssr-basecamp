# SSR 페이지로 전환하기

## 1. node modules 설치

```
npm install
```

## 2. 개발 서버 실행

```
npm run dev
```

## 3. 사전 미션 진행 시 구현해야 하는 부분

이번 미션에서 진행해야 할 항목에 관해 나열했습니다.
참고용 코드이며, 상수나 변수의 명칭은 개인별로 자유롭게 정의할 수 있으며 구현을 위해서 아래의 예시 코드를 반드시 따를 필요는 없습니다.
**단, 페이징이나 무한스크롤은 구현하지 않습니다.**

### 1. TMDB API 요청하기

- TMDB 요청을 위한 API 항목을 상수로 정의합니다. (`src/constant.js`)

  ```js
  export const BASE_URL = "https://api.themoviedb.org/3/movie";

  export const TMDB_THUMBNAIL_URL =
    "https://media.themoviedb.org/t/p/w440_and_h660_face/";
  export const TMDB_ORIGINAL_URL = "https://image.tmdb.org/t/p/original/";
  export const TMDB_BANNER_URL =
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";
  export const TMDB_MOVIE_LISTS = {
    POPULAR: BASE_URL + "/popular?language=ko-KR&page=1",
    NOW_PLAYING: BASE_URL + "/now_playing?language=ko-KR&page=1",
    TOP_RATED: BASE_URL + "/top_rated?language=ko-KR&page=1",
    UPCOMING: BASE_URL + "/upcoming?language=ko-KR&page=1",
  };
  export const TMDB_MOVIE_DETAIL_URL = "https://api.themoviedb.org/3/movie/";

  export const FETCH_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_TOKEN,
    },
  };
  ```

- fetch 함수를 이용하여 아래와 같이 영화 목록을 요청합니다.

  ```js
  export const fetchMovies = async () => {
    const response = await fetch(TMDB_MOVIE_LISTS.POPULAR, FETCH_OPTIONS);

    return await response.json();
  };
  ```

### 2. TMDB API 응답을 기준으로 클라이언트에 응답할 항목 렌더링하기

#### 영화 목록 렌더링

```js
export const 영화목록_아이템_렌더링_함수_예제 = (movieItems = []) =>
  movieItems.map(
    ({ id, title, thumbnail, rate }) => /*html*/ `
      <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${thumbnail}"
            alt="${title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../images/star_empty.png" class="star" /><span>${rate}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `
  );
```

### 3. views/index.html 파일을 활용하여 클라이언트에 응답하기

express 서버에서 `views/index.html` 파일을 활용하여 클라이언트에 응답하는 과정입니다.
클라이언트로 응답할 때 활용하기 위한 템플릿이며, 아래 항목의 문자열에 적절히 렌더링합니다.

- `${bestMovie.rate}`: 상영 중, 인기순, 평점순, 상영 예정 각각 페이지 중 1위 영화 평점을 렌더링
- `${bestMovie.title}`: 상영 중, 인기순, 평점순, 상영 예정 각각 페이지 중 1위 영화 제목을 렌더링
- `<!--${MOVIE_ITEMS_PLACEHOLDER}-->`: API 호출 후 받은 영화 아이템 목록을 렌더링

  ```js
  const 영화목록_페이지_렌더링_함수_예제 = (moviesData) => {
    const movieItems = parseMovieItems(moviesData);
    const bestMovieItem = movieItems[0];
    const moviesHTML = renderMovieItems(movieItems).join("");

    const templatePath = path.join(__dirname, "../../views", "index.html");
    let template = fs.readFileSync(templatePath, "utf-8");

    template = template.replace(
      "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
      moviesHTML
    );
    template = template.replace(
      "${background-container}",
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
        bestMovieItem.background
    );
    template = template.replace("${bestMovie.rate}", bestMovieItem.rate);
    template = template.replace("${bestMovie.title}", bestMovieItem.title);

    return template;
  };
  ```

- `<!--${MODAL_AREA}-->`: `/detail/:id`로 접근 시 영화 상세 정보를 바탕으로 모달 창 렌더링

  ```js
  const 모달_렌더링_예시 = (moviesData, movieDetailItem) => {
    const movieDetail = parseMovieDetail(movieDetailItem);

    const moviesPageTemplate = renderMovieItemPage(moviesData);
    return moviesPageTemplate.replace(
      "<!--${MODAL_AREA}-->",
      /*html*/ `
        <div class="modal-background active" id="modalBackground">
          <div class="modal">
          <button class="close-modal" id="closeModal"><img src="../images/modal_button_close.png" /></button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="https://image.tmdb.org/t/p/original/${
                movieDetail.thumbnail
              }.jpg" />
            </div>
            <div class="modal-description">
              <h2>${movieDetail.title}</h2>
              <p class="category">${
                movieDetail.releaseYear
              } · ${movieDetail.genres.join(", ")}</p>
              <p class="rate"><img src="../images/star_filled.png" class="star" /><span>7.7</span></p>
              <hr />
              <p class="detail">
                ${movieDetail.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 모달 창 닫기 스크립트 -->
      <script>
        const modalBackground = document.getElementById("modalBackground");
        const closeModal = document.getElementById("closeModal");
        document.addEventListener("DOMContentLoaded", () => {
          closeModal.addEventListener("click", () => {
            modalBackground.classList.remove("active");
          });
        });
      </script>
    `
    );
  };
  ```
