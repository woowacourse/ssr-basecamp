import { Router } from 'express';
import generateMovieList from '../utils/generateMovieList.js';

const router = Router();

router.get('/', async (_, res) => {
  const renderedHTML = await generateMovieList();

  res.send(renderedHTML);
});

router.get('/now-playing', async (_, res) => {
  const renderedHTML = await generateMovieList('now-playing');

  res.send(renderedHTML);
});

router.get('/popular', async (_, res) => {
  const renderedHTML = await generateMovieList('popular');

  res.send(renderedHTML);
});

router.get('/top-rated', async (_, res) => {
  const renderedHTML = await generateMovieList('top-rated');

  res.send(renderedHTML);
});

router.get('/upcoming', async (_, res) => {
  const renderedHTML = await generateMovieList('upcoming');

  res.send(renderedHTML);
});

export default router;
