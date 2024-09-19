// routes/roomRoutes.js
import express from 'express';
import { createRoom, joinRoom } from '../controllers/roomController.js';

const router = express.Router();

// Create room
router.post('/create', createRoom);

// Join room
router.post('/join', joinRoom);

export default router;
