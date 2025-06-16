import express from 'express';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import { requireAuthentication } from '../middlewares/authMiddleware';
import { uploadProfilePictures } from '../middlewares/profilePicturesMiddleware';

const router = express.Router();

router.get('/:userId', requireAuthentication, userController.getUser);
router.get('/:username/followers', requireAuthentication, userController.getFollowersUsers);
router.get('/:username/following', requireAuthentication, userController.getFollowingUsers);
router.get('/:username/following/posts', requireAuthentication, postController.getFollowingUsersPosts);
router.get('/:username/liked-posts', requireAuthentication, postController.getLikedPostsByUsername);
router.get('/:username/posts', requireAuthentication, postController.getPostsByUsername);
router.get('/username/:username', requireAuthentication, userController.getUserByUsername);
router.post('/', uploadProfilePictures.single('profile-picture'), userController.createUser);
router.put('/:userId/follow', requireAuthentication, userController.followUser);
router.patch('/:userId', uploadProfilePictures.single('profile-picture'), requireAuthentication, userController.editUser);

export default router;
