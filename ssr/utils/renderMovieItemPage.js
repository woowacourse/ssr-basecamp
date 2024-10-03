import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchMovies } from '../apis/movies.js';
import { renderMovieItems } from './renderMovieItems.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TITLE_BY_MOVIE_LIST = {
	POPULAR: '지금 인기 있는 영화',
	NOW_PLAYING: '지금 상영중인 영화',
	TOP_RATED: '평점 높은 영화',
	UPCOMING: '상영 예정인 영화',
};

const renderMovieItemPage = async (res, category) => {
	const templatePath = path.join(__dirname, '../views', 'index.html');
	const movieItems = await fetchMovies(category);
	const bestMovieItem = movieItems.results[0];

	const moviesHTML = renderMovieItems(movieItems.results).join('');

	let template = fs.readFileSync(templatePath, 'utf-8');

	template = template.replace(
		'${background-container}',
		'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + bestMovieItem.backdrop_path
	);
	template = template.replace('${bestMovie.rate}', bestMovieItem.vote_average);
	template = template.replace('${bestMovie.title}', bestMovieItem.title);

	template = template.replace('<!--${MOVIE_ITEMS_TITLE_PLACEHOLDER}-->', TITLE_BY_MOVIE_LIST[category]);
	template = template.replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML);

	res.send(template);
};

export default renderMovieItemPage;
