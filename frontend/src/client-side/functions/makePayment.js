import axios from "axios";
import { AddOrderToFirestore } from "./placeOrder";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const makePayment = async (amount, cartItems) => {

  const { data } = await axios.post("https://2dcb-2401-4900-1ca3-a41f-9448-d5b4-632c-d0b8.ngrok-free.app/api/payment/create-order", {
    amount: amount, // ₹5
    currency: "INR",
    receipt: "receipt#1",
  });

  const options = {
    key: "rzp_test_mPrfMJIy2Vcxb5",
    amount: data.amount,
    currency: data.currency,
    name: "Brandstuck Store",
    description: "Test Transaction",
    order_id: data.id,
    handler: async function (response) {
      alert("Payment successful!");
      await addDoc(collection(db, "payments"), {
        amount: amount,
        orderId: '10920123',
        paymentId: response.razorpay_payment_id,
        createdAt: serverTimestamp(),
        status: "success"
      });
      await addDoc(collection(db, "Orders"), {
        amount: amount,
        orderId: '10920123',
        paymentId: response.razorpay_payment_id,
        createdAt: serverTimestamp(),
        status: "success",
        cartItems: cartItems,
      });

    },
    prefill: {
      name: "Your Name",
      email: "email@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#d8ff68",
    },
  };

  const rzp = new window.Razorpay(options)
  rzp.open()
};