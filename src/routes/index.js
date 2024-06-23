import express from 'express';
import cookieParser from 'cookie-parser';
import room from './room.js';
import device from './device.js';
import user from './user.js';
import auth from './auth.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('API data flight');
  });

  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(
    express.json(),
    cookieParser(),
    room,
    device,
    user,
    auth,
  );
};

export default routes;
