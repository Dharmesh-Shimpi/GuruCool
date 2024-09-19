// routes/userRoutes.js
import express from 'express';
import {
	registerUser,
	loginUser,
	verifyJWT,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Verify JWT
router.post('/verify', protect, verifyJWT);

export default router;
