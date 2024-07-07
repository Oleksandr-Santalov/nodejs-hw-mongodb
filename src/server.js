import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.use(express.json());

  app.use(contactsRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.use(cors());

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
