import { Router } from 'express';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController';
import { ListUserSentComplimentsController } from './controllers/ListUserSentComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.get('/', (_, response) => response.json({ message: 'Hello World!' }));
router.post('/login', authenticateUserController.handle);
router.post('/users', createUserController.handle);
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);
router.get('/users/compliments/sent', ensureAuthenticated, listUserSentComplimentsController.handle);
router.get('/users/compliments/received', ensureAuthenticated, listUserReceivedComplimentsController.handle);
router.get('/tags', listTagsController.handle);
router.get('/users', listUsersController.handle);

export { router };
