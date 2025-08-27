import express from "express"; 
import  { createCheckoutSession, checkoutSuccess} from "../controllers/payment.controller.js"
import {protectRoute} from "../controllers/auth.controller.js"

const router = express.Router();


router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);


export default router;
