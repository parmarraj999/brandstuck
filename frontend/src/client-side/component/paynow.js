// import { createOrder, verifyPayment } from "../../api/paymentApi";

import { collection, doc, setDoc } from "firebase/firestore";
import { createOrder, verifyPayment } from "../../api/paymentApi";
import { db } from "../../firebase/firebaseConfig";

export const handlePayment = async (amount, orderData, navigate, setLoading, preCreatedOrder = null) => {
  setLoading(true);

  function generate8DigitNumber() {
    return Math.floor(10000000 + Math.random() * 90000000);
  }
  const orderId = generate8DigitNumber();

  let order = preCreatedOrder;

  if (!order) {
    try {
      const response = await createOrder(`${amount}`);
      order = response.data;
    } catch (error) {
      console.log("Error creating order:", error);
      setLoading(false);
      alert("Failed to initiate payment. Please try again.");
      return;
    }
  }

  const getRefundEligibleTill = () => {
    const now = new Date();
    const refundTill = new Date(now);

    refundTill.setDate(refundTill.getDate() + 5);

    return refundTill;
  };

  const refundEligibleTill = getRefundEligibleTill();

  const options = {
    key: "rzp_test_RvsB2MOcwdhZtz",
    amount: order.amount,
    currency: "INR",
    name: "Brandstuck",
    description: "Payment Test",
    order_id: order.id,


    handler: async (response) => {
      // console.log(response)
      // setLoading(true)
      const verify = await verifyPayment(response);
      if (verify.data.success) {
        // adding data to firestore
        try {
          const docRef = doc(collection(db, 'Orders'));
          console.log("set1")
          await setDoc(docRef, {
            ...orderData,
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            trackingId: 'not available',
            order_status: 'Pending',
            estimate_date: 'not available',
            amount: amount,
            refund_eligible_date: refundEligibleTill,
          })
            .then(() => {
              document.body.style.overflow = 'auto'; // Ensure scrollable
              setLoading(false);
              navigate('/profile/orders')
            })
        } catch (error) {
          console.log('error in adding data to firester', error)
          setLoading(false);
          document.body.style.overflow = 'auto';
        }
        // setLoading(false)
        // alert("Payment Successful ✅"); // Removed alert as requested
      } else {
        setLoading(false);
        alert("Payment Failed ❌");
      }
    },
    modal: {
      ondismiss: function () {
        setLoading(false);
        document.body.style.overflow = 'auto';
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const PayNow = () => {

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PayNow;
