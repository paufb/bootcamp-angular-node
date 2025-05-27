import express from 'express';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import { requireAuthentication } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:username', requireAuthentication, userController.getUserByUsername);
router.get('/:username/posts', requireAuthentication, postController.getPostsByUsername);
router.post('/', userController.createUser);
router.put('/:userId/follow', requireAuthentication, userController.followUser);

export default router;
