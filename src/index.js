import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnecrion.js';

const init = async () => {
  await initMongoConnection();
  setupServer();
};

init();
