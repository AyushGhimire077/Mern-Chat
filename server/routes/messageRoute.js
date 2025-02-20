import express from 'express'
import { fetchMessages, fetchUsers,sendMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/:id', fetchMessages);
messageRouter.get('/users', fetchUsers);

messageRouter.post('/send/:id', sendMessage);

export default messageRouter