import express from 'express';
import Controller from '../controllers/Auth.js';
import Middleware from '../middlewares/Auth.js';

const router = express.Router();

router
  .post('/login', Controller.login)
  .post('/logout', Middleware.verifyAuthorization, Controller.logout)
  .post('/refresh', Controller.refresh);

export default router;
