export const MOVIE_PAGE_PATH = {
  home: "/",
  nowPlaying: "/now-playing",
  popular: "/popular",
  topRated: "/top-rated",
  upcoming: "/upcoming",
  detail: "/detail/:movieId",
};

const switchMoviePaths = (originalPaths, rootPath) => {
  const switchedPaths = {};

  Object.entries(originalPaths).forEach(([key, value]) => {
    if (value === "/") {
      switchedPaths[value] = rootPath;
    } else {
      switchedPaths[value] = key;
    }
  });

  return switchedPaths;
};

export const MOVIE_TYPE_KEY = switchMoviePaths(MOVIE_PAGE_PATH, "nowPlaying");
