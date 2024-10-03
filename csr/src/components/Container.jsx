import { useEffect } from "react";
import Tab from "./base/Tab";
import { TMDB_MOVIE_LISTS } from "../Constant";
import MovieItem from "./base/MovieItem";
import useMovies from "../hooks/useMovies";
import { Link, useNavigate } from "@tanstack/react-router";

const categories = {
  nowPlaying: "상영 중",
  popular: "인기순",
  topRated: "평점순",
  upcoming: "상영 예정",
};

const TAB_ROUTES = ["/now-playing", "/popular", "/top-rated", "/upcoming"];

function Container() {
  const navigate = useNavigate();

  const {
    focused: [focusedIndex],
    movies: {
      lists,
      popular: [, setPopularMovies],
      nowPlaying: [, setNowPlayingMovies],
      topRated: [, setTopRatedMovies],
      upcoming: [, setUpcomingMovies],
    },
    switchMovieLists,
    loadMovies,
  } = useMovies();

  useEffect(() => {
    loadMovies(TMDB_MOVIE_LISTS.popular, setPopularMovies);
    loadMovies(TMDB_MOVIE_LISTS.nowPlaying, setNowPlayingMovies);
    loadMovies(TMDB_MOVIE_LISTS.topRated, setTopRatedMovies);
    loadMovies(TMDB_MOVIE_LISTS.upcoming, setUpcomingMovies);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabClick = (index) => {
    navigate({ to: TAB_ROUTES[index] });

    switchMovieLists(index);
  };

  return (
    <div className="container">
      <Tab
        items={Object.values(categories)}
        onClick={handleTabClick}
        selectedIndex={focusedIndex}
      />
      <main>
        <section>
          <h2>지금 인기 있는 영화</h2>
          <ul className="thumbnail-list">
            {lists[focusedIndex].map(
              ({ id, title, vote_average, poster_path }) => (
                <li key={id}>
                  <Link to={`/detail/${id}`}>
                    <MovieItem
                      rate={vote_average}
                      title={title}
                      thumbnailUrl={poster_path}
                    />
                  </Link>
                </li>
              )
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Container;
