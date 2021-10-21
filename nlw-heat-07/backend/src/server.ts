import { httpServer } from './app';

const PORT = 4000;

httpServer.listen(PORT, () =>
  console.log(`✨ Server is running on PORT ${PORT}`)
);
