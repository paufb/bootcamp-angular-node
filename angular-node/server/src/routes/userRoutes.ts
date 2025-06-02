import express from 'express';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import { requireAuthentication } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:username', requireAuthentication, userController.getUserByUsername);
router.get('/:username/followers', requireAuthentication, userController.getFollowersUsers);
router.get('/:username/following', requireAuthentication, userController.getFollowingUsers);
router.get('/:username/following/posts', requireAuthentication, postController.getFollowingUsersPosts);
router.get('/:username/posts', requireAuthentication, postController.getPostsByUsername);
router.post('/', userController.createUser);
router.put('/:userId/follow', requireAuthentication, userController.followUser);
router.patch('/:userId', requireAuthentication, userController.editUser);

export default router;
