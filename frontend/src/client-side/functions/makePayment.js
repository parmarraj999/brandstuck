import axios from "axios";
import { AddOrderToFirestore } from "./placeOrder";

export const makePayment = async (amount, cartItems) => {

    const { data } = await axios.post("https://7c9f-2409-4063-6cc9-6562-88ec-28c2-6c15-8939.ngrok-free.app/api/payment/create-order", {
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
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
        AddOrderToFirestore(cartItems, amount)

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

    const rzp = new window.Razorpay(options);
    rzp.open()
  };