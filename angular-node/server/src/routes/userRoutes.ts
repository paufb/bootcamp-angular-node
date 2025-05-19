import express from 'express';
import userController from '../controllers/userController';
import { requireAuthentication } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:username', requireAuthentication, userController.getUserByUsername);
router.post('/', userController.createUser);

export default router;
