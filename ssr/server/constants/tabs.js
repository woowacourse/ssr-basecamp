export const TABS = [
  { path: "/", label: "상영 중", key: "nowPlaying" },
  { path: "/popular", label: "인기순", key: "popular" },
  { path: "/top-rated", label: "평점순", key: "topRated" },
  { path: "/upcoming", label: "상영 예정", key: "upcoming" },
];

export const PATH_TO_API_KEY = {
  "/": "nowPlaying",
  "/now-playing": "nowPlaying",
  "/popular": "popular",
  "/top-rated": "topRated",
  "/upcoming": "upcoming",
};
