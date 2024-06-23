import express from 'express';
import Controller from '../controllers/Room.js';

const Router = express.Router();

Router
  .get('/rooms', Controller.getRooms)
  .get('/rooms/:id', Controller.getRooms)
  .post('/rooms', Controller.createRoom)
  .put('/rooms/:id', Controller.updateRoom)
  .delete('/rooms/:id', Controller.deleteRoom);

export default Router;
