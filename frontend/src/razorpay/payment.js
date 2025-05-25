import React from "react";
import axios from "axios";

const Payment = () => {
  const makePayment = async () => {
    const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
      amount: 500, // ₹5
      currency: "INR",
      receipt: "receipt#1",
    });

    const options = {
      key: "rzp_test_mPrfMJIy2Vcxb5",
      amount: data.amount,
      currency: data.currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      prefill: {
        name: "Your Name",
        email: "email@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Make a Payment</h2>
      <button onClick={makePayment}>Pay ₹5</button>
    </div>
  );
};

export default Payment;
