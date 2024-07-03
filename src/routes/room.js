import express from 'express';
import Controller from '../controllers/Room.js';
import Auth from '../middlewares/Auth.js';

const Router = express.Router();

Router
  .get('/room', Auth.verifyAuth, Controller.read)
  .get('/room/:id', Auth.verifyAuth, Controller.read)
  .post('/room', Auth.verifyAuth, Controller.create)
  .put('/room/:id', Auth.verifyAuth, Controller.update)
  .delete('/room/:id', Auth.verifyAuth, Controller.delete);

export default Router;
