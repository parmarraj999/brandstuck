// import { createOrder, verifyPayment } from "../../api/paymentApi";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { createOrder, verifyPayment } from "../../api/paymentApi";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const handlePayment = async (amount, orderData, navigate, userId) => {

  function generate8DigitNumber() {
    return Math.floor(10000000 + Math.random() * 90000000);
  }
  const orderId = generate8DigitNumber();

  const { data: order } = await createOrder(`${amount}`);

  const options = {
    key: "rzp_test_RvsB2MOcwdhZtz",
    amount: order.amount,
    currency: "INR",
    name: "My Website",
    description: "Payment Test",
    order_id: order.id,

    handler: async (response) => {
      console.log(response)
      const verify = await verifyPayment(response);
      if (verify.data.success) {
        // adding data to firestore
        try {
          const docRef = doc(collection(db, 'Orders')); // Replace with your collection and document ID
          const userOrders = collection(db, 'users', userId, 'orders');

          await setDoc(docRef, {
            ...orderData,
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            trackingId: 'not available',
            order_status: 'Pending',
            estimate_date: 'not available',
            amount: amount
          })
          await addDoc(userOrders, {
            ...orderData,
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            trackingId: 'not available',
            order_status: 'Pending',
            estimate_date: 'not available',
            amount: amount
          })
            .then(() => {
              navigate('/profile/orders')
            })
        } catch (error) {
          console.log('error in adding data to firester', error)
        }
        alert("Payment Successful ✅");
      } else {
        alert("Payment Failed ❌");
      }
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const PayNow = () => {

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PayNow;
