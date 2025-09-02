
import express from 'express';
import { register, logout, login, refreshToken, getProfile, googleAuth,  verifyEmail, forgotPassword, resetPassword, resendVerificationCode,
    setPassword
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/google", googleAuth);
router.get("/google/client-id", (req, res) => {
    res.status(200).json({clientId: process.env.GOOGLE_CLIENT_ID});
})
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token',refreshToken);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password",forgotPassword)
router.post('/logout', logout);
router.get("/profile", protectRoute, getProfile);
router.post("/reset-password/:code", resetPassword);
router.post("/resend-verification", resendVerificationCode);
router.post("/set-password", protectRoute, setPassword);



export default router;