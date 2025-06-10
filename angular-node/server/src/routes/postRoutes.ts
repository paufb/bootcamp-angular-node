import express from 'express';
import postController from '../controllers/postController';
import { requireAuthentication } from '../middlewares/authMiddleware';
import postReplyController from '../controllers/postReplyController';

const router = express.Router();

router.get('/', requireAuthentication, postController.getPosts);
router.get('/:postId', requireAuthentication, postController.getPost);
router.get('/:postId/replies', requireAuthentication, postReplyController.getPostReplies);
router.post('/', requireAuthentication, postController.createPost);
router.post('/:postId/replies', requireAuthentication, postReplyController.createPostReply);
router.put('/:postId/like', requireAuthentication, postController.likePost);
router.delete('/:postId', requireAuthentication, postController.deletePost);

export default router;
