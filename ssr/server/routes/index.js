import { Router } from 'express';

import renderMovieItemPage from '../../utils/renderMovieItemPage.js';
import renderModal from '../../utils/renderModal.js';

const router = Router();

router.get(['/', '/now-playing'], (_, res) => renderMovieItemPage(res, 'NOW_PLAYING'));
router.get('/popular', (_, res) => renderMovieItemPage(res, 'POPULAR'));
router.get('/top-rated', (_, res) => renderMovieItemPage(res, 'TOP_RATED'));
router.get('/upcoming', (_, res) => renderMovieItemPage(res, 'UPCOMING'));

router.get('/detail/:id', (req, res) => renderModal(res, req.params.id));

export default router;
