import express from 'express'
import { fetchMessages, fetchUsers,sendMessage } from '../controllers/messageController.js';
import isProtectedRoute from '../middleware/authMiddleware.js';

const messageRouter = express.Router();

messageRouter.get('/get-messages/:id',isProtectedRoute, fetchMessages);
messageRouter.get('/get-users',isProtectedRoute, fetchUsers);

messageRouter.post('/send/:id',isProtectedRoute, sendMessage);

export default messageRouter