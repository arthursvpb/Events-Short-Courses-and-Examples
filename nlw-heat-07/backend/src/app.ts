import 'dotenv/config';
const { GITHUB_CLIENT_ID } = process.env;

import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';

import 'express-async-errors';
import AppError from './errors/AppError';

import { Server } from 'socket.io';

import { router } from './routes';

const app = express();

app.use(cors());

// HTTP irá subir o servidor ao invés do app
// Necessário para usar o Socket.io
const httpServer = http.createServer(app);
// Configuração do Socket.io
const io = new Server(httpServer, { cors: { origin: '*' } });

// Evento de conexão para saber se um usuário se conectou
io.on('connection', socket => {
  console.log(`Conected: ${socket.id}`);
});

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

export { httpServer, io };
