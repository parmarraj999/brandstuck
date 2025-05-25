const instance = require("../config/razorpayInstance");
const db = require("../config/firebaseConfig");
const crypto = require("crypto");

// Create order
exports.createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt,
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle Razorpay Webhook
exports.verifyPayment = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const paymentData = req.body;

    await db.collection("payments").add(paymentData);
    res.status(200).json({ status: "ok" });
  } else {
    res.status(400).json({ status: "invalid signature" });
  }
};
