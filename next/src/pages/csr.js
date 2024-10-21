import { useEffect, useState } from "react";
import { fetchMovieItems } from "src/api";
import { TMDB_THUMBNAIL_URL } from "src/Constant";

export default function csr() {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const movieItems = await fetchMovieItems();

    setMovieItems(movieItems);
  }

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
