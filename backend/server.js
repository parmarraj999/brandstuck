const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();

app.use(express.json());  
app.use(cors());
const bodyParser = require('body-parser');
const { default: Razorpay } = require("../frontend/src/razorpay/razorpay");

// Parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const razorpay = new Razorpay({
    key_id: 'rzp_test_tOx8HQJeN0joUt',   
    key_secret: '7wCQQM4bctPgljwEp4HX53Ob'  
  });
  
  app.post('/create/orderId', async (req, res) => {

    const options = {
      amount: req.body.price*100,
      currency: "INR",
    };
  
    try {
      const order = await razorpay.orders.create(options); 
      res.send(order);
      await Payment.create({
        orderId: order.id,
        amount: order.amount / 100, 
        currency: order.currency,
        status: 'pending',
      });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).send('Error creating order');
    }
  });
  
  app.post('/api/payment/verify', async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const crypto = require('crypto');
  
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
  
    if (generatedSignature === signature) {
      console.log('payment successfyll')
      try {
        // Update the payment status in the database
        await Payment.findOneAndUpdate(
          { orderId: razorpayOrderId },
          { paymentId: razorpayPaymentId, signature, status: 'completed' }
        );
  
        const date = req.body.formData.date;
        const targetDate = new Date(date).getTime();
        
        if (isNaN(targetDate)) {
          return res.status(400).send('Invalid date format');
        }
  
        const appointment = new Appointment({
          patient: req.body.formData.patientName,
          issue: req.body.formData.issue,
          doctor: req.body.formData.doctor,
          date: targetDate, 
          timeSlot: req.body.formData.timeSlot,
          email: req.body.formData.email,
        });
  
        await appointment.save();
  
        res.send('Payment verified and appointment created successfully');
      } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).send('Internal server error');
      }
    } else {
      res.status(400).send('Payment verification failed');
    }
  });


  app.post('/api/payment/verify/bed', async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const crypto = require('crypto');
  
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
  
    if (generatedSignature === signature) {
      try {
        // Update the payment status in the database
        await Payment.findOneAndUpdate(
          { orderId: razorpayOrderId },
          { paymentId: razorpayPaymentId, signature, status: 'completed' }
        );
  
  
  
        console.log(req.body.formData.hospital)
        console.log(req.body.formData.patientName)
        console.log(req.body.formData.issue)
        const user = new Bed({
          Hospital: req.body.formData.hospital,
          patient: req.body.formData.patientName,
          issue: req.body.formData.reason,
          email: req.body.formData.email,
        });
  
        // Save the appointment to the database
        await user.save();
  
        res.send('Payment verified and appointment created successfully');
      } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).send('Internal server error');
      }
    } else {
      res.status(400).send('Payment verification failed');
    }
  });
// Starting Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});