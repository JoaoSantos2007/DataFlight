import express from 'express';
import Controller from '../controllers/Device.js';
import Auth from '../middlewares/Auth.js';

const Router = express.Router();

Router
  .get('/devices', Auth.verifyAuth, Controller.read)
  .get('/devices/:id', Auth.verifyAuth, Controller.read)
  .post('/devices', Auth.verifyAuth, Controller.create)
  .put('/devices/:id', Auth.verifyAuth, Controller.update)
  .delete('/devices/:id', Auth.verifyAuth, Controller.delete);

export default Router;
