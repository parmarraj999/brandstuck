import axios from "axios";

export const makePayment = async (amount) => {
    const { data } = await axios.post("https://9b64-2409-40e3-505e-fd78-3943-5b02-aee1-f54f.ngrok-free.app/api/payment/create-order", {
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