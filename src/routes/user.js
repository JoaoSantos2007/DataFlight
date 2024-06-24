import express from 'express';
import Controller from '../controllers/User.js';
import Auth from '../middlewares/Auth.js';

const Router = express.Router();

Router
  .get('/user/all', Auth.verifyAuth, Controller.readAll)
  .get('/user', Auth.verifyAuth, Controller.read)
  .get('/user/:id', Auth.verifyAuth, Controller.read)
  .post('/user', Controller.create)
  .put('/user', Auth.verifyAuth, Controller.update)
  .put('/user/:id', Auth.verifyAdmin, Controller.update)
  .delete('/user', Auth.verifyAuth, Controller.delete)
  .delete('/user/:id', Auth.verifyAdmin, Controller.delete);

export default Router;
