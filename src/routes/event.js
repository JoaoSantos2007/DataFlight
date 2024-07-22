import { Router } from 'express';
import Controller from '../controllers/Event.js';

const router = Router();

router
  .get('/event', Controller.read)
  .post('/event', Controller.create)
  .put('/event/:id', Controller.update)
  .delete('/event/:id', Controller.delete);

export default router;
