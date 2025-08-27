
import express from 'express';
import { register, logout, login, refreshToken, getProfile} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token',refreshToken);
router.post('/logout', logout);
router.get("/profile", protectRoute, getProfile);



export default router;