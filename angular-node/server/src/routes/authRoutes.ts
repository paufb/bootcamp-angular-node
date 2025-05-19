import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/', authController.authenticateUser);
router.post('/logout', authController.logUserOut);

export default router;
