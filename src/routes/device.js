import express from 'express';
import Controller from '../controllers/Device.js';
import Auth from '../middlewares/Auth.js';

const Router = express.Router();

Router
  .get('/device', Controller.read)
  .get('/device/:id', Auth.verifyAuth, Controller.read)
  .post('/device', Auth.verifyAuth, Controller.create)
  .put('/device/:id', Auth.verifyAuth, Controller.update)
  .delete('/device/:id', Auth.verifyAuth, Controller.delete);

export default Router;
