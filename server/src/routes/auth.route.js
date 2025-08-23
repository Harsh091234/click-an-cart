
import express from 'express';
import { register, logout, login, refreshToken} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token',refreshToken);
router.post('/logout', logout);



export default router;