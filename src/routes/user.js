import express from 'express';
import Controller from '../controllers/User.js';
import Auth from '../middlewares/Auth.js';

const Router = express.Router();

Router
  .get('/user', Auth.verifyAuthorization, Controller.get)
  .post('/user', Controller.create)
  .put('/user', Auth.verifyAuthorization, Controller.update)
  .delete('/user', Auth.verifyAuthorization, Controller.delete);

export default Router;
