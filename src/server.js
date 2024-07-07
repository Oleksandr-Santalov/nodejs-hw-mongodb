import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.use(express.json());

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.log(error.message);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;

    try {
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.json({
          status: 404,
          message: `Contact with id ${contactId} not found`,
        });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      console.log(error.message);
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use(cors());

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
