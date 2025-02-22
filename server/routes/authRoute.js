import express from "express";
import { checkAuth, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/authController.js";
import isProtectedRoute from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

authRouter.post('/update-profile', isProtectedRoute, updateProfile);
authRouter.get('/check-auth', isProtectedRoute, checkAuth);

export default authRouter
