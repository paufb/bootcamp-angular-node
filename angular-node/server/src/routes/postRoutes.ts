import express from 'express';
import postController from '../controllers/postController';
import { requireAuthentication } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', requireAuthentication, postController.getPosts);
router.post('/', requireAuthentication, postController.createPost);
router.put('/:postId/like', requireAuthentication, postController.likePost);

export default router;
