import { useAtom } from "jotai";
import {
  focusedIndexAtom,
  nowPlayingMoviesAtom,
  popularMoviesAtom,
  topRatedMoviesAtom,
  upcomingMoviesAtom,
} from "../atoms";
import { FETCH_OPTIONS } from "../Constant";

const useMovies = () => {
  const [popularMovies, setPopularMovies] = useAtom(popularMoviesAtom);
  const [nowPlayingMovies, setNowPlayingMovies] = useAtom(nowPlayingMoviesAtom);
  const [topRatedMovies, setTopRatedMovies] = useAtom(topRatedMoviesAtom);
  const [upcomingMovies, setUpcomingMovies] = useAtom(upcomingMoviesAtom);
  const [focusedIndex, setFocusedIndex] = useAtom(focusedIndexAtom);

  const movieLists = [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies];

  const loadMovies = async (url, setter) => {
    const response = await fetch(url, FETCH_OPTIONS);
    const data = await response.json();

    setter(data.results);
  };

  const switchMovieLists = (index) => {
    setFocusedIndex(index);
  };

  return {
    movies: {
      lists: movieLists,
      popular: [popularMovies, setPopularMovies],
      nowPlaying: [nowPlayingMovies, setNowPlayingMovies],
      topRated: [topRatedMovies, setTopRatedMovies],
      upcoming: [upcomingMovies, setUpcomingMovies],
    },
    focused: [focusedIndex, setFocusedIndex],
    switchMovieLists,
    loadMovies,
  };
};

export default useMovies;
