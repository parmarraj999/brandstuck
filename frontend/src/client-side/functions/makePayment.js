import axios from "axios";
import { AddOrderToFirestore } from "./placeOrder";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const makePayment = async (amount, cartItems, userCredential) => {

  const { data } = await axios.post("https://18e0-2401-4900-1ca2-c8ad-8135-b3c2-925d-c1be.ngrok-free.app/api/payment/create-order", {
    amount: amount, // ₹5
    currency: "INR",
    receipt: "receipt#1",
  });

  const dateVar = new Date();
  const date = dateVar.getDate();
  const day = dateVar.getDay();
  const month = dateVar.getMonth(); 
  const time = dateVar.getTime();
  const dateId = date + day + month + time;

  const options = {
    key: "rzp_test_mPrfMJIy2Vcxb5",
    amount: data.amount,
    currency: data.currency,
    name: "Brandstuck Store",
    description: "Test Transaction",
    order_id: data.id,
    handler: async function (response) {
      alert("Payment successful!");
      // 
      await addDoc(collection(db, "payments"), {
        paymentBy: userCredential.name,
        userId: userCredential.userId,
        amount: amount,
        orderId: userCredential.userId + dateId,
        paymentId: response.razorpay_payment_id,
        createdAt: serverTimestamp(),
        status: "success"
      });
      // add data as order in firestore 
      await addDoc(collection(db, "Orders"), {
        orderBy: userCredential.name,
        userId: userCredential.userId,
        amount: amount,
         orderId: userCredential.userId + dateId,
        paymentId: response.razorpay_payment_id,
        createdAt: serverTimestamp(),
        status: "success",
        cartItems: cartItems,
        deliveryStatus: 'pending',
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