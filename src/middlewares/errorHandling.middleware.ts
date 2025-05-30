import {ErrorRequestHandler} from 'express';
import {HttpError} from 'http-errors';

export const errorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'Internal Server Error' });
};
