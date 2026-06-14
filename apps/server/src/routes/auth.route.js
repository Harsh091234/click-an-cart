
import express from 'express';
import { register, logout, login, refreshToken, getProfile, googleAuth,  verifyEmail, forgotPassword, resetPassword, resendVerificationCode, toggleRole,
    setPassword,  verifyResetToken, switchRoleToAdmin
} from '../controllers/auth.controller.js';
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import {RegisterSchema} from "@repo/shared"

const router = express.Router();

router.post("/google", googleAuth);

router.post('/register',validate(RegisterSchema), register);
router.post('/login', login);
router.post('/refresh-token',refreshToken);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password",forgotPassword)
router.post('/logout', logout);
router.get("/profile", protectRoute, getProfile);
router.post("/reset-password/:code", resetPassword);
router.get("/verify-reset-token/:token",  verifyResetToken)
router.post("/resend-verification", resendVerificationCode);
router.post("/set-password", protectRoute, setPassword);
//switch roles
router.post("/:userId/role", protectRoute, switchRoleToAdmin);
router.put("/toggle-role", protectRoute, toggleRole);



export default router;