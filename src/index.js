import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const init = async () => {
  await initMongoConnection();
  setupServer();
};

init();
