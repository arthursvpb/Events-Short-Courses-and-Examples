import 'dotenv/config';
const { GITHUB_CLIENT_ID } = process.env;

import express from 'express';

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

const PORT = 4000;
app.listen(PORT, () => console.log(`✨ Server is running on PORT ${PORT}`));
