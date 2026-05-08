import Coupon from "../models/coupon.model.js";
import stripe from "../utils/stripe.js";
import Order from "../models/order.model.js"

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
    const  amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeToken(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(products.map(p => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
        })))
      },
    });

    if (totalAmount >= 20000) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({
      error: "Something went wrong while creating checkout session",
      details: error.message,
    });
  }
};

const createStripeToken = async (discountPercentage) => {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
};

const createNewCoupon = async (userId) => {
  await Coupon.findOneAndDelete({userId})
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId: userId,
  });

  await newCoupon.save();
  return newCoupon;
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: "No session ID provided" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

  

    // ✅ Accept both paid and free sessions
    if (
      session.payment_status !== "paid" &&
      session.payment_status !== "no_payment_required"
    ) {
      return res.status(400).json({ message: "Payment not completed yet" });
    }

    // 🔹 Safely handle coupon
    if (session.metadata?.couponCode) {
      await Coupon.findOneAndUpdate(
        {
          code: session.metadata.couponCode,
          userId: session.metadata.userId,
        },
        { isActive: false }
      );
    }

    // 🔹 Safely parse products
    let products = [];
    try {
      products = JSON.parse(session.metadata?.products || "[]");
    } catch (err) {
      console.error("Invalid products metadata:", err);
      return res.status(400).json({ message: "Invalid products metadata" });
    }

    if (!session.metadata?.userId) {
      return res.status(400).json({ message: "Missing userId in metadata" });
    }

    // 🔹 Create a new order (works even if total = 0)
    const newOrder = new Order({
      user: session.metadata.userId,
      products: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: session.amount_total / 100, // can be 0
      stripeSessionId: sessionId,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message:
        "Order created successfully (payment processed or not required).",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

