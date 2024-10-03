import { Router } from 'express';
import { renderMovieDetailModal, renderMovieList } from '../../views/render.js';

const router = Router();

router.get('/', async (req, res) => {
  const endpoint = '/now-playing';
  const template = await renderMovieList(endpoint, res);

  res.send(template);
});

router.get('/now-playing', async (req, res) => {
  const endpoint = req.path;
  const template = await renderMovieList(endpoint, res);

  res.send(template);
});

router.get('/popular', async (req, res) => {
  const endpoint = req.path;
  const template = await renderMovieList(endpoint, res);

  res.send(template);
});

router.get('/top-rated', async (req, res) => {
  const endpoint = req.path;
  const template = await renderMovieList(endpoint, res);

  res.send(template);
});

router.get('/upcoming', async (req, res) => {
  const endpoint = req.path;
  const template = await renderMovieList(endpoint, res);

  res.send(template);
});

router.get('/detail/:id', async (req, res) => {
  let template = await renderMovieList('/now-playing', res);
  const modal = await renderMovieDetailModal(req, res);

  template = template.replace('<!--${MODAL_AREA}-->', modal);

  res.send(template);
});

export default router;
