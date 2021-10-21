import 'dotenv/config';
const { GITHUB_CLIENT_ID } = process.env;

import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import AppError from './errors/AppError';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.get('/github', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
  );
});

app.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

const PORT = 4000;
app.listen(PORT, () => console.log(`✨ Server is running on PORT ${PORT}`));
