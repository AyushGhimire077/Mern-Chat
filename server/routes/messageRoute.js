import express from 'express'
import { fetchMessages, fetchUsers,getUserInfo,sendMessage } from '../controllers/messageController.js';
import isProtectedRoute from '../middleware/authMiddleware.js';

const messageRouter = express.Router();

messageRouter.get('/get-messages/:id',isProtectedRoute, fetchMessages);
messageRouter.get('/get-users',isProtectedRoute, fetchUsers);

messageRouter.post('/send/:id',isProtectedRoute, sendMessage);

messageRouter.get('/:id',isProtectedRoute, getUserInfo);

export default messageRouter