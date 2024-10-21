import { useEffect, useState } from "react";
import { FETCH_OPTIONS, TMDB_MOVIE_LISTS, TMDB_THUMBNAIL_URL } from "src/Constant";

export default function csr() {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    fetchMovieItems();

    async function fetchMovieItems() {
      try {
        const response = await fetch(TMDB_MOVIE_LISTS.popular, FETCH_OPTIONS);
        const data = await response.json();

        setMovieItems(data.results);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div>
      <h1>영화 목록</h1>
      {movieItems?.map((item) => (
        <div key={item.id}>
          <img src={TMDB_THUMBNAIL_URL + item.poster_path} alt={item.title} height="80" />
          <h3>{item.title}</h3>
          <p>{item.overview}</p>
        </div>
      ))}
    </div>
  );
}
