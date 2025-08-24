import express from "express";
const router = express.Router();

router.post("/create-checkout-session", protectRouter, createCheckoutSession);

export default router;
