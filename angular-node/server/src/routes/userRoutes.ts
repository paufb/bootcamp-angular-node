import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/:username', userController.getUserByUsername);
router.post('/', userController.createUser);

export default router;
