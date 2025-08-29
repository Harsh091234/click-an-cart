
import express from 'express';
import { register, logout, login, refreshToken, getProfile, googleAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/google", googleAuth);
router.get("/google/client-id", (req, res) => {
    res.status(200).json({clientId: process.env.GOOGLE_CLIENT_ID});
})
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token',refreshToken);
router.post('/logout', logout);
router.get("/profile", protectRoute, getProfile);



export default router;