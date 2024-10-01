import { Router } from 'express';
import createIndex from '../../../views/createIndex.js';
import createModal from '../../../views/createModal.js';
import getMovieDetail from '../../../apis/getMovieDetail.js';
import getReplacedString from '../../../utils/getReplacedString.js';

const router = Router();

router.get('/:movieId', async (request, res) => {
  const html = await createIndex('nowPlaying');
  const id = request.params.movieId;
  const movieDetail = await getMovieDetail(id);
  const modalAddedHTML = getReplacedString(html, [
    ['<!--${MODAL_AREA}-->', createModal(movieDetail)],
  ]);
  res.send(modalAddedHTML);
});

export default router;
