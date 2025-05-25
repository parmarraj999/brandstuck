const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const cors = require("cors")({ origin: true });

const razorpay = new Razorpay({
  key_id: 'rzp_test_tOx8HQJeN0joUt',   
    key_secret: '7wCQQM4bctPgljwEp4HX53Ob'  
});

exports.createOrder = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
});
