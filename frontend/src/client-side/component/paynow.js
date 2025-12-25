// import { createOrder, verifyPayment } from "../../api/paymentApi";

import { createOrder, verifyPayment } from "../../api/paymentApi";

const PayNow = () => {
  const handlePayment = async () => {
    const { data: order } = await createOrder(500);

    const options = {
      key: "rzp_test_mPrfMJIy2Vcxb5",
      amount: order.amount,
      currency: "INR",
      name: "My Website",
      description: "Payment Test",
      order_id: order.id,

      handler: async (response) => {
        const verify = await verifyPayment(response);

        if (verify.data.success) {
          alert("Payment Successful ✅");
        } else {
          alert("Payment Failed ❌");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PayNow;
