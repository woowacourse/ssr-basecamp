import { Router } from 'express';
import createIndex from '../../views/createIndex.js';

const router = Router();

router.get('/', async (_, res) => {
  const html = await createIndex('nowPlaying');
  res.send(html);
});

router.get('/now-playing', async (_, res) => {
  const html = await createIndex('nowPlaying');
  res.send(html);
});

router.get('/popular', async (_, res) => {
  const html = await createIndex('popular');
  res.send(html);
});

router.get('/top-rated', async (_, res) => {
  const html = await createIndex('topRated');
  res.send(html);
});

router.get('/upcoming', async (_, res) => {
  const html = await createIndex('upcoming');
  res.send(html);
});
export default router;
