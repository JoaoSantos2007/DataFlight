import express from 'express';
import Routes from './routes/index.js';
import './config/mongo.js';
import './services/fast.js';
import NotFoundMiddleware from './middlewares/NotFound.js';
import ErrorMiddleware from './middlewares/Error.js';

const app = express();

Routes(app);
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

export default app;
