import { fetchMovieItems } from "src/api";
import { TMDB_THUMBNAIL_URL } from "src/Constant";

export const getServerSideProps = async () => {
  const movieItems = await fetchMovieItems();

  return {
    props: {
      movieItems,
    },
  };
};

export default function ssr({ movieItems }) {
  return (
    <div>
      <h1>SSR로 렌더링한 영화 목록입니다</h1>
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
