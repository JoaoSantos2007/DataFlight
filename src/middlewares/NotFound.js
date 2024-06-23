import NotFoundError from '../errors/notFoundError.js';

function NotFound(req, res, next) {
  const error404 = new NotFoundError();
  next(error404);
}

export default NotFound;
