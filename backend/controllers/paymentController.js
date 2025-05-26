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
  const secret = 'webhookSecret5122';

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("✔️ Payment verified successfully");

    const paymentData = req.body.payload.payment.entity;

    // Add data to Firestore 'payments' collection
    await db.collection("payments").doc('payment-doc').add({
      payment_id: paymentData.id,
      order_id: paymentData.order_id,
      email: paymentData.email,
      contact: paymentData.contact,
      amount: paymentData.amount,
      status: paymentData.status,
      created_at: new Date()
    })
    .then(() => {
      console.log("✔️ Payment recorded in Firestore");
    })
    res.status(200).json({ status: "Payment recorded in Firestore" });
  } else {
    console.log("❌ Invalid signature");
    res.status(400).json({ status: "Invalid signature" });
  }
};