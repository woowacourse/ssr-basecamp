import { Logo, StarEmpty } from "../ImageResources";
import { TMDB_BANNER_URL } from "../Constant";
import { round } from "../utils";
import useMovies from "../hooks/useMovies";
import { Link } from "@tanstack/react-router";

function Header() {
  const {
    movies: { lists },
    focused: [focusedIndex],
  } = useMovies();

  const focusedMovieList = lists[focusedIndex];

  const movie = focusedMovieList[0] ?? {
    id: -1,
    title: "",
    bannerUrl: "",
    vote_average: 0,
  };

  const { id, title, vote_average, backdrop_path } = movie;

  const bannerUrl = TMDB_BANNER_URL + backdrop_path;

  return (
    <header>
      <div className="background-container" style={{ backgroundImage: `url('${bannerUrl}')` }}>
        <div className="overlay" aria-hidden="true"></div>
        <div className="top-rated-container">
          <h1 className="logo">
            <img src={Logo} alt="MovieList" />
          </h1>
          <div className="top-rated-movie">
            <div className="rate">
              <img src={StarEmpty} className="star" /> <span className="rate-value">{round(vote_average, 1)}</span>
            </div>
            <div className="title">{title}</div>
            <Link to={`/detail/${id}`}>
              <button className="primary detail">자세히 보기</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
