import express from 'express';
import Controller from '../controllers/Device.js';

const Router = express.Router();

Router
  .get('/devices', Controller.getDevices)
  .get('/devices/:id', Controller.getDevices)
  .post('/devices', Controller.createDevice)
  .put('/devices/:id', Controller.updateDevice)
  .delete('/devices/:id', Controller.deleteDevice);

export default Router;
