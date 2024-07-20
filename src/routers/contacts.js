import { isValidId } from '../middleware/isValidId.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchedContactController,
} from '../controllers/contacts.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middleware/validateBody.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchedContactController),
);

router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

export default router;
