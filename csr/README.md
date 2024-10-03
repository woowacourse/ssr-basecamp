# CSR 프로젝트 구동 방법

- ".env" 파일을 현재 경로에 생성하고 자신의 TMDB API KEY를 아래에 입력한다.
  ```
  VITE_TMDB_TOKEN=
  ```
- npm run dev

<br/>

# CSR 프로젝트 이해

- TanStack Router를 사용하여 SPA(Single Page Application) 구조를 구현
- Jotai를 사용하여 전역 상태를 관리
- TMDB API를 사용하여 영화 정보를 가져옴

- 컴포넌트 구조
  - Header: 현재 선택된 영화 목록의 첫 번째 영화를 배너로 표시
  - Container: 영화 목록을 표시하고, 탭을 통해 다른 카테고리로 전환
  - Footer: 저작권 정보를 표시
  - Modal: 영화 상세 정보를 표시
- 커스텀 훅:

  - useModal: 모달 상태 및 영화 상세 정보 관리
  - useMovies: 영화 목록 및 선택된 카테고리 관리

- 주요 기능
  - 영화 목록 표시 (인기순, 상영 중, 평점순, 상영 예정)
  - 영화 상세 정보 모달
  - 탭을 통한 카테고리 전환
